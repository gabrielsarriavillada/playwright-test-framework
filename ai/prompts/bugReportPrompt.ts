type BugReportPromptInput = {
  testTitle: string;
  suite: string;
  projects: string[];
  error: string;
  stack?: string;
  severity: string;
  category: string;
};

export function buildBugReportPrompt(input: BugReportPromptInput): string {
  return `
You are a Senior QA Engineer reviewing a Playwright test failure.

Analyze the failure and provide:

1. A concise bug summary
2. A probable root cause
3. A suggested investigation or fix

Keep the response concise and practical.

Failure details:

Test Title:
${input.testTitle}

Suite:
${input.suite}

Affected Projects:
${input.projects.join(", ")}

Severity:
${input.severity}

Category:
${input.category}

Error:
${input.error}

Stack:
${input.stack ?? "No stack trace available"}
`;
}
