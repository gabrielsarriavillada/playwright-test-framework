import fs from "fs";
import path from "path";

const inputFile = process.argv[2];

if (!inputFile) {
  console.error("Usage: npm run ai:bug-report <path-to-failure-file>");
  process.exit(1);
}

const failurePath = path.resolve(inputFile);
const failureContent = fs.readFileSync(failurePath, "utf-8");

const bugReport = `
# AI-Generated Bug Report

## Summary
A Playwright test failed during article creation. The API returned a 401 Unauthorized error because the authentication token was missing.

## Test Information
${failureContent}

## Actual Result
The article creation request failed with a 401 response.

## Expected Result
The authenticated user should be able to create an article successfully and be redirected to the article details page.

## Evidence
- Error: token is missing
- Status code: 401
- Source: Playwright test failure output

## Possible Root Cause
The authentication token may not have been correctly stored in the browser context before the article creation request was triggered.

## Suggested Investigation
1. Check whether the token is saved in localStorage before navigating to the editor page.
2. Verify that the app reads the same token key expected by the frontend.
3. Confirm that authentication setup happens before the page loads.
4. Check if test isolation or parallel execution is clearing session state.

## Suggested Severity
Medium

## Automation Notes
This is a good candidate for an integration test because it validates the interaction between API-created authentication state and UI article creation.
`;

console.log(bugReport);