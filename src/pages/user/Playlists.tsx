import { myListState } from "@state/user/atoms";
import { Playlist } from "@templates/playlist";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import Menu from "@components/user/playlist/Menu";
import PlaylistItem from "@components/user/playlist/PlaylistItem";

import colors from "@constants/colors";
import { myList } from "@constants/dummys";

interface XY {
  x: number;
  y: number;
}

interface PlaylistsProps {}

const Playlists = ({}: PlaylistsProps) => {
  const [isEditMode] = useRecoilState(myListState);
  const [myPlayLists, setMyPlayList] = useState<Playlist[]>(myList);
  const [isDragMode, setDragMode] = useState(false);
  const [dragStart, setDragStart] = useState<XY>({ x: 0, y: 0 });
  const [dragTarget, setDragTarget] = useState<Playlist>(myList[0]);
  const [playlistInitialPosition, setPlayListInitialPosition] = useState<XY>({
    x: 0,
    y: 0,
  });
  const [DragPosition, setDragPostion] = useState<XY>({ x: 0, y: 0 });

  const getPlaylistIndex = (target: string): number => {
    let targetIndex = 0;
    myPlayLists.forEach((playlist, index) => {
      if (playlist.key === target) {
        targetIndex = index;
      }
    });

    return targetIndex;
  };

  const getPlaylistInitialPosition = (target: string): XY => {
    const targetIndex = getPlaylistIndex(target);

    return { x: (targetIndex % 3) * 238, y: Math.floor(targetIndex / 3) * 90 };
  };

  const initializeDragTarget = (target: string, position: XY) => {
    if (!isEditMode) {
      return;
    }

    setDragMode(true);
    setDragTarget(myPlayLists[getPlaylistIndex(target)]);

    const initialPosition = getPlaylistInitialPosition(target);
    setDragPostion(initialPosition);
    setPlayListInitialPosition(initialPosition);

    setDragStart(position);
  };

  const movePlayList = (event: React.MouseEvent) => {
    if (!isEditMode || !isDragMode) {
      return;
    }

    const movementX = event.clientX - dragStart.x;
    const movementY = event.clientY - dragStart.y;

    setDragPostion({
      x: playlistInitialPosition.x + movementX,
      y: playlistInitialPosition.y + movementY,
    });

    const dragPlaylistIndex = getPlaylistIndex(dragTarget.key);
    let dropTargetPlaylist = dragPlaylistIndex;
    // console.log(Math.floor(movementX / 238), Math.floor(movementY / 50));
    const indexX = Math.floor(movementX / 238);
    const indexY = Math.floor(movementY / 50);

    if (indexY < 0 && dragPlaylistIndex < 3) {
      dropTargetPlaylist += 0;
    } else {
      dropTargetPlaylist += indexY * 3;
    }

    if (indexX <= 0 && dragPlaylistIndex % 3 === 0) {
      dropTargetPlaylist += 0;
    } else {
      dropTargetPlaylist += indexX;
    }

    // console.log(indexX * 3 + indexY + getPlaylistIndex(dragTarget.key));
    if (dropTargetPlaylist >= myPlayLists.length) {
      dropTargetPlaylist = myPlayLists.length - 1;
    }

    console.log(dropTargetPlaylist);

    const editedMyList = myPlayLists.slice();
    const switchTarget = myPlayLists[dropTargetPlaylist];

    editedMyList[dropTargetPlaylist] = myPlayLists[dragPlaylistIndex];
    editedMyList[dragPlaylistIndex] = switchTarget;

    setMyPlayList(editedMyList);
  };

  return (
    <Container
      onMouseMove={movePlayList}
      onMouseUp={() => {
        setDragMode(false);
      }}
      onMouseLeave={() => {
        setDragMode(false);
      }}
    >
      <Menu />
      <PlayLists>
        {myPlayLists.map((item, index) => (
          <PlaylistItem
            key={index}
            item={item}
            isDragMode={isDragMode}
            onDrag={initializeDragTarget}
          />
        ))}
        <DragedPlaylist $hide={!isDragMode} position={DragPosition}>
          <PlaylistItem
            item={dragTarget}
            isDragMode={isDragMode}
            onDrag={initializeDragTarget}
          />
        </DragedPlaylist>
      </PlayLists>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0px 0px 20px;
`;

const PlayLists = styled.div`
  position: relative;
  z-index: 1;

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

interface DragedPlaylistProps {
  $hide: boolean;
  position: XY;
}

const DragedPlaylist = styled.div.attrs<DragedPlaylistProps>(
  ({ $hide, position }) => ({
    style: {
      top: `${position.y}px`,
      left: `${position.x}px`,
      display: $hide ? "none" : "block",
    },
  })
)`
  position: absolute;
  z-index: 2;
`;

export default Playlists;
export type { XY };
