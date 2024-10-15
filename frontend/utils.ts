export function containsAllOf(str: string, substrings: string[]): boolean {
  return substrings.every((substring) => str.toLowerCase().includes(substring));
}
