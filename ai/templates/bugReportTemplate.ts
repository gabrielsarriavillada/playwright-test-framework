export function bugReportTemplate(
  summary: string,
  failureContent: string,
  failureCategory: string,
  aiAnalysis: string,
): string {
  return `
# AI-Assisted Bug Report

## Summary
${summary}

## Failure Category
${failureCategory}

## Failure Input
${failureContent}

## AI Analysis
${aiAnalysis}

## Automation Notes
This report was generated from Playwright failure output and enriched with AI-assisted analysis. It should be reviewed before being shared as a final bug report.
`;
}
