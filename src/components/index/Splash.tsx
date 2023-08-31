import { motion, useAnimation } from "framer-motion";
import { useCallback, useState } from "react";
import { spalshVariants } from "src/animations/splash";
import styled from "styled-components/macro";

import splashLottie from "@assets/lotties/SplashLogo.json";

import Lottie from "@components/globals/Lottie";

import colors from "@constants/colors";

import { useNoticeModalState } from "@hooks/noticeModal";

interface SplashProps {}

const Splash = ({}: SplashProps) => {
  const controls = useAnimation();
  const [disable, setDisable] = useState(false);

  const [, setIsNoticeModalOpen] = useNoticeModalState();

  const onCompleteHandler = useCallback(async () => {
    await controls.start("close");

    setDisable(true);
    setIsNoticeModalOpen(true);
  }, [controls, setIsNoticeModalOpen]);

  if (disable) {
    return null;
  }

  return (
    <Container animate={controls} variants={spalshVariants} initial="initial">
      <LottieContainer>
        <Lottie
          animationData={splashLottie}
          renderer="canvas"
          onCompleteHandler={onCompleteHandler}
        />
      </LottieContainer>
    </Container>
  );
};

const Container = styled(motion.div)`
  position: fixed;
  left: 0;
  top: 0;

  width: 100vw;
  height: 100vh;

  background-color: ${colors.white};

  z-index: 1000;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const LottieContainer = styled.div`
  width: 250px;
  height: 250px;
`;

export default Splash;
