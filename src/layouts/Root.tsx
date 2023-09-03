import { Outlet } from "react-router-dom";
import PlayerService from "src/player/PlayerService";
import styled from "styled-components/macro";

import GNB from "@components/gnb/GNB";
import Header from "@components/header/Header";
import Splash from "@components/index/Splash";
import Player from "@components/player/Default/Player";
import Visual from "@components/player/Visual/Visual";

import CheckPlayerMode from "@utils/checkPlayerMode";

interface RootProps {}

const Root = ({}: RootProps) => {
  return (
    <>
      <Splash />

      <Header />
      <Overlay>
        <GNB />

        <Outlet />

        <Player />
        <Visual />
      </Overlay>

      <CheckPlayerMode />
      <PlayerService />
    </>
  );
};

const Overlay = styled.div`
  display: flex;

  justify-content: space-between;

  & > *:nth-child(2) {
    margin-right: 20px;
  }
`;

export default Root;
