export function cleanErrorMessage(rawMessage: string): string {
  const escapeChar = String.fromCharCode(27);
  const bellChar = String.fromCharCode(7);

  return rawMessage
    .replace(new RegExp(`${escapeChar}\\[[0-9;]*[A-Za-z]`, "g"), "")
    .replace(new RegExp(`${escapeChar}\\][0-9];.*?${bellChar}`, "g"), "")
    .split("\n")
    .map((line) => line.trimEnd())
    .filter(Boolean)
    .slice(0, 20)
    .join("\n");
}
