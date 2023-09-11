import { Fragment, useCallback, useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components/macro";

import { T7Light } from "@components/Typography";
import PlayerScroll from "@components/globals/Scroll/PlayerScroll";
import MusicController from "@components/globals/musicControllers/MusicController";

import VirtualItem from "@layouts/VirtualItem";

import colors from "@constants/colors";

import { useInterval } from "@hooks/interval";
import { useControlState, usePlayingInfoState } from "@hooks/player";
import { useSelectSongs } from "@hooks/selectSongs";
import useVirtualizer from "@hooks/virtualizer";

import { ControllerFeature } from "@templates/musicController";
import { Song } from "@templates/song";

import { addAlpha } from "@utils/utils";

interface PlaylistProps {}

const Playlist = ({}: PlaylistProps) => {
  const [, setControl] = useControlState();
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();

  const {
    selected,
    setSelected,
    selectCallback,
    selectManyCallback,
    selectedIncludes,
  } = useSelectSongs(playingInfo.playlist);

  const [selectedVisual, setSelectedVisual] = useState<Song[]>([]);

  const [mouseUp, setMouseUp] = useState(false);

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const [scrollState, setScrollState] = useState({
    isScrollEnabled: false,
    isScrolling: false,
  });

  const [targetIndex, setTargetIndex] = useState(0);

  const [scrollbar, setScrollbar] = useState<HTMLElement | null>(null);
  const [mouseY, setMouseY] = useState(0);

  const [lastSelected, setLastSelected] = useState<number | null>(null);

  const [clickTimer, setClickTimer] = useState<NodeJS.Timeout | null>(null);

  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(
    playingInfo.playlist,
    { size: 24 }
  );

  const updateSelectedVisual = useCallback(() => {
    setSelectedVisual(selected);
  }, [selected]);

  function onScroll() {
    if (!scrollState.isScrollEnabled) {
      setScrollState({ ...scrollState, isScrollEnabled: true });
    }
  }

  function onSongSelected(index: number, multiSelect: boolean) {
    setSelectedVisual([...selectedVisual, playingInfo.playlist[index]]);

    if (clickTimer) {
      clearTimeout(clickTimer);
    }

    setClickTimer(
      setTimeout(() => {
        if (
          multiSelect &&
          lastSelected !== null &&
          lastSelected !== index &&
          selectedIncludes(playingInfo.playlist[lastSelected])
        ) {
          const start = Math.min(index, lastSelected);
          const end = Math.max(index, lastSelected) + 1;

          selectManyCallback([...playingInfo.playlist].slice(start, end));
        } else {
          selectCallback(playingInfo.playlist[index]);
          setLastSelected(index);
        }
      }, 250)
    );
  }

  function onSongDoubleClicked(index: number) {
    if (clickTimer) {
      updateSelectedVisual();
      clearTimeout(clickTimer);
    }

    setPlayingInfo({ ...playingInfo, current: index });
    setControl((prev) => ({
      ...prev,
      isPlaying: true,
    }));

    if (lastSelected === index) {
      selectCallback(playingInfo.playlist[index]);
    }
  }

  const getCursorIndex = useCallback(() => {
    const rect = scrollbar?.getBoundingClientRect();
    if (!scrollbar || !rect) return 0;

    const y =
      Math.max(rect.top, Math.min(rect.bottom, mouseY)) +
      (scrollbar.scrollTop ?? 0) -
      rect.top;

    return Math.max(
      0,
      Math.min(playingInfo.playlist.length, Math.round(y / 24))
    );
  }, [mouseY, playingInfo, scrollbar]);

  const updatePlaylist = useCallback(() => {
    const target = playingInfo.playlist[targetIndex];

    const cursorIndex = getCursorIndex();

    if (targetIndex === cursorIndex || targetIndex + 1 === cursorIndex) return;

    console.log(targetIndex, cursorIndex);

    const newPlaylist = [...playingInfo.playlist];

    newPlaylist.splice(targetIndex, 1);
    newPlaylist.splice(
      targetIndex < cursorIndex ? cursorIndex - 1 : cursorIndex,
      0,
      target
    );

    setPlayingInfo((prev) => ({
      ...prev,
      playlist: newPlaylist,
      current: newPlaylist.findIndex(
        (song) =>
          song.songId === playingInfo.playlist[playingInfo.current].songId
      ),
    }));
    setLastSelected(null);
    setSelected([]);
  }, [playingInfo, setPlayingInfo, targetIndex, getCursorIndex, setSelected]);

  const deleteSongs = useCallback(
    (newSongs: Song[]) => {
      const newCurrent = newSongs.findIndex(
        (s) => s.songId === playingInfo.playlist[playingInfo.current].songId
      );

      setPlayingInfo((prev) => ({
        ...prev,
        playlist: newSongs,
        current: Math.max(0, newCurrent),
      }));
    },
    [playingInfo, setPlayingInfo]
  );

  function handleMouseDown(index: number) {
    setIsMouseDown(true);
    setTargetIndex(index);
  }

  function handleMouseUp() {
    setIsMouseDown(false);
    setMouseUp(true);
  }

  const processMouseUp = useCallback(() => {
    if (isMoving && !scrollState.isScrollEnabled) {
      updatePlaylist();
    }

    setIsMoving(false);
  }, [isMoving, scrollState, updatePlaylist]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseDown) {
        setMouseY(e.clientY);

        if (!isMoving) {
          setIsMoving(true);
        }

        if (!scrollState.isScrolling && scrollState.isScrollEnabled) {
          setScrollState({ ...scrollState, isScrollEnabled: false });
        }
      }
    },
    [isMouseDown, isMoving, scrollState]
  );

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useEffect(() => {
    if (mouseUp) {
      setMouseUp(false);

      setTimeout(() => {
        processMouseUp();
      }, 10);
    }
  }, [mouseUp, processMouseUp]);

  useEffect(() => {
    if (!viewportRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (!viewportRef.current || lastSelected === null) return;

      if (!selected.length) {
        return;
      }

      if (lastSelected >= playingInfo.playlist.length - 3) {
        viewportRef.current.scrollTo({
          top:
            viewportRef.current.scrollHeight - viewportRef.current.clientHeight,
        });
      }
    });
    resizeObserver.observe(viewportRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [playingInfo, selected, getTotalSize, lastSelected, viewportRef]);

  useEffect(() => {
    updateSelectedVisual();
  }, [selected, updateSelectedVisual]);

  useInterval(() => {
    if (!isMoving) return;

    const rect = scrollbar?.getBoundingClientRect();
    if (!scrollbar || !rect) return;

    const range = 25;
    const scale = 0.5;

    const topOffset = mouseY - rect.top;
    const bottomOffset = rect.bottom - mouseY;
    const scrollOffset = scrollbar.scrollTop;
    const maxScroll = scrollbar.scrollHeight - scrollbar.clientHeight;

    let scroll = 0;

    if (bottomOffset < range && scrollOffset < maxScroll) {
      scroll = Math.abs(bottomOffset - range) * scale;
    } else if (topOffset < range && scrollOffset !== 0) {
      scroll = (topOffset - range) * scale;
    }

    if (scroll === 0) {
      setScrollState({ isScrollEnabled: false, isScrolling: false });

      return;
    }

    scrollbar.scrollTo({
      top: scrollOffset + scroll,
    });

    setScrollState({ isScrollEnabled: true, isScrolling: true });
  }, 24);

  return (
    <Container>
      <PlayerScroll
        initialize={setScrollbar}
        scroll={onScroll}
        ref={viewportRef}
      >
        <Wrapper $appBarEnable={selected.length > 0}>
          <PlaylistContainer height={getTotalSize()}>
            {virtualMap((virtualItem, item) => (
              <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
                <Fragment>
                  {isMoving &&
                    !scrollState.isScrollEnabled &&
                    virtualItem.index === getCursorIndex() && (
                      <MovementCursor />
                    )}
                  <SongContainer
                    $playing={
                      item.songId ===
                      playingInfo.playlist[playingInfo.current].songId
                    }
                    $selected={selectedVisual.some(
                      (s) => s.songId === item.songId
                    )}
                    $ismoving={isMoving}
                    $istarget={isMoving && targetIndex === virtualItem.index}
                    onClick={(e) =>
                      onSongSelected(virtualItem.index, e.shiftKey)
                    }
                    onDoubleClick={() => onSongDoubleClicked(virtualItem.index)}
                    onMouseDown={() => handleMouseDown(virtualItem.index)}
                  >
                    <TitleText>{item.title}</TitleText>
                    <ArtistText>{item.artist}</ArtistText>
                  </SongContainer>
                </Fragment>
              </VirtualItem>
            ))}
          </PlaylistContainer>
          {isMoving &&
            !scrollState.isScrollEnabled &&
            getCursorIndex() === playingInfo.playlist.length && (
              <MovementCursor />
            )}
        </Wrapper>
      </PlayerScroll>

      <MusicController
        songs={playingInfo.playlist}
        selectedSongs={selected}
        dispatchSelectedSongs={selectManyCallback}
        player={true}
        onDelete={deleteSongs}
        features={[ControllerFeature.selectAll, ControllerFeature.addMusic]}
      />
    </Container>
  );
};

const Popup = keyframes`
  0% {
    height: calc(100vh - 410px);
  }

  100% {
    height: calc(100vh - 410px - 65px);
  }
`;

const Popdown = keyframes`
  0% {
    height: calc(100vh - 410px - 65px);
  }

  100% {
    height: calc(100vh - 410px);
  }
`;

const Container = styled.div`
  padding: 16px 0;
`;

const Wrapper = styled.div<{ $appBarEnable: boolean }>`
  animation: ${({ $appBarEnable }) => ($appBarEnable ? Popup : Popdown)} 0.15s
    ease-out forwards;
`;

const PlaylistContainer = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
`;

const SongContainer = styled.div<{
  $playing: boolean;
  $selected: boolean;
  $ismoving: boolean;
  $istarget: boolean;
}>`
  width: 100%;
  height: 24px;

  padding-left: 16px;

  display: flex;
  align-items: center;

  cursor: pointer;
  color: ${({ $playing }) => ($playing ? colors.point : colors.gray500)};

  ${({ $selected, $istarget }) =>
    ($selected || $istarget) &&
    css`
      background-color: ${colors.gray700} !important;
    `}

  ${({ $ismoving }) =>
    !$ismoving &&
    css`
      &:hover {
        background-color: ${addAlpha(colors.gray700, 0.5)};
      }
    `}
`;

const TitleText = styled(T7Light)`
  width: 170px;
  margin-right: 6px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const ArtistText = styled(T7Light)`
  width: 82px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const MovementCursor = styled.div`
  width: 268px;
  height: 1px;

  margin-bottom: -1px;
  margin-left: 11px;

  position: relative;

  background-color: ${colors.gray500};
`;

export default Playlist;
