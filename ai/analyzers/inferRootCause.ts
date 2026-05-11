export function inferRootCause(errorMessage: string): string {
  const normalizedError = errorMessage.toLowerCase();

  if (
    normalizedError.includes("401") ||
    normalizedError.includes("unauthorized") ||
    normalizedError.includes("token")
  ) {
    return "Authentication failed. The user session or API token may be missing, expired, invalid, or not correctly injected before the tested action.";
  }

  if (
    normalizedError.includes("tobevisible") &&
    normalizedError.includes("not found")
  ) {
    return "The expected element was not found in the DOM. Possible causes include an incorrect locator, the element not being rendered, a failed previous action, or the assertion running before the UI is ready.";
  }

  if (normalizedError.includes("tohavevalue")) {
    return "The field value did not match the expected value. Possible causes include the input not accepting the change, an incorrect selector, unexpected default data, or application logic restoring the original value.";
  }

  if (
    normalizedError.includes("timeout") ||
    normalizedError.includes("waiting for")
  ) {
    return "The test timed out while waiting for a condition. Possible causes include slow UI response, missing synchronization, incorrect locator, or the expected state never being reached.";
  }

  if (
    normalizedError.includes("404") ||
    normalizedError.includes("not found")
  ) {
    return "A requested resource or page was not found. Possible causes include an incorrect URL, missing test data, deleted resource, or routing issue.";
  }

  return "The failure requires manual investigation. Review the failing step, locator, application state, and related network activity.";
}
