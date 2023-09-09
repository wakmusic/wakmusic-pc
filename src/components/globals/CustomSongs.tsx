import { VirtualItem as VirtualItemType } from "@tanstack/react-virtual";
import { useCallback, useEffect, useMemo, useState } from "react";
import styled, { css } from "styled-components/macro";

import PageItemContainer from "@layouts/PageItemContainer";
import VirtualItem from "@layouts/VirtualItem";

import { useInterval } from "@hooks/interval";
import useVirtualizer from "@hooks/virtualizer";

import { OrderedSongType, Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

import SongItem from "./SongItem";

interface CustomSongsProps {
  height: number;
  editMode?: boolean;
  songFeatures?: SongItemFeature[];

  onSongClick: (song: Song | Song[], index: number) => void;
  selectedIncludes: (song: Song, index: number) => boolean;
  onEdit?: (newSongs: Song[]) => void;

  selectedSongs: OrderedSongType[];
  children: Song[];
}

interface DragTarget {
  song?: Song;
  index: number;
  offset: number;
}

const CustomSongs = ({
  height,
  editMode = false,
  songFeatures,
  onSongClick,
  selectedIncludes,
  onEdit,
  children,
}: CustomSongsProps) => {
  const [songs, setSongs] = useState(children);
  const [defaultSongs, setDefaultSongs] = useState(children);

  const [dragTarget, setDragTarget] = useState<DragTarget>({
    index: -1,
    offset: 0,
  });
  const [dropTarget, setDropTarget] = useState(-1);

  const [animateDrag, setAnimateDrag] = useState(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseY, setMouseY] = useState(0);

  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(songs);

  const dragedPosition = useMemo(() => {
    if (!isMouseDown || !viewportRef.current) return -64;

    const viewportRect = viewportRef.current.getBoundingClientRect();
    const dragPos = mouseY - viewportRect.top - (dragTarget.offset + 20);

    if (dragPos < 0) {
      return 0;
    }

    if (dragPos > viewportRect.height - 64) {
      return viewportRect.height - 64;
    }

    return dragPos;
  }, [mouseY, isMouseDown, dragTarget.offset, viewportRef]);

  const mapSongComponent = useCallback(
    (virtualItem: VirtualItemType, item: Song) => {
      const index = virtualItem.index;

      const margin = { paddingTop: "", paddingBottom: "" };
      const songHeight = "64px";

      if (isMouseDown) {
        if (dropTarget === songs.length + 1 && index === songs.length) {
          margin.paddingBottom = songHeight;
        } else if (dropTarget <= index) {
          margin.paddingTop = songHeight;
        }
      }

      return (
        <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
          <SongPadding style={margin} $transition={animateDrag}>
            <SongItem
              song={item}
              index={index}
              editMode={editMode}
              selected={selectedIncludes(item, index)}
              features={songFeatures}
              onClick={(song) => {
                onSongClick(song, index);
              }}
              onEdit={(e) => {
                setIsMouseDown(true);

                setDragTarget({
                  index: index,
                  song: item,
                  offset: e.nativeEvent.offsetY,
                });
                setDropTarget(index);
                setMouseY(e.clientY);

                const temp = songs.slice();
                temp.splice(index, 1);
                setSongs(temp);
              }}
            />
          </SongPadding>
        </VirtualItem>
      );
    },
    [
      songs,
      animateDrag,
      dropTarget,
      editMode,
      isMouseDown,
      songFeatures,
      onSongClick,
      selectedIncludes,
    ]
  );

  useEffect(() => {
    // children 동기화
    if (
      !(
        children.length === defaultSongs.length &&
        children.every((value, index) => value === defaultSongs[index])
      ) &&
      !isMouseDown
    ) {
      setSongs(children);
      setDefaultSongs(children);
    }
  }, [children, songs, isMouseDown, defaultSongs]);

  useEffect(() => {
    // mousemove 이벤트 핸들러 등록
    if (!isMouseDown) return;
    console.log("HANDLE");

    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDown) {
        setMouseY(e.clientY);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isMouseDown]);

  useEffect(() => {
    // mouseup 이벤트 핸들러 등록
    if (!isMouseDown) return;

    const handleMouseUp = () => {
      if (isMouseDown) {
        document.body.style.cursor = "default";

        if (dropTarget === -1 || !onEdit || !dragTarget.song) return;

        const newSongs = songs.slice();

        if (dropTarget === songs.length) {
          newSongs.push(dragTarget.song);
        } else {
          newSongs.splice(dropTarget, 0, dragTarget.song);
        }

        setSongs(newSongs);
        if (!newSongs.every((value, index) => value === children[index])) {
          onEdit(newSongs);
        }

        setDropTarget(-1);
        setIsMouseDown(false);
        setAnimateDrag(false);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    songs,
    children,
    editMode,
    isMouseDown,
    dragTarget.index,
    dragTarget.song,
    dropTarget,
    onEdit,
  ]);

  useEffect(() => {
    // 드롭 위치 계산
    const viewportDOM = viewportRef.current;
    if (dragTarget.index === -1 || !viewportDOM || !isMouseDown) return;

    const viewportRect = viewportDOM.getBoundingClientRect();

    let newDropTarget = dropTarget;
    let mousePosition = mouseY;

    // 드래하고 있는 마우스의 Y값이 최대, 최소를 벗어나는 경우
    if (mousePosition < viewportRect.top + dragTarget.offset + 20) {
      mousePosition = viewportRect.top + dragTarget.offset + 20;
    } else if (
      mousePosition >
      viewportRect.bottom - (24 - dragTarget.offset) - 20
    ) {
      mousePosition = viewportRect.bottom - (24 - dragTarget.offset) - 20;
    }

    const dragStartPos =
      dragTarget.index * 64 -
      viewportDOM.scrollTop +
      viewportRect.top +
      (20 + dragTarget.offset);
    // (스크롤을 적용한 드래그가 시작된 Y값) = {(인덱스 * 64) - 스크롤된 값} + (윈도우 기준 뷰포트 Y값) + (SongItem 내부에서 클릭이 발생한 위치)

    const dragedDistance = mousePosition - dragStartPos;

    if (dragedDistance > 0) {
      newDropTarget =
        dragTarget.index + Math.floor((dragedDistance - 32) / 64) + 1;
    } else {
      newDropTarget = dragTarget.index + Math.floor((dragedDistance + 32) / 64);
    }

    if (newDropTarget < 0) {
      newDropTarget = 0;
    } else if (newDropTarget > children.length - 1) {
      newDropTarget = children.length - 1;
    }

    if (newDropTarget === dropTarget) return;

    if (dropTarget !== -1 && !animateDrag) {
      // 최초 클릭이 아닌 경우에 애니메이션 재생
      setAnimateDrag(true);
    }

    setDropTarget(newDropTarget);
  }, [
    viewportRef,
    mouseY,
    isMouseDown,
    children.length,
    dragTarget.index,
    dragTarget.offset,
    dropTarget,
    animateDrag,
  ]);

  useInterval(() => {
    // 자동 스크롤
    const viewportDOM = viewportRef.current;
    if (!viewportDOM || !isMouseDown) return;

    const viewportRect = viewportDOM.getBoundingClientRect();
    const maxScroll = children.length * 64 - viewportRect.height;
    const scrollOffset = viewportDOM.scrollTop;
    const scale = 0.8;

    let scroll = 0;

    if (viewportRect.top > mouseY && scrollOffset !== 0) {
      scroll = (mouseY - viewportRect.top) * scale;
    } else if (viewportRect.bottom < mouseY && scrollOffset < maxScroll) {
      scroll = Math.abs(viewportRect.bottom - mouseY) * scale;
    }

    if (scroll === 0) return;

    viewportDOM.scrollTo({
      top: scrollOffset + scroll,
    });
  }, 25);

  return (
    <Container>
      <PageItemContainer
        height={height}
        ref={viewportRef}
        totalSize={getTotalSize()}
      >
        <FixedBox height={children.length * 64}>
          {virtualMap(mapSongComponent)}
        </FixedBox>
      </PageItemContainer>

      <PseuduSongItem
        style={{
          display: isMouseDown && editMode ? "block" : "none",
          top: dragedPosition,
        }}
      >
        {dragTarget.song && (
          <SongItem
            song={dragTarget.song}
            features={songFeatures}
            editMode={true}
            selected={selectedIncludes(dragTarget.song, dragTarget.index)}
          />
        )}
      </PseuduSongItem>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  overflow: hidden;
`;

const FixedBox = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
  width: 100%;
`;

const PseuduSongItem = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
`;

const SongPadding = styled.div<{ $transition: boolean }>`
  ${({ $transition }) =>
    $transition &&
    css`
      transition: padding 0.1s ease-in;
    `}
`;

export default CustomSongs;
