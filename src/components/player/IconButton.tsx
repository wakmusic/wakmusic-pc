import styled from "styled-components";

interface IconButtonProps {
  icon: React.FC;
  onClick?: () => void;
}

const IconButton = ({ icon: Icon, onClick }: IconButtonProps) => {
  return (
    <Container onClick={onClick}>
      <Icon />
    </Container>
  );
};

const Container = styled.div`
  cursor: pointer;
`;

export default IconButton;
