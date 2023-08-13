import { VirtualItem as VirtualItemType } from "@tanstack/react-virtual";
import { useCallback, useEffect, useReducer, useState } from "react";
import styled, { css } from "styled-components/macro";

import PageItemContainer from "@layouts/PageItemContainer";
import VirtualItem from "@layouts/VirtualItem";

import { useInterval } from "@hooks/interval";
import { useControlState, usePlayingInfoState } from "@hooks/player";
import useVirtualizer from "@hooks/virtualizer";

import { ControllerFeature } from "@templates/musicController";
import { Song } from "@templates/song";

import getChartData from "@utils/getChartData";
import { isNull } from "@utils/isTypes";

import SongItem, { SongItemFeature } from "./SongItem";
import AddMusic from "./musicControllers/AddMusic";
import AddPlaylist from "./musicControllers/AddPlaylist";
import DeleteMusic from "./musicControllers/DeleteMusic";
import PlayMusic from "./musicControllers/PlayMusic";
import SelectAll from "./musicControllers/SelectAll";
import MusicControllerBar from "./musicControllers/musicControllerContainers/MusicControllerBar";

interface SongsProps {
  height: number;

  songFeatures?: SongItemFeature[];
  controllerFeatures: ControllerFeature[];

  showController?: boolean;
  editMode?: boolean;

  dispatchSongs?: (newSongs: Song[], action: ControllerFeature) => void;

  children: Song[];
}

interface DragTarget {
  song: Song;
  index: number;
  position: number;
  offset: number;
}

interface DragStart {
  absolute: number; // 화면상에서 처음 클릭이 일어난 위치, 스크롤 영향 안받음
  relative: number; // PageItemContainer을 기준으로 한 위치
  fixed: number; // 화면상에서 처음 클릭이 일어난 위치, 스크롤 영향 받음
}

const selectSongs = (state: Song[], action: Song | Song[]) => {
  if (Array.isArray(action)) {
    if (state === action) {
      return [];
    }

    return action;
  }

  const newState = state.slice();

  if (newState.includes(action)) {
    newState.splice(newState.indexOf(action), 1);
  } else {
    newState.push(action);
  }

  return newState;
};

const Songs = ({
  height,
  songFeatures,
  controllerFeatures,
  showController = true,
  editMode = false,
  dispatchSongs,
  children,
}: SongsProps) => {
  const [showControllerState, setShowControllerState] =
    useState(showController);
  const [songs, setSongs] = useState(children);
  const [selectedSongs, dispatchSelectedSongs] = useReducer(selectSongs, []);
  const [popdown, setPopdown] = useState(false);

  const [dragTarget, setDragTarget] = useState<DragTarget>({
    index: -1,
    song: children[0],
    position: 0,
    offset: 0,
  });
  const [dragStart, setDragStart] = useState<DragStart>({
    absolute: 0,
    relative: 0,
    fixed: 0,
  });
  const [dropTarget, setDropTarget] = useState(-1);

  const [animateDrag, setAnimateDrag] = useState(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [mouseY, setMouseY] = useState(0);

  const [, setPlayingInfo] = usePlayingInfoState();
  const [, setControlState] = useControlState();

  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(songs);

  const getSongItemY = useCallback(
    (index: number) => {
      if (isNull(viewportRef.current)) {
        return -100;
      }

      const scrolled = viewportRef.current.scrollTop;

      return (index - Math.floor(scrolled / 64)) * 64 - (scrolled % 64);
    },
    [viewportRef]
  );

  const addSongs = useCallback(
    (list: Song[], play?: boolean) => {
      // 재생목록에 노래 추가
      setPlayingInfo((prev) => ({
        playlist: [
          ...prev.playlist,
          ...list.map((item) => ({
            ...item,
            views: getChartData(item).views,
          })),
        ],
        history: [],
        current: play ? prev.playlist.length : prev.current,
      }));

      if (!play) return;
      setControlState((prev) => ({
        ...prev,
        isPlaying: true,
      }));
    },
    [setControlState, setPlayingInfo]
  );

  const getControllerComponent = useCallback(
    (feature: ControllerFeature, key: number) => {
      switch (feature) {
        case ControllerFeature.selectAll:
          return (
            <SelectAll
              isSelect={false}
              onClick={() => {
                dispatchSelectedSongs(children);
              }}
              key={key}
            />
          );
        case ControllerFeature.addMusic:
          // 플레이리스트에 노래 추가
          return <AddMusic key={key} />;
        case ControllerFeature.addToList:
          return (
            <AddPlaylist
              onClick={() => {
                addSongs(selectedSongs);
                dispatchSelectedSongs([]);
              }}
              key={key}
            />
          );
        case ControllerFeature.play:
          return (
            <PlayMusic
              onClick={() => {
                addSongs(selectedSongs, true);
                dispatchSelectedSongs([]);
              }}
              key={key}
            />
          );
        case ControllerFeature.delete:
          return (
            <DeleteMusic
              onClick={() => {
                const newSongs = children.slice();

                selectedSongs.forEach((item) => {
                  newSongs.splice(newSongs.indexOf(item), 1);
                });
                dispatchSelectedSongs([]);

                dispatchSongs &&
                  dispatchSongs(newSongs, ControllerFeature.delete);
              }}
            />
          );
      }
    },
    [addSongs, children, selectedSongs, dispatchSongs]
  );

  const mapSongComponent = useCallback(
    (virtualItem: VirtualItemType, item: Song) => {
      const index = songs.indexOf(item);

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
              editMode={editMode}
              selected={selectedSongs.includes(item)}
              features={songFeatures}
              onClick={(song) => {
                dispatchSelectedSongs(song);
              }}
              onEdit={(e) => {
                setIsMouseDown(true);

                const position = getSongItemY(index);
                setDragTarget({
                  index: index,
                  song: item,
                  position: position,
                  offset: e.nativeEvent.offsetY,
                });
                setDragStart({
                  relative: position,
                  absolute: e.clientY,
                  fixed: e.clientY,
                });
                setDropTarget(index);

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
      getSongItemY,
      isMouseDown,
      selectedSongs,
      songFeatures,
    ]
  );

  const moveDragedSong = useCallback(
    (e: React.MouseEvent) => {
      const songsDOM = viewportRef.current;

      if (!songsDOM) return;
      document.body.style.cursor = "pointer";

      let newPosition = dragStart.relative + (e.clientY - dragStart.absolute);
      const songsPosition = songsDOM.getBoundingClientRect();

      if (newPosition < 0) {
        newPosition = 0;
      } else if (newPosition + 64 > songsPosition.height) {
        newPosition = songsPosition.height - 64;
      }

      if (newPosition !== dragTarget.position) {
        setDragTarget({
          ...dragTarget,
          position: newPosition,
        });
      }
    },
    [viewportRef, dragStart, dragTarget]
  );

  useEffect(() => {
    // 컨트롤러 에니미에션 토글
    if ((selectedSongs.length === 0 && !showController) || isMouseDown) {
      setPopdown(true);
      return;
    }

    if (selectedSongs.length > 0 || (showController && !isMouseDown)) {
      setPopdown(false);
      setShowControllerState(true);
    }
  }, [
    showControllerState,
    setPopdown,
    showController,
    selectedSongs,
    isMouseDown,
  ]);

  useEffect(() => {
    // mouse 이벤트 핸들러 등록
    if (!editMode) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };

    const handleMouseUp = () => {
      if (isMouseDown) {
        document.body.style.cursor = "default";
        setIsMouseDown(false);
        setAnimateDrag(false);

        if (dropTarget === -1 || !dispatchSongs) return;

        const newSongs = songs.slice();

        if (dropTarget === songs.length) {
          newSongs.push(dragTarget.song);
        } else {
          newSongs.splice(dropTarget, 0, dragTarget.song);
        }

        setSongs(newSongs);
        setDropTarget(-1);

        if (newSongs !== children) {
          dispatchSongs(newSongs, ControllerFeature.edit);
        }
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
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
    dispatchSongs,
  ]);

  useEffect(() => {
    // 드롭 위치 계산
    const songsDOM = viewportRef.current;
    if (dragTarget.index === -1 || !songsDOM || !isMouseDown) return;

    let newDropTarget = dropTarget;

    const songsPosition = songsDOM.getBoundingClientRect();
    const maxScroll = children.length * 64 - songsPosition.height;

    const dragedDistance = mouseY - dragStart.fixed;

    if (songsDOM.scrollTop === 0 && mouseY < songsPosition.top) {
      newDropTarget = 0;
    } else if (
      songsDOM.scrollTop === maxScroll &&
      mouseY > songsPosition.bottom
    ) {
      newDropTarget = children.length - 1;
    } else if (dragedDistance > 0) {
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
    dragStart.fixed,
    dropTarget,
    animateDrag,
  ]);

  useInterval(() => {
    // 자동 스크롤
    const songsDOM = viewportRef.current;
    if (!songsDOM || !isMouseDown || !editMode) return;

    const songsPosition = songsDOM.getBoundingClientRect();
    const maxScroll = children.length * 64 - songsPosition.height;
    const scale = 0.8;

    let scroll = 0;

    if (songsPosition.top > mouseY && songsDOM.scrollTop !== 0) {
      let topOffset = mouseY - songsPosition.top;

      // 버그를 막기 위한 발악
      if (topOffset < -35) {
        topOffset = -35;
      }

      scroll = topOffset * scale;
    } else if (
      songsPosition.bottom < mouseY &&
      songsDOM.scrollTop < maxScroll
    ) {
      let bottomOffset = Math.abs(songsPosition.bottom - mouseY);

      if (bottomOffset > 35) {
        bottomOffset = 35;
      }

      scroll = bottomOffset * scale;
    }

    scroll = Math.floor(scroll);
    if (scroll === 0) return;

    songsDOM.scrollTo({
      top: songsDOM.scrollTop + scroll,
    });

    setDragStart({
      ...dragStart,
      fixed: dragStart.fixed + scroll * -1,
    });
  }, 24);

  return (
    <Container
      onMouseMove={(e) => {
        if (!isMouseDown || !editMode) return;
        moveDragedSong(e);
      }}
    >
      <PageItemContainer
        height={height}
        ref={viewportRef}
        totalSize={getTotalSize()}
      >
        <FixedBox height={children.length * 64}>
          {virtualMap(mapSongComponent)}
        </FixedBox>
      </PageItemContainer>

      <Controller $display={showControllerState}>
        <MusicControllerBar
          count={
            selectedSongs.length <= 1 && !showController
              ? 1
              : selectedSongs.length
          }
          popdown={popdown}
        >
          {controllerFeatures.map((item, index) =>
            getControllerComponent(item, index)
          )}
          {editMode && getControllerComponent(ControllerFeature.delete, -1)}
        </MusicControllerBar>
      </Controller>

      <PseuduSongItem
        style={{
          display: isMouseDown && editMode ? "block" : "none",
          top: dragTarget.position,
        }}
      >
        <SongItem
          song={dragTarget.song}
          features={songFeatures}
          editMode={true}
          selected={selectedSongs.includes(dragTarget.song)}
        />
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
      transition: padding 0.1s linear 0s;
    `}
`;

const Controller = styled.div<{ $display: boolean }>`
  display: ${({ $display }) => ($display ? "block" : "none")};
`;

export default Songs;
