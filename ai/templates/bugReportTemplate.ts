export function bugReportTemplate(
  summary: string,
  failureContent: string,
  rootCause: string,
  suggestedFix: string,
  severity: string,
  failureCategory: string,
): string {
  return `
# AI-Generated Bug Report

## Summary
${summary}

## Failure Category
${failureCategory}

## Failure Input
${failureContent}

## Actual Result
The test failed during execution.

## Expected Result
The tested user flow should complete successfully.

## Evidence
- Source: Playwright failure output
- Failure details included in the input above

## Possible Root Cause
${rootCause}

## Suggested Fix
${suggestedFix}

## Suggested Investigation
1. Review the failing step and related page object method.
2. Check network requests around the failure.
3. Verify test data setup and authentication state.
4. Confirm whether the issue reproduces manually.
5. Check if the failure is isolated or caused by parallel execution.

## Suggested Severity
${severity}

## Automation Notes
This report was generated from Playwright failure output and should be reviewed before being shared as a final bug report.
`;
}
