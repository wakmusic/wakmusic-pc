import styled from "styled-components/macro";

import { ReactComponent as AppleIconSVG } from "@assets/icons/ic_24_apple.svg";
import { ReactComponent as GoogleIconSVG } from "@assets/icons/ic_24_google.svg";
import { ReactComponent as NaverIconSVG } from "@assets/icons/ic_24_naver.svg";
import { ReactComponent as AppIconSVG } from "@assets/svgs/AppIcon.svg";

import { T4Bold, T5Light } from "@components/Typography";

import colors from "@constants/colors";

import { useLoginModalState } from "@hooks/loginModal";
import { useUserState } from "@hooks/user";

import { ModalContainer, ModalOverlay } from "../globals/modalStyle";
import Button from "./Button";

interface LoginModalProps {}

const LoginModal = ({}: LoginModalProps) => {
  const [loginModalState, setLoginModalState] = useLoginModalState();
  const [user, setUser] = useUserState();

  if (!loginModalState) return null;

  const handleLogin = (platform: string) => {
    setUser({
      displayName: "왁타버스 뮤직",
      profile: {
        type: "panchi",
        version: 2,
      },
    });

    setLoginModalState(false);
  };

  return (
    <ModalOverlay>
      <Modal>
        <Header>
          <AppIconSVG />

          <Texts>
            <T4Bold>왁타버스 뮤직</T4Bold>
            <T5Light>페이지를 이용하기 위해 로그인이 필요합니다.</T5Light>
          </Texts>
        </Header>

        <Buttons>
          <Button platform="네이버" onClick={handleLogin}>
            <NaverIconSVG />
          </Button>

          <Button platform="구글" onClick={handleLogin}>
            <GoogleIconSVG />
          </Button>

          <Button platform="애플" onClick={handleLogin}>
            <AppleIconSVG />
          </Button>
        </Buttons>
      </Modal>
    </ModalOverlay>
  );
};

const Modal = styled(ModalContainer)`
  height: 538px;
  padding: 72px 50px;

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
`;

export default LoginModal;
