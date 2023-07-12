import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const el = document.getElementById("modals") as HTMLElement;
  return createPortal(children, el);
};

export default ModalPortal;
