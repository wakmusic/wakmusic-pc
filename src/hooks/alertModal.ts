import { alertModalState } from "@state/alertModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

export const useAlertModal = () => {
  const setState = useSetRecoilState(alertModalState);

  const openAlertModal = (title: string, children: React.ReactNode) => {
    return new Promise<void>((resolve) => {
      setState({
        isOpen: true,
        title,
        children,
        resolve,
      });
    });
  };

  return openAlertModal;
};

export const useAlertModalState = () => {
  return useRecoilState(alertModalState);
};
