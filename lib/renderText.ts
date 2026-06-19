export function renderText(value?: string | null): string {
  if (typeof value !== "string") {
    return "";
  }

  if (value.includes("{{") || value.includes("}}")) {
    return "";
  }

  return value.trim();
}
