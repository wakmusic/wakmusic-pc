import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";

import PageItemContainer from "@layouts/PageItemContainer";

import { useInterval } from "@hooks/interval";
import { useControlState, usePlayingInfoState } from "@hooks/player";

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

  dispatchSongs?: (songs: Song[]) => void;

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

  const songsContainer = useRef<HTMLDivElement>(null);

  const getSongItemY = (index: number) => {
    if (isNull(songsContainer.current)) {
      return -100;
    }

    const scrolled = songsContainer.current.scrollTop;

    return (index - Math.floor(scrolled / 64)) * 64 - (scrolled % 64);
  };

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

                dispatchSongs && dispatchSongs(newSongs);
              }}
              key={key}
            />
          );
      }
    },
    [addSongs, children, selectedSongs, dispatchSongs]
  );

  const moveDragedSong = useCallback(
    (e: React.MouseEvent) => {
      const songsDOM = songsContainer.current;

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
    [dragStart, dragTarget]
  );

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

        if (dropTarget === -1) return;

        const newSongs = children.slice();

        newSongs.splice(dragTarget.index, 1);
        newSongs.splice(dropTarget, 0, dragTarget.song);

        dispatchSongs && dispatchSongs(newSongs);

        setDropTarget(-1);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    editMode,
    isMouseDown,
    children,
    dragTarget.index,
    dragTarget.song,
    dropTarget,
    dispatchSongs,
  ]);

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
    // 드롭 위치 계산
    const songsDOM = songsContainer.current;
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
    const songsDOM = songsContainer.current;
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
      <PageItemContainer height={height} ref={songsContainer}>
        <FixedBox height={children.length * 64}>
          {children.map((item, index) => {
            if (dragTarget.index === index && isMouseDown) return;

            const margin = { paddingTop: "", paddingBottom: "" };
            const songHeight = "64px";

            if (isMouseDown) {
              if (dropTarget === 0 && index === 0) {
                margin.paddingTop = songHeight;
              } else if (
                dropTarget === children.length - 1 &&
                index === children.length - 1
              ) {
                margin.paddingBottom = songHeight;
              } else if (
                dropTarget === children.length - 1 &&
                dragTarget.index === children.length - 1 &&
                index === children.length - 2
              ) {
                margin.paddingBottom = songHeight;
              } else if (dragTarget.index <= dropTarget) {
                if (index - 1 === dropTarget) {
                  margin.paddingTop = songHeight;
                }
              } else if (dragTarget.index > dropTarget) {
                if (index === dropTarget && dropTarget !== 0) {
                  margin.paddingTop = songHeight;
                }
              }
            }

            return (
              <SongMargin key={index} style={margin} $transition={animateDrag}>
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
                  }}
                />
              </SongMargin>
            );
          })}
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

const SongMargin = styled.div<{ $transition: boolean }>`
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
