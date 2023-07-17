import styled from "styled-components";

import Menu from "@components/user/playlist/Menu";
import PlaylistItem from "@components/user/playlist/PlaylistItem";

import colors from "@constants/colors";
import { myList } from "@constants/dummys";

interface PlaylistProps {}

const Playlist = ({}: PlaylistProps) => {
  return (
    <Container>
      <Menu />
      <PlayLists>
        {myList.map((item, index) => (
          <PlaylistItem key={index} item={item} />
        ))}
      </PlayLists>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0px 0px 20px;
`;

const PlayLists = styled.div`
  display: flex;
  flex-flow: wrap;
  align-content: flex-start;

  width: 100%;
  height: calc(100vh - 222px);

  margin-top: 16px;
  padding-right: 2px;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-button {
    width: 0;
    height: 0;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 99px;
    background-color: ${colors.blueGray300};
  }

  &::-webkit-scrollbar-thumb:hover {
    cursor: pointer;
  }
`;

export default Playlist;
