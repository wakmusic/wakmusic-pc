import { motion, useAnimation } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { spalshVariants } from "src/animations/splash";
import styled from "styled-components/macro";

import splashLottie from "@assets/lotties/SplashLogo.json";

import Lottie from "@components/globals/Lottie";

import colors from "@constants/colors";

import { useAlertModal } from "@hooks/alertModal";
import { useNoticeModalState } from "@hooks/noticeModal";

import { isUndefined } from "@utils/isTypes";
import { ipcRenderer } from "@utils/modules";

interface SplashProps {}

const Splash = ({}: SplashProps) => {
  const controls = useAnimation();
  const [disable, setDisable] = useState(
    import.meta.env.VITE_NO_SPLASH === "true"
  );

  const [isShowAlert, setIsShowAlert] = useState(false);

  const [, setIsNoticeModalOpen] = useNoticeModalState();

  const alert = useAlertModal();

  const onCompleteHandler = useCallback(async () => {
    await controls.start("close");

    setDisable(true);
    setIsNoticeModalOpen(true);
  }, [controls, setIsNoticeModalOpen]);

  useEffect(() => {
    if (disable && !isShowAlert && !isUndefined(ipcRenderer)) {
      alert(
        "웹 버전 이용 안내",
        "현재 PC 앱을 일반 브라우저로 접속하여 이용하는 버전은 정식으로 제공하는 기능이 아닙니다. 따라서 일부 기능이 PC 앱과 다르게 작동할 수 있으니 양해 부탁드립니다."
      );

      setIsShowAlert(true);
    }
  }, [disable, alert, isShowAlert]);

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
