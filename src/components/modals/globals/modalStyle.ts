import styled from "styled-components/macro";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;

  z-index: 1000;

  background: rgba(0, 0, 0, 0.4);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.div`
  width: 440px;

  /* 크롬 혐그 회피용 꼼수 */
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  border-end-start-radius: 30px;
  border-end-end-radius: 30px;

  backdrop-filter: blur(12.5px);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
