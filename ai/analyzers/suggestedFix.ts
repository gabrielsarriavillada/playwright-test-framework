export function suggestFix(errorMessage: string): string {
  const normalizedError = errorMessage.toLowerCase();

  if (
    normalizedError.includes("401") ||
    normalizedError.includes("unauthorized") ||
    normalizedError.includes("token")
  ) {
    return "Verify that authentication setup runs before the page action. Check localStorage/sessionStorage token keys, API login response, and whether the browser context is correctly initialized.";
  }

  if (
    normalizedError.includes("tobevisible") &&
    normalizedError.includes("not found")
  ) {
    return "Confirm that the locator matches the current DOM. Then verify that the previous action actually triggers the expected UI change before asserting visibility.";
  }

  if (normalizedError.includes("tohavevalue")) {
    return "Check whether the input supports the attempted action. If testing clear behavior, prefer locator.clear() and then assert the resulting value.";
  }

  if (
    normalizedError.includes("timeout") ||
    normalizedError.includes("waiting for")
  ) {
    return "Replace fixed waits with web-first assertions. Verify that the expected condition is realistic and that the locator targets a stable element.";
  }

  if (
    normalizedError.includes("404") ||
    normalizedError.includes("not found")
  ) {
    return "Verify the target URL, route, and test data setup. Confirm that the resource exists before navigating or asserting against it.";
  }

  return "Review the failing step, reproduce the issue locally, inspect the trace, and decide whether the failure belongs to the application, test data, or automation code.";
}
