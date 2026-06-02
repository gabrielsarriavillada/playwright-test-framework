import fs from "fs";
import path from "path";
import { bugReportTemplate } from "../templates/bugReportTemplate";
import { generateSummary } from "../analyzers/generateSummary";
import { classifyFailure } from "../analyzers/classifyFailure";
import { cleanErrorMessage } from "../analyzers/cleanErrorMessage";
import { deduplicateFailures } from "../processors/deduplicateFailures";
import { generateAIBugReport } from "../services/generateAIBugReport";
import { buildBugReportPrompt } from "../prompts/bugReportPrompt";

type PlaywrightJsonReport = {
  suites: Suite[];
};

type Suite = {
  title: string;
  specs?: Spec[];
  suites?: Suite[];
};

type Spec = {
  title: string;
  tests: Test[];
};

type Test = {
  status: string;
  projectName?: string;
  results: TestResult[];
};

type TestResult = {
  status: string;
  error?: {
    message?: string;
    stack?: string;
  };
};

type FailedTest = {
  suite: string;
  title: string;
  project: string;
  errorMessage: string;
  stack?: string;
};

const inputFile = process.argv[2];

if (!inputFile) {
  console.error(
    "Usage: npm run ai:bug-report <path-to-playwright-json-report>",
  );
  process.exit(1);
}

const reportPath = path.resolve(inputFile);

if (!fs.existsSync(reportPath)) {
  console.error(`Report file not found: ${reportPath}`);
  process.exit(1);
}

const report = JSON.parse(
  fs.readFileSync(reportPath, "utf-8"),
) as PlaywrightJsonReport;

function collectFailedTests(suites: Suite[], parentSuite = ""): FailedTest[] {
  const failedTests: FailedTest[] = [];

  for (const suite of suites) {
    const suiteName = [parentSuite, suite.title].filter(Boolean).join(" > ");

    for (const spec of suite.specs ?? []) {
      for (const test of spec.tests) {
        const failedResult = test.results.find(
          (result) => result.status === "failed",
        );

        if (["failed", "unexpected"].includes(test.status) && failedResult) {
          failedTests.push({
            suite: suiteName,
            title: spec.title,
            project: test.projectName ?? "unknown",
            errorMessage:
              failedResult.error?.message ?? "No error message available",
            stack: failedResult.error?.stack,
          });
        }
      }
    }

    failedTests.push(...collectFailedTests(suite.suites ?? [], suiteName));
  }

  return failedTests;
}

async function main() {
  const failedTests = collectFailedTests(report.suites);
  const deduplicatedFailures = deduplicateFailures(failedTests);

  if (deduplicatedFailures.length === 0) {
    console.log("No failed tests found in the Playwright report.");
    process.exit(0);
  }

  const outputDir = path.resolve("ai/output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  for (const [index, failedTest] of deduplicatedFailures.entries()) {
    const cleanError = cleanErrorMessage(failedTest.errorMessage);
    const cleanStack = failedTest.stack
      ? cleanErrorMessage(failedTest.stack)
      : "No stack trace available";

    const failureContent = `
Suite: ${failedTest.suite}

Test: ${failedTest.title}

Affected Projects:
${failedTest.projects.map((p) => `- ${p}`).join("\n")}

Error:
${cleanError}

Stack:
${cleanStack}
`;

    const summary = generateSummary(failedTest.title, cleanError);
    const category = classifyFailure(cleanError);

    const prompt = buildBugReportPrompt({
      testTitle: failedTest.title,
      suite: failedTest.suite,
      projects: failedTest.projects,
      error: cleanError,
      stack: cleanStack,
      category,
    });

    let aiAnalysis: string;

    try {
      aiAnalysis = await generateAIBugReport({
        prompt,
      });
    } catch (error) {
      console.error(`AI analysis failed for test: ${failedTest.title}`, error);

      aiAnalysis = "AI analysis unavailable.";
    }

    const bugReport = bugReportTemplate(
      summary,
      failureContent,
      category,
      aiAnalysis,
    );

    const fileName = `bug-report-${index + 1}.md`;
    const outputPath = path.join(outputDir, fileName);

    fs.writeFileSync(outputPath, bugReport, "utf-8");

    console.log(`Bug report generated: ${outputPath}`);
  }
}

main().catch((error) => {
  console.error("Failed to generate bug reports:", error);
  process.exit(1);
});
