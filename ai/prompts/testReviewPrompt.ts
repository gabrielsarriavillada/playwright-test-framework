type TestReviewPromptInput = {
  testPath: string;
  testContent: string;
};

export function buildTestReviewPrompt(input: TestReviewPromptInput): string {
  return `
You are a Senior QA Automation Engineer reviewing a Playwright test.

Review the test from the following perspectives:

- Maintainability
- Reliability
- Locator strategy
- Assertion quality
- Readability
- Test design

Important rules:

Base feedback only on the supplied code.
Do not invent missing files, fixtures, page objects, helper functions, or project requirements.
Do not assume project context that is not present in the test.
Avoid generic recommendations.
Focus on practical improvements that would increase maintainability, reliability, or readability.
Mention positive aspects when present.
Do not suggest refactoring unless there is a clear benefit.
If a practice is acceptable, do not criticize it unnecessarily.
Keep the review concise and actionable.

Provide the response using exactly the following sections:

# AI Test Review

## Strengths

List the positive aspects of the test.

## Findings

For each finding include:

### Finding N

Severity: Low, Medium, High

Explanation:
Explain why this is a concern.

Suggested Improvement:
Provide a practical recommendation.

If no significant findings exist, explicitly state that no major issues were identified.

## Recommendations

Provide the 3 most impactful recommendations in priority order.

## Overall Assessment

Provide a short summary of the overall quality of the test and identify the single most important improvement.

Test file:
${input.testPath}

Test code:

\`\`\`ts
${input.testContent}
\`\`\`
`;
}
