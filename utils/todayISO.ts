// get today as ISO string, format (2023-12-24)
export function getTodayISO() {
  return new Date().toISOString().slice(0, 10).trim();
}
