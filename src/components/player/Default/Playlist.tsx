import { Fragment, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components/macro";

import { T7Light } from "@components/Typography";
import PlayerScroll from "@components/globals/Scroll/PlayerScroll";

import VirtualItem from "@layouts/VirtualItem";

import colors from "@constants/colors";

import { useInterval } from "@hooks/interval";
import { usePlayingInfoState } from "@hooks/player";
import useVirtualizer from "@hooks/virtualizer";

import { Song } from "@templates/song";

interface PlaylistProps {}

const Playlist = ({}: PlaylistProps) => {
  const [playingInfo, setPlayingInfo] = usePlayingInfoState();
  const [playlistData, setPlaylisData] = useState<
    (Song & {
      isPlaying: boolean;
      isSelected: boolean;
    })[]
  >([]);

  const [mouseState, setMouseState] = useState({
    isMouseDown: false,
    isMoving: false,
  });

  const [scrollState, setScrollState] = useState({
    isScrollEnabled: false,
    isScrolling: false,
  });

  const [targetIndex, setTargetIndex] = useState(0);

  const [scrollbar, setScrollbar] = useState<HTMLElement | null>(null);
  const [mouseY, setMouseY] = useState(0);

  const [lastSelected, setLastSelected] = useState<number | null>(null);

  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(
    playlistData,
    { size: 24 }
  );

  const createPlaylistData = useCallback(() => {
    return [
      ...playingInfo.playlist.map((song, i) => ({
        ...song,
        isPlaying: i === playingInfo.current,
        isSelected: false,
      })),
    ];
  }, [playingInfo]);

  function onScroll() {
    if (!scrollState.isScrollEnabled) {
      setScrollState({ ...scrollState, isScrollEnabled: true });
    }
  }

  function onSongSelected(index: number, multiSelect: boolean) {
    if (multiSelect && lastSelected !== null && lastSelected !== index) {
      const start = Math.min(index, lastSelected);
      const end = Math.max(index, lastSelected);

      setPlaylisData(
        playlistData.map((song, i) =>
          start <= i && i <= end ? { ...song, isSelected: true } : song
        )
      );
    } else {
      playlistData[index].isSelected = !playlistData[index].isSelected;

      setPlaylisData([...playlistData]);
      setLastSelected(index);
    }
  }

  function onSongDoubleClicked(index: number) {
    setPlayingInfo({ ...playingInfo, current: index });
  }

  const getCursorIndex = useCallback(() => {
    const rect = scrollbar?.getBoundingClientRect();
    if (!scrollbar || !rect) return 0;

    const y =
      Math.max(rect.top, Math.min(rect.bottom, mouseY)) +
      (scrollbar.scrollTop ?? 0) -
      rect.top;

    return Math.max(0, Math.min(playlistData.length, Math.round(y / 24)));
  }, [mouseY, playlistData, scrollbar]);

  const updatePlaylist = useCallback(() => {
    const target = playlistData[targetIndex];

    const cursorIndex = getCursorIndex();

    playlistData.splice(targetIndex, 1);
    playlistData.splice(
      targetIndex < cursorIndex ? cursorIndex - 1 : cursorIndex,
      0,
      target
    );

    setPlayingInfo((prev) => ({
      playlist: playlistData,
      current: playlistData.findIndex((song) => song.isPlaying),
      history: prev.history,
    }));
    setLastSelected(null);
  }, [playlistData, targetIndex, getCursorIndex, setPlayingInfo]);

  const handleMouseDown = useCallback(
    (index: number) => {
      setMouseState({ ...mouseState, isMouseDown: true });
      setTargetIndex(index);
    },
    [mouseState]
  );

  const handleMouseUp = useCallback(() => {
    if (!mouseState.isMouseDown) return;

    if (mouseState.isMoving && !scrollState.isScrollEnabled) {
      updatePlaylist();
    }

    setMouseState({ isMouseDown: false, isMoving: false });
  }, [mouseState, scrollState, updatePlaylist]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (mouseState.isMouseDown) {
        setMouseY(e.clientY);

        if (!mouseState.isMoving) {
          setMouseState({ ...mouseState, isMoving: true });
        }

        if (!scrollState.isScrolling && scrollState.isScrollEnabled) {
          setScrollState({ ...scrollState, isScrollEnabled: false });
        }
      }
    },
    [mouseState, scrollState]
  );

  useEffect(() => {
    setPlaylisData(createPlaylistData());
  }, [playingInfo, createPlaylistData]);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  useInterval(() => {
    if (!mouseState.isMoving) return;

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
      setScrollState({ ...scrollState, isScrolling: false });

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
        <Wrapper>
          <PlaylistContainer height={getTotalSize()}>
            {virtualMap((virtualItem, item) => (
              <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
                <Fragment>
                  {mouseState.isMoving &&
                    !scrollState.isScrollEnabled &&
                    virtualItem.index === getCursorIndex() && (
                      <MovementCursor />
                    )}
                  <SongContainer
                    $playing={item.isPlaying}
                    $selected={item.isSelected}
                    $ismoving={mouseState.isMoving}
                    $istarget={
                      mouseState.isMoving && targetIndex === virtualItem.index
                    }
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
            {mouseState.isMoving &&
              !scrollState.isScrollEnabled &&
              getCursorIndex() === playlistData.length && <MovementCursor />}
          </PlaylistContainer>
        </Wrapper>
      </PlayerScroll>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 0;
`;

const Wrapper = styled.div`
  height: calc(100vh - 410px);
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
      background-color: ${colors.gray700};
    `}

  &:hover {
    ${({ $ismoving }) =>
      !$ismoving &&
      css`
        background-color: ${colors.gray700};
      `}
  }
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
