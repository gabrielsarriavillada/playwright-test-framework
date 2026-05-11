export function inferSeverity(errorMessage: string): string {
  const normalizedError = errorMessage.toLowerCase();

  if (
    normalizedError.includes("401") ||
    normalizedError.includes("unauthorized") ||
    normalizedError.includes("token")
  ) {
    return "High";
  }

  if (
    normalizedError.includes("500") ||
    normalizedError.includes("internal server error")
  ) {
    return "High";
  }

  if (
    normalizedError.includes("404") ||
    normalizedError.includes("not found")
  ) {
    return "Medium";
  }

  if (
    normalizedError.includes("tobevisible") ||
    normalizedError.includes("tohavetext") ||
    normalizedError.includes("tohavevalue")
  ) {
    return "Medium";
  }

  if (
    normalizedError.includes("timeout") ||
    normalizedError.includes("waiting for")
  ) {
    return "Medium";
  }

  return "Low";
}
