import styled from "styled-components/macro";

interface SpinnerProps {}

const Spinner = ({}: SpinnerProps) => {
  return (
    <Container>
      <SpinnerWrapper />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 20px;
`;

const SpinnerWrapper = styled.div`
  display: inline-block;

  width: 20px;
  height: 20px;

  border: 2px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;

  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
