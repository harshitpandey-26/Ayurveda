// Helper function
export default function normalizeTime(time) {
  if (typeof time === "number") {
    return `${String(time).padStart(2, "0")}:00:00`;
  }
  if (/^\d{1,2}$/.test(time)) {
    return `${time.padStart(2, "0")}:00:00`;
  }
  return time;
}