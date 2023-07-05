import styled from "styled-components";

import colors from "@constants/colors";

interface PlayerProps {}

const Player = ({}: PlayerProps) => {
  return <Container>(대충 플레이어 TODO)</Container>;
};

const Container = styled.div`
  margin-left: auto;

  width: 290px;
  height: calc(100vh - 38px);

  flex-shrink: 0;

  background-color: ${colors.gray900};

  color: white;
`;

export default Player;
