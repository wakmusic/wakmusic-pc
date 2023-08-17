import { Dispatch, RefObject, SetStateAction, useEffect } from "react";

export const useScrollToTop = (
  someHook: unknown,
  viewportRef: RefObject<HTMLDivElement>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelected: Dispatch<SetStateAction<any[]>> | undefined
) => {
  useEffect(() => {
    if (setSelected) setSelected([]);

    viewportRef.current?.scrollTo(0, 0);
  }, [someHook, viewportRef, setSelected]);
};
