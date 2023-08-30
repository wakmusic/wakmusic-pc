import { toastState } from "@state/toast/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useToast = () => {
  const setState = useSetRecoilState(toastState);

  const queueToast = (content: string) => {
    return new Promise<void>(() => {
      setState((prev) => [...prev, content]);
    });
  };

  return queueToast;
};

export const useToastState = () => {
  return useRecoilState(toastState);
};
