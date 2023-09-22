/**
 * HEX 컬러에 투명도를 추가합니다.
 * @param color - HEX 컬러 코드
 * @param opacity - 투명도
 * @returns 투명도가 추가된 HEX 컬러 코드
 */
export const addAlpha = (hex: string, alpha: number) =>
  `${hex}${Math.floor(alpha * 255)
    .toString(16)
    .padStart(2, "0")}`;

export const isSameArray = (a: unknown[], b: unknown[]) =>
  a.length === b.length && a.every((v, i) => v === b[i]);

export const isMyPage = (path: string) =>
  ["/mywakmu", "/about", "/support", "/teams"].includes(path);
