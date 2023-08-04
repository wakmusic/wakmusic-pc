import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import { useState } from "react";
import { spalshVariants } from "src/animations/splash";
import styled from "styled-components/macro";

import splashLogo from "@assets/lotties/SplashLogo.json";

import colors from "@constants/colors";

interface LogoProps {}

const Logo = ({}: LogoProps) => {
  const controls = useAnimation();
  const [disable, setDisable] = useState(false);

  const onCompleteHandler = async () => {
    await controls.start("close");
    setDisable(true);
  };

  if (disable) {
    return null;
  }

  return (
    <Container animate={controls} variants={spalshVariants} initial="initial">
      <LogoLottie
        animationData={splashLogo}
        loop={false}
        onComplete={onCompleteHandler}
      />
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

const LogoLottie = styled(Lottie)`
  width: 250px;
`;

export default Logo;
