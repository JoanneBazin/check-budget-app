export const extractArrayErrors = (
  errors: Record<string, string>,
  prefix: string
): string[] => {
  const result: string[] = [];

  Object.entries(errors).forEach(([key, message]) => {
    if (key.startsWith(prefix)) {
      const parts = key.split(".");
      const index = parseInt(parts[1], 10);
      result[index] = message;
    }
  });
  return result;
};
