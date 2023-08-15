import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useScrollToTop = <T>(
  someHook: unknown,
  viewportRef: RefObject<HTMLDivElement>,
  setSelected: Dispatch<SetStateAction<T[]>> | undefined
) => {
  useEffect(() => {
    if (setSelected) setSelected([]);

    viewportRef.current?.scrollTo(0, 0);
  }, [someHook, viewportRef, setSelected]);
};
