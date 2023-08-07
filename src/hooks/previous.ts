/**
 * 주어진 값의 이전 값을 반환합니다.
 * @template T
 * @param {T} value - 이전 값을 가져올 값입니다.
 * @returns {T | undefined} - 주어진 값의 이전 값입니다.
 */
import { useEffect, useRef } from "react";

export const usePrevious = <T>(value: T) => {
  const ref = useRef<T>();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
};
