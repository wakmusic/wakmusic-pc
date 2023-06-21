import styled from "styled-components";

import HelloWorld from "@components/index/HelloWorld";

interface IndexProps {}

const Index = ({}: IndexProps) => {
  return (
    <Container>
      <HelloWorld />
    </Container>
  );
};

const Container = styled.div``;

export default Index;
