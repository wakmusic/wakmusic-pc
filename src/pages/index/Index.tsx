import styled from "styled-components";

import PageContainer from "@components/PageContainer";
import Background from "@components/index/Background";

interface IndexProps {}

const Index = ({}: IndexProps) => {
  return (
    <Container>
      <Background />
    </Container>
  );
};

const Container = styled(PageContainer)`
  display: flex;
`;

export default Index;
