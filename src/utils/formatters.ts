export function formatTime(seconds: number): string {
  return Math.max(0, Math.ceil(seconds)).toString();
}

export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max) + '…';
}
