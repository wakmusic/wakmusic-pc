import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import { ReactComponent as AppleIconSVG } from "@assets/icons/ic_24_apple.svg";
import { ReactComponent as GoogleIconSVG } from "@assets/icons/ic_24_google.svg";
import { ReactComponent as NaverIconSVG } from "@assets/icons/ic_24_naver.svg";
import { ReactComponent as AppIconSVG } from "@assets/svgs/AppIcon.svg";

import { T4Bold, T5Light, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useLoginModalState } from "@hooks/modal";
import { useIsSpaceDisabled } from "@hooks/player";

import { LoginPlatform } from "@templates/user";

import { openExternal } from "@utils/modules";

import { ModalContainer, ModalOverlay } from "../globals/modalStyle";
import Button from "./Button";

interface LoginModalProps {}

const LoginModal = ({}: LoginModalProps) => {
  const [loginModalState, setLoginModalState] = useLoginModalState();
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const [loginError, setLoginError] = useState(false);

  const handleLogin = (platform: LoginPlatform) => {
    // Desktop App
    if (openExternal) {
      const openFn = loginError
        ? (url: string) => open(url, "_blank")
        : openExternal;

      openFn(`${import.meta.env.VITE_API_URL}/auth/pc/login/${platform}`);
    }

    // Web
    else {
      window.location.href = `${
        import.meta.env.VITE_API_URL
      }/auth/login/${platform}`;
    }

    setIsSpaceDisabled(false);
    setLoginModalState(false);
  };

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        setLoginModalState(false);
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [setLoginModalState]);

  if (!loginModalState) return null;

  return (
    <ModalOverlay onClick={() => setLoginModalState(false)}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <AppIconSVG />

          <Texts>
            <T4Bold>왁타버스 뮤직</T4Bold>
            <T5Light>페이지를 이용하기 위해 로그인이 필요합니다.</T5Light>
          </Texts>
        </Header>

        <Buttons>
          <Button platform="naver" onClick={handleLogin} inApp={loginError}>
            <NaverIconSVG />
          </Button>

          <Button platform="google" onClick={handleLogin} inApp={loginError}>
            <GoogleIconSVG />
          </Button>

          <Button platform="apple" onClick={handleLogin} inApp={loginError}>
            <AppleIconSVG />
          </Button>
        </Buttons>

        <LoginError onClick={() => setLoginError(!loginError)}>
          {loginError ? "이전 화면으로 돌아가기" : "로그인이 안 되나요?"}
        </LoginError>
      </Modal>
    </ModalOverlay>
  );
};

const Modal = styled(ModalContainer)`
  height: 538px;

  padding-top: 60px;
  padding-bottom: 56px;
  padding-left: 50px;
  padding-right: 50px;

  justify-content: space-between;

  background: ${colors.blueGray100}CC; // 80% opacity
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  align-items: center;
`;

const Texts = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 4px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  padding-top: 10px;
`;

const LoginError = styled(T6Medium)`
  color: ${colors.down};

  &:hover {
    text-decoration: underline;
  }

  cursor: pointer;
`;

export default LoginModal;
