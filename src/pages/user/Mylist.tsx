import { useCallback, useEffect, useReducer, useState } from "react";
import styled from "styled-components/macro";

import { ReactComponent as Create } from "@assets/icons/ic_24_playadd_600.svg";
import { ReactComponent as Import } from "@assets/icons/ic_24_share.svg";

import IconButton from "@components/globals/IconButton";
import MylistItem from "@components/user/mylist/MylistItem";

import PageItemContainer from "@layouts/PageItemContainer";

import colors from "@constants/colors";
import { myList } from "@constants/dummys";

import { useCreateListModal } from "@hooks/createListModal";
import { useLoadListModal } from "@hooks/loadListModal";
import { useDragAndDropState, useMylistState } from "@hooks/mylist";

import { PlaylistType, myListItemType } from "@templates/playlist";

import { isUndefined } from "@utils/isTypes";

interface XY {
  x: number;
  y: number;
}

enum ShuffleActionType {
  relocate,
  insert,
  delete,
}

interface ShuffleAction {
  type: ShuffleActionType;
  target: number;
  to?: number;
}

interface MylistProps {}

const shuffleMyList = (state: PlaylistType[], action: ShuffleAction) => {
  const newList = state.slice();

  switch (action.type) {
    case ShuffleActionType.relocate:
      if (isUndefined(action.to)) break;

      newList.splice(action.target, 1);
      newList.splice(action.to, 0, state[action.target]);
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
  return {
    x: (targetIndex % 3) * 238 - 9,
    y: Math.floor(targetIndex / 3) * 90 - 9,
  };
};

const Mylist = ({}: MylistProps) => {
  const [isEditMode] = useMylistState();
  const [shuffledList, dispatchMyList] = useReducer(shuffleMyList, []);
  const [mouseDown, setMouseDown] = useState(false);
  const [mouseDownPosition, setmouseDownPosition] = useState<XY>({
    x: 0,
    y: 0,
  });
  const [dragAndDropTarget, setDragAndDropTarget] = useDragAndDropState();
  const [playlistInitialPosition, setPlayListInitialPosition] = useState<XY>({
    x: 0,
    y: 0,
  });
  const [dragPosition, setDragPostion] = useState<XY>({ x: 0, y: 0 });

  const createListModal = useCreateListModal();
  const loadListModal = useLoadListModal();

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

  const initializeDragTarget = (target: myListItemType, position: XY) => {
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
        x: playlistInitialPosition.x + movementX,
        y: playlistInitialPosition.y + movementY,
      });
    },
    [mouseDownPosition, setDragPostion, playlistInitialPosition]
  );

  return (
    <Container>
      <Menu>
        <IconButton icon={Create} onClick={createListModal}>
          리스트 만들기
        </IconButton>
        <IconButton icon={Import} onClick={loadListModal}>
          리스트 가져오기
        </IconButton>
      </Menu>

      <PageItemContainer height={206}>
        <PlayLists
          onMouseMove={mouseDown && isEditMode ? movePlayList : undefined}
          onMouseUp={() => {
            setMouseDown(false);
            if (!mouseDown) return;

            dispatchMyList({
              type: ShuffleActionType.relocate,
              target: dragAndDropTarget.drag.index,
              to: dragAndDropTarget.drop,
            });
            // API에 내 리스트 수정 요청 보내기
          }}
          onMouseLeave={() => {
            setMouseDown(false);
          }}
        >
          {!isEditMode
            ? myList.map((item, index) => (
                <MylistItem
                  key={index}
                  item={{
                    ...item,
                    index: index,
                  }}
                />
              ))
            : shuffledList.map((item, index) => (
                <MylistItem
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
            <MylistItem item={dragAndDropTarget.drag} />
          </DragedPlaylist>
        </PlayLists>
      </PageItemContainer>
    </Container>
  );
};

const Container = styled.div`
  margin: 16px 0px 0px 20px;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  margin-bottom: 16px;
`;

const PlayLists = styled.div`
  position: relative;
  z-index: 1;

  display: flex;
  flex-flow: wrap;
  align-content: flex-start;
  gap: 16px;

  /* width: 100%; */

  padding-right: 2px;
`;

const DragedPlaylist = styled.div`
  position: absolute;
  z-index: 2;

  background-color: ${colors.whiteAlpha40};

  padding: 8px;
  border-radius: 6px;

  border: 1px solid ${colors.blueGray25};
  border-radius: 16px;
`;

export default Mylist;
export type { XY };
