import styled from "styled-components/macro";

interface NodeProps {
  node: React.FC;
  className?: string;
}

const Node = ({ node: Node, className }: NodeProps) => {
  return (
    <Container className={className}>
      <Node />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  position: relative;

  margin-top: -4px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Node;
