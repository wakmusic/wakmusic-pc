import { useLoginModalState } from "@state/loginModal";
import styled from "styled-components";

import { ReactComponent as AppleIconSVG } from "@assets/icons/ic_24_apple.svg";
import { ReactComponent as GoogleIconSVG } from "@assets/icons/ic_24_google.svg";
import { ReactComponent as NaverIconSVG } from "@assets/icons/ic_24_naver.svg";
import { ReactComponent as AppIconSVG } from "@assets/svgs/AppIcon.svg";

import { T4Bold, T5Light } from "@components/Typography";
import ModalContainer from "@components/globals/ModalContainer";

import colors from "@constants/colors";

import LoginModalButton from "./LoginModalButton";

interface LoginModalProps {}

const LoginModal = ({}: LoginModalProps) => {
  const [loginModalState, setLoginModalState] = useLoginModalState();

  if (!loginModalState) return null;

  const handleLogin = (platform: string) => {
    alert(`${platform}로 로그인합니다.`);
    setLoginModalState(false);
  };

  return (
    <Container>
      <Modal>
        <Header>
          <AppIconSVG />

          <Texts>
            <T4Bold>왁타버스 뮤직</T4Bold>
            <T5Light>페이지를 이용하기 위해 로그인이 필요합니다.</T5Light>
          </Texts>
        </Header>

        <Buttons>
          <LoginModalButton platform="네이버" onClick={handleLogin}>
            <NaverIconSVG />
          </LoginModalButton>

          <LoginModalButton platform="구글" onClick={handleLogin}>
            <GoogleIconSVG />
          </LoginModalButton>

          <LoginModalButton platform="애플" onClick={handleLogin}>
            <AppleIconSVG />
          </LoginModalButton>
        </Buttons>
      </Modal>
    </Container>
  );
};

const Container = styled(ModalContainer)`
  background: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  width: 440px;
  height: 538px;

  border-radius: 24px;
  background: ${colors.blueGray100}CC; // 80% opacity
  backdrop-filter: blur(12.5px);

  padding: 72px 50px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
