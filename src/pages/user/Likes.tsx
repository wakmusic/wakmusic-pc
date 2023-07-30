import styled from "styled-components/macro";

import * as Typography from "@components/Typography";

interface LikesProps {}

const Likes = ({}: LikesProps) => {
  return (
    <Container>
      <Typography.PretendardBold>Likes</Typography.PretendardBold>
    </Container>
  );
};

const Container = styled.div``;

export default Likes;
