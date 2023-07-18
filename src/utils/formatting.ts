export function formatDateTime(date: Date): string {
  return (
    `${(date.getMonth() + 1).toString().padStart(2, "0")}월 ` +
    `${date.getDate().toString().padStart(2, "0")}일 ` +
    `${
      date.getHours() > 12
        ? "오후 " + (date.getHours() - 12)
        : "오전 " + date.getHours()
    }시`
  );
}

export function formatSecond(second: number): string {
  const hour = Math.floor(second / (60 * 60));
  const minute = Math.floor((second / 60) % 60);
  const sec = Math.floor(second % 60);

  return (
    (hour > 0 ? `${hour.toString().padStart(2, "0")}:` : "") +
    minute.toString().padStart(2, "0") +
    ":" +
    sec.toString().padStart(2, "0")
  );
}

export function formatNumber(num: number): string {
  if (num < 1000) return num.toString();

  if (num < 10_000) return `${parseFloat((num / 1000).toFixed(2))}천`;

  if (num < 100_000) return `${parseFloat((num / 10_000).toFixed(2))}만`;

  if (num < 1_000_000) return `${parseFloat((num / 10_000).toFixed(1))}만`;

  if (num < 100_000_000) return `${Math.floor(num / 10_000)}만`;

  if (num < 1_000_000_000)
    return `${parseFloat((num / 100_000_000).toFixed(2))}억`;

  if (num < 10_000_000_000)
    return `${parseFloat((num / 100_000_000).toFixed(1))}억`;

  return `${Math.floor(num / 100_000_000)}억`;
}
