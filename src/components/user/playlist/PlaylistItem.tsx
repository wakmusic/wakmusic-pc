import { dragAndDropState, myListState } from "@state/user/atoms";
import { myListItem } from "@templates/playlist";
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

import { ReactComponent as DragPlaylist } from "@assets/icons/ic_24_move.svg";
import { ReactComponent as PlayAll } from "@assets/icons/ic_24_play_all.svg";

import { T6Medium, T7Light } from "@components/Typography";

import colors from "@constants/colors";

import { XY } from "@pages/user/Playlists";

interface PlaylistItemProps {
  item: myListItem;
  hide?: boolean;
  mouseDown?: boolean;
  onSelect?: (target: myListItem, position: XY) => void;
  onMouseEnter?: () => void;
}

const PlaylistItem = ({
  item,
  hide = false,
  mouseDown = false,
  onSelect,
  onMouseEnter,
}: PlaylistItemProps) => {
  const isEditMode = useRecoilValue(myListState);
  const dragAndDropTarget = useRecoilValue(dragAndDropState);

  const marginLeft = useMemo(() => {
    if (!mouseDown) return 0;

    const dropTargetRow = dragAndDropTarget.drop % 3;

    if (
      item.index === dragAndDropTarget.drop &&
      dropTargetRow === 0 &&
      dragAndDropTarget.drag.index > dragAndDropTarget.drop
    ) {
      return 238;
    }

    if (dragAndDropTarget.drop !== item.index - 1) return 0;

    if (dragAndDropTarget.drag.index > dragAndDropTarget.drop) {
      if (
        dropTargetRow === 0 &&
        dragAndDropTarget.drag.index - dragAndDropTarget.drop < 3 &&
        dragAndDropTarget.drag.index % 3 !== 2
      )
        return 238;
      else return 0;
    } else if (dragAndDropTarget.drag.index < dragAndDropTarget.drop) {
      if (dropTargetRow === 2) return 0;
      else return 238;
    } else if (dragAndDropTarget.drag.index === dragAndDropTarget.drop) {
      if (dropTargetRow === 0) return 238;
      else return 0;
    }
  }, [
    mouseDown,
    dragAndDropTarget.drop,
    dragAndDropTarget.drag.index,
    item.index,
  ]);

  const marginRight = useMemo(() => {
    if (!mouseDown) return 0;

    const dropTargetRow = dragAndDropTarget.drop % 3;

    if (
      dragAndDropTarget.drop === item.index &&
      dragAndDropTarget.drag.index < dragAndDropTarget.drop &&
      dropTargetRow === 2
    ) {
      return 238;
    }

    if (dragAndDropTarget.drop !== item.index + 1) return 0;

    if (dragAndDropTarget.drag.index >= dragAndDropTarget.drop) {
      if (dropTargetRow === 0) return 0;
      else return 238;
    } else if (dragAndDropTarget.drag.index < dragAndDropTarget.drop) {
      return 0;
    }
  }, [
    mouseDown,
    dragAndDropTarget.drop,
    dragAndDropTarget.drag.index,
    item.index,
  ]);

  return (
    <Container
      style={{
        display: hide ? "none" : "flex",
        marginLeft: `${marginLeft}px`,
        marginRight: `${marginRight}px`,
      }}
      onMouseEnter={onMouseEnter}
    >
      <ShiftContainer>
        <Icon
          src={`https://static.wakmusic.xyz/static/playlist/${item.image.version}.png`}
        />
        <InfoContainer>
          <Title>{item.title}</Title>
          <Volume>{item.songs.length}곡</Volume>
          {isEditMode ? (
            <DragPlaylist
              onMouseDown={(e) => {
                if (onSelect && isEditMode)
                  onSelect(item, { x: e.clientX, y: e.clientY });
              }}
            ></DragPlaylist>
          ) : (
            <PlayAll></PlayAll>
          )}
        </InfoContainer>
      </ShiftContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 222px;
  height: 74px;
`;

const ShiftContainer = styled.div`
  display: flex;
  align-items: center;
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
