export function generateSummary(
  testTitle: string,
  errorMessage: string,
): string {
  const normalizedError = errorMessage.toLowerCase();

  if (
    normalizedError.includes("401") ||
    normalizedError.includes("unauthorized") ||
    normalizedError.includes("token")
  ) {
    return `The test "${testTitle}" failed due to an authentication-related error.`;
  }

  if (
    normalizedError.includes("tobevisible") &&
    normalizedError.includes("not found")
  ) {
    return `The test "${testTitle}" failed because an expected UI element was not found or was not visible.`;
  }

  if (normalizedError.includes("tohavevalue")) {
    return `The test "${testTitle}" failed because an input field value did not match the expected value.`;
  }

  if (
    normalizedError.includes("timeout") ||
    normalizedError.includes("waiting for")
  ) {
    return `The test "${testTitle}" failed due to a timeout while waiting for the expected condition.`;
  }

  if (
    normalizedError.includes("404") ||
    normalizedError.includes("not found")
  ) {
    return `The test "${testTitle}" failed because a required page, resource, or element was not found.`;
  }

  return `The test "${testTitle}" failed and requires investigation.`;
}
