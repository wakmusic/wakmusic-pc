import { myListState } from "@state/user/atoms";
import { Playlist } from "@templates/playlist";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import { ReactComponent as DragPlaylist } from "@assets/icons/ic_24_move.svg";
import { ReactComponent as PlayAll } from "@assets/icons/ic_24_play_all.svg";

import { T6Medium, T7Light } from "@components/Typography";

import colors from "@constants/colors";

import { XY } from "@pages/user/Playlists";

interface PlaylistItemProps {
  item: Playlist;
  isDragMode: boolean;
  onDrag: (target: string, position: XY) => void;
}

const PlaylistItem = ({ item, isDragMode, onDrag }: PlaylistItemProps) => {
  const [isEditMode] = useRecoilState(myListState);
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    if (!isDragMode) {
      setSelected(false);
    }
  }, [isDragMode]);

  return !isSelected || !isDragMode ? (
    <Container>
      <Icon
        src={`https://static.wakmusic.xyz/static/playlist/${item.image.version}.png`}
      />
      <InfoContainer>
        <Title>{item.title}</Title>
        <Volume>{item.songs.length}곡</Volume>
        {isEditMode ? (
          <DragPlaylist
            onMouseDown={(e) => {
              onDrag(item.key, { x: e.clientX, y: e.clientY });
              setSelected(true);
            }}
          ></DragPlaylist>
        ) : (
          <PlayAll></PlayAll>
        )}
      </InfoContainer>
    </Container>
  ) : (
    <Container></Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 222px;
  height: 74px;

  margin: 0px 16px 16px 0px;
`;

const Icon = styled.img`
  width: 74px;
  height: 74px;

  border-radius: 9px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 70px;

  margin-left: 8px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled(T6Medium)`
  color: ${colors.gray700};
`;

const Volume = styled(T7Light)`
  color: ${colors.blueGray500};
`;

export default PlaylistItem;
