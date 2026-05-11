export function inferConfidence(errorMessage: string): string {
  const normalizedError = errorMessage.toLowerCase();

  const clearPatterns = [
    "401",
    "unauthorized",
    "token",
    "500",
    "internal server error",
    "404",
    "tobevisible",
    "tohavetext",
    "tohavevalue",
    "timeout",
    "waiting for",
  ];

  const hasClearPattern = clearPatterns.some((pattern) =>
    normalizedError.includes(pattern),
  );

  return hasClearPattern ? "High" : "Low";
}