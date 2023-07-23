import { dragAndDropState, myListState } from "@state/user/atoms";
import { Playlist, myListItem } from "@templates/playlist";
import { useCallback, useEffect, useReducer, useState } from "react";
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

enum ShuffleActionType {
  relocation,
  insert,
  delete,
}

interface ShuffleAction {
  type: ShuffleActionType;
  target: number;
}

interface PlaylistsProps {}

const shuffleMyList = (state: Playlist[], action: ShuffleAction) => {
  const newList = state.slice();

  switch (action.type) {
    case ShuffleActionType.relocation:
      break;
    case ShuffleActionType.insert:
      // 재생목록 추가
      break;
    case ShuffleActionType.delete:
      // 삭제
      break;
  }

  return newList;
};

const getPlaylistInitialPosition = (targetIndex: number): XY => {
  return { x: (targetIndex % 3) * 238, y: Math.floor(targetIndex / 3) * 90 };
};

const Playlists = ({}: PlaylistsProps) => {
  const [isEditMode] = useRecoilState(myListState);
  const [shuffledList, dispatchMyList] = useReducer(shuffleMyList, myList);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownPosition, setmouseDownPosition] = useState<XY>({
    x: 0,
    y: 0,
  });
  const [dragAndDropTarget, setDragAndDropTarget] =
    useRecoilState(dragAndDropState);
  const [playlistInitialPosition, setPlayListInitialPosition] = useState<XY>({
    x: 0,
    y: 0,
  });
  const [dragPosition, setDragPostion] = useState<XY>({ x: 0, y: 0 });

  useEffect(() => {
    let dropTarget =
      Math.floor((dragPosition.x + 94) / 238) +
      Math.floor((dragPosition.y + 58) / 90) * 3;

    if (dropTarget < 0) dropTarget = 0;
    else if (dropTarget > shuffledList.length)
      dropTarget = shuffledList.length - 1;

    if (dropTarget === dragAndDropTarget.drop) return;

    setDragAndDropTarget({
      ...dragAndDropTarget,
      drop: dropTarget,
    });
  }, [
    dragPosition,
    dragAndDropTarget,
    setDragAndDropTarget,
    shuffledList.length,
  ]);

  const initializeDragTarget = (target: myListItem, position: XY) => {
    setMouseDown(true);

    setDragAndDropTarget({
      drag: target,
      drop: target.index,
    });
    const initialPosition = getPlaylistInitialPosition(target.index); // 선택된 플레이리스트의 초기 위치
    setDragPostion(initialPosition); // 드래그된 플레이리스트의 위치를 선택된 플레이리스트의 초기 위치로 설정
    setPlayListInitialPosition(initialPosition); // 선택된 플레이리스트의 초기 위치 저장

    setmouseDownPosition(position); // 마우스가 움직인 거리를 구하기 위해 마우스가 클릭된 위치 저장
  };

  const movePlayList = useCallback(
    (event: React.MouseEvent) => {
      const movementX = event.clientX - mouseDownPosition.x; // 마우스가 움직인 거리 = 현재 마우스의 위치 - 마우스가 클릭된 위치
      const movementY = event.clientY - mouseDownPosition.y;

      setDragPostion({
        x: playlistInitialPosition.x + movementX, // 마우스가 움직인 만큼 초기위치에서 옮겨줍니다
        y: playlistInitialPosition.y + movementY,
      });
    },
    [mouseDownPosition, setDragPostion, playlistInitialPosition]
  );

  return (
    <Container>
      <Menu />
      <PlayLists
        onMouseMove={mouseDown && isEditMode ? movePlayList : undefined}
        onMouseUp={() => {
          setMouseDown(false);
        }}
        onMouseLeave={() => {
          setMouseDown(false);
        }}
      >
        {!isEditMode
          ? myList.map((item, index) => (
              <PlaylistItem
                key={index}
                item={{
                  ...item,
                  index: index,
                }}
              />
            ))
          : shuffledList.map((item, index) => (
              <PlaylistItem
                key={index}
                item={{
                  ...item,
                  index: index,
                }}
                hide={index === dragAndDropTarget.drag.index && mouseDown}
                mouseDown={mouseDown}
                onSelect={initializeDragTarget}
              />
            ))}
        <DragedPlaylist
          style={{
            top: `${dragPosition.y}px`,
            left: `${dragPosition.x}px`,
            display: mouseDown ? "block" : "none",
          }}
        >
          <PlaylistItem item={dragAndDropTarget.drag} />
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
  gap: 16px;

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

const DragedPlaylist = styled.div`
  position: absolute;
  z-index: 2;
`;

export default Playlists;
export type { XY };
