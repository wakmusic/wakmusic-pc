import styled from "styled-components";

interface IconButtonProps {
  icon: React.FC;
  onClick?: () => void;
}

const SimpleIconButton = ({ icon: Icon, onClick }: IconButtonProps) => {
  return (
    <Container onClick={onClick}>
      <Icon />
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;

  display: flex;
  align-items: center;
`;

export default SimpleIconButton;
