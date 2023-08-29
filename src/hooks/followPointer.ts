import throttle from "lodash.throttle";
import { RefObject, useEffect, useState } from "react";

export function useFollowPointer(ref: RefObject<HTMLElement>, motion = 1) {
  const [point, setPoint] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = throttle(({ clientX, clientY }: MouseEvent) => {
      const element = ref.current;

      if (!element) return;

      const x =
        (clientX - element.offsetLeft - element.offsetWidth / 2) * motion;

      const y =
        (clientY - element.offsetTop - element.offsetHeight / 2) * motion;

      setPoint({ x, y });
    });

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [motion, ref]);

  return point;
}
