type FailedTest = {
  suite: string;
  title: string;
  project: string;
  errorMessage: string;
  stack?: string;
};

export type DeduplicatedFailure = {
  suite: string;
  title: string;
  projects: string[];
  errorMessage: string;
  stack?: string;
};

function normalizeError(error: string): string {
  return error.toLowerCase().replace(/\s+/g, " ").slice(0, 300);
}

export function deduplicateFailures(
  failures: FailedTest[],
): DeduplicatedFailure[] {
  const grouped = new Map<string, DeduplicatedFailure>();

  for (const failure of failures) {
    const key = `${failure.title}::${normalizeError(failure.errorMessage)}`;

    const existing = grouped.get(key);

    if (existing) {
      if (!existing.projects.includes(failure.project)) {
        existing.projects.push(failure.project);
      }
    } else {
      grouped.set(key, {
        suite: failure.suite,
        title: failure.title,
        projects: [failure.project],
        errorMessage: failure.errorMessage,
        stack: failure.stack,
      });
    }
  }

  return Array.from(grouped.values());
}
