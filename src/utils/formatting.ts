export function formatSecond(second: number): string {
  const hour = Math.floor(second / (60 * 60));
  const minute = Math.floor((second % (60 * 60)) / 60);
  const sec = Math.floor(second % 60);

  return `${hour > 0 ? `${hour}:` : ""}${minute
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
}

export function formatViews(view: number): string {
  if (view < 1000) {
    return view.toString();
  }

  if (view < 10000) {
    return `${(view / 1000).toFixed(2)}천`;
  }

  if (view < 10000 * 100) {
    return `${(view / (1000 * 10)).toFixed(2)}만`;
  }

  return `${Math.round(view / (1000 * 10))}만`;
}
