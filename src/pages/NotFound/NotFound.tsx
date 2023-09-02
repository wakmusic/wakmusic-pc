import styled from "styled-components/macro";

import notFoundImage from "@assets/imgs/404.png";

import PageLayout from "@layouts/PageLayout";

interface NotFoundProps {}

const NotFound = ({}: NotFoundProps) => {
  return (
    <PageLayout>
      <Container>
        <Wakdu src={notFoundImage} />
      </Container>
    </PageLayout>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wakdu = styled.img`
  width: 600px;
  height: 600px;
`;

export default NotFound;
