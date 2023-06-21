import styled from "styled-components";

interface HelloWorldProps {}

const HelloWorld = ({}: HelloWorldProps) => {
  return <Container>Hello, World!</Container>;
};

const Container = styled.h1`
  margin: 0;

  text-align: center;
`;

export default HelloWorld;
