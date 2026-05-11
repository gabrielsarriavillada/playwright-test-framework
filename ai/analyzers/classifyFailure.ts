export function classifyFailure(errorMessage: string): string {
  const normalizedError = errorMessage.toLowerCase();

  if (
    normalizedError.includes("401") ||
    normalizedError.includes("unauthorized") ||
    normalizedError.includes("token")
  ) {
    return "Authentication";
  }

  if (
    normalizedError.includes("404") ||
    normalizedError.includes("not found")
  ) {
    return "Missing resource or element";
  }

  if (
    normalizedError.includes("tobevisible") ||
    normalizedError.includes("tohavetext") ||
    normalizedError.includes("tohavevalue")
  ) {
    return "Assertion mismatch";
  }

  if (
    normalizedError.includes("timeout") ||
    normalizedError.includes("waiting for")
  ) {
    return "Synchronization / timing";
  }

  if (
    normalizedError.includes("500") ||
    normalizedError.includes("internal server error")
  ) {
    return "Server error";
  }

  return "Unclassified";
}
