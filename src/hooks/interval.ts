import { useEffect, useRef } from "react";

/**
 * 일정한 시간 간격으로 콜백 함수를 실행하는 훅입니다.
 * @param callback - 일정한 시간 간격으로 실행할 콜백 함수입니다.
 * @param interval - 콜백 함수를 실행할 시간 간격입니다.
 */
export const useInterval = (callback: () => void, interval: number) => {
  const savedCallback = useRef<(() => void) | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
      if (savedCallback.current) {
        savedCallback.current();
      }
    }

    const id = setInterval(tick, interval);
    return () => clearInterval(id);
  }, [interval]);
};
