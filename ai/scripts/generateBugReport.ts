import fs from "fs";
import path from "path";
import { bugReportTemplate } from "../templates/bugReportTemplate";
import { inferRootCause } from "../analyzer/inferRootCause";

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

const failedTests = collectFailedTests(report.suites);

if (failedTests.length === 0) {
  console.log("No failed tests found in the Playwright report.");
  process.exit(0);
}

const outputDir = path.resolve("ai/output");

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

for (const [index, failedTest] of failedTests.entries()) {
  const failureContent = `
Suite: ${failedTest.suite}
Test: ${failedTest.title}

Error:
${failedTest.errorMessage}

Stack:
${failedTest.stack ?? "No stack trace available"}
`;

  const rootCause = inferRootCause(failedTest.errorMessage);
  const bugReport = bugReportTemplate(failureContent, rootCause);

  const fileName = `bug-report-${index + 1}.md`;
  const outputPath = path.join(outputDir, fileName);

  fs.writeFileSync(outputPath, bugReport, "utf-8");

  console.log(`Bug report generated: ${outputPath}`);
}
