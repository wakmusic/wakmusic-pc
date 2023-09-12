import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { toastVariants } from "src/animations/toast";
import styled from "styled-components/macro";

import { T6Light } from "@components/Typography";

import colors from "@constants/colors";

import { useToastState } from "@hooks/toast";

import { isUndefined } from "@utils/isTypes";
import { addAlpha } from "@utils/utils";

interface ToastProps {}

const Toast = ({}: ToastProps) => {
  const [toastState, setToastState] = useToastState();
  const [currentToast, setCurrentToast] = useState<string | undefined>();

  const controls = useAnimation();

  const nextToast = useCallback(() => {
    if (toastState.length > 0) {
      const newToastState = [...toastState];

      let nextToast = newToastState.shift();
      let count = 1;

      while (nextToast === newToastState[0]) {
        count++;
        newToastState.shift();
      }

      if (count > 1) {
        nextToast = `${nextToast} (x${count})`;
      }

      setCurrentToast(nextToast);
      setToastState(newToastState);

      (async () => {
        await controls.start("active");
        await controls.start("exit");
        controls.set("initial");
      })();
    }
  }, [controls, setToastState, toastState]);

  useEffect(() => {
    if (isUndefined(currentToast) && toastState.length === 1) {
      nextToast();
    }
  }, [currentToast, nextToast, toastState.length]);

  const onAnimationComplete = useCallback(
    (name: string) => {
      if (name === "exit") {
        setCurrentToast(undefined);
        nextToast();
      }
    },
    [nextToast]
  );

  return (
    <Overlay>
      <ToastContainer
        animate={controls}
        initial="initial"
        variants={toastVariants}
        onAnimationComplete={onAnimationComplete}
      >
        <T6Light color={colors.blueGray25}>{currentToast}</T6Light>
      </ToastContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  pointer-events: none;
  z-index: 1001;
`;

const ToastContainer = styled(motion.div)`
  position: fixed;
  bottom: 60px;
  left: 50%;

  transform: translateX(-50%);

  width: fit-content;
  min-width: 335px;
  height: 40px;

  padding: 0 20px;

  background-color: ${addAlpha(colors.blueGray600, 0.95)};
  border-radius: 90px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Toast;
