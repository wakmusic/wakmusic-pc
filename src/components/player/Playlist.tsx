import { Fragment, useCallback, useEffect, useState } from "react";
import styled, { css } from "styled-components";

import { T7Light } from "@components/Typography";
import PlayerScroll from "@components/globals/Scroll/PlayerScroll";

import colors from "@constants/colors";

import { useInterval } from "@hooks/interval";

import { PlaylistType } from "@templates/player";

interface PlaylistProps {
  playlist: PlaylistType;
  playing: number;
  onChange: (playlist: PlaylistType) => void;
  onPlayingChange: (playing: number) => void;
}

const Playlist = ({
  playlist,
  playing,
  onChange,
  onPlayingChange,
}: PlaylistProps) => {
  const [playlistData, setPlaylisData] = useState(() =>
    playlist.map((song, i) => ({
      ...song,
      isPlaying: i === playing,
      isSelected: false,
    }))
  );

  const [mouseState, setMouseState] = useState({
    isMouseDown: false,
    isMoving: false,
  });

  const [scrollState, setScrollState] = useState({
    isScrollEnabled: false,
    isScrolling: false,
  });

  const [movingIndex, setMovingIndex] = useState({ target: 0, cursor: 0 });

  const [scrollbar, setScrollbar] = useState<HTMLElement | null>(null);
  const [mouseY, setMouseY] = useState(0);

  function onScrollbarInitialized(scroll: HTMLElement) {
    setScrollbar(scroll);
  }

  function onScroll() {
    if (!scrollState.isScrollEnabled) {
      setScrollState({ ...scrollState, isScrollEnabled: true });
    }
  }

  function onSongSelected(index: number) {
    playlistData[index].isSelected = !playlistData[index].isSelected;

    setPlaylisData([...playlistData]);
  }

  const updatePlaylist = useCallback(() => {
    const target = playlistData[movingIndex.target];

    playlistData.splice(movingIndex.target, 1);
    playlistData.splice(
      movingIndex.target < movingIndex.cursor
        ? movingIndex.cursor - 1
        : movingIndex.cursor,
      0,
      target
    );

    onChange(playlistData);
    onPlayingChange(playlistData.findIndex((song) => song.isPlaying));
  }, [playlistData, movingIndex, onChange, onPlayingChange]);

  const updateCursorPosition = useCallback(() => {
    const rect = scrollbar?.getBoundingClientRect();
    if (!scrollbar || !rect) return;

    const y =
      Math.max(rect.top, Math.min(rect.bottom, mouseY)) +
      (scrollbar.scrollTop ?? 0) -
      rect.top;

    const index = Math.max(
      0,
      Math.min(playlistData.length, Math.round(y / 24))
    );

    setMovingIndex({ ...movingIndex, cursor: index });
  }, [mouseY, playlistData, scrollbar, movingIndex]);

  const handleMouseDown = useCallback(
    (index: number) => {
      setMouseState({ ...mouseState, isMouseDown: true });
      setMovingIndex({ ...movingIndex, target: index });
    },
    [movingIndex, mouseState]
  );

  const handleMouseUp = useCallback(() => {
    if (mouseState.isMoving && !scrollState.isScrollEnabled) {
      updatePlaylist();
    }

    setMouseState({ isMouseDown: false, isMoving: false });
  }, [mouseState, scrollState, updatePlaylist]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setMouseY(e.clientY);

      if (mouseState.isMouseDown) {
        if (!mouseState.isMoving) {
          setMouseState({ ...mouseState, isMoving: true });
        }

        if (!scrollState.isScrolling) {
          setScrollState({ ...scrollState, isScrollEnabled: false });
        }

        updateCursorPosition();
      }
    },
    [mouseState, scrollState, updateCursorPosition]
  );

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  useInterval(() => {
    if (!mouseState.isMoving) return;

    const rect = scrollbar?.getBoundingClientRect();
    if (!scrollbar || !rect) return;

    const range = 25;
    const scale = 0.5;

    const topOffset = mouseY - rect.top;
    const bottomOffset = rect.bottom - mouseY;
    const maxScroll = scrollbar.scrollHeight - scrollbar.clientHeight;

    if (bottomOffset < range && scrollbar.scrollTop < maxScroll) {
      scrollbar.scrollTo({
        top: scrollbar.scrollTop + Math.abs(bottomOffset - range) * scale,
      });

      setScrollState({ isScrollEnabled: true, isScrolling: true });
    } else if (topOffset < range && scrollbar.scrollTop !== 0) {
      scrollbar.scrollTo({
        top: scrollbar.scrollTop + (topOffset - range) * scale,
      });

      setScrollState({ isScrollEnabled: true, isScrolling: true });
    } else {
      setScrollState({ ...scrollState, isScrolling: false });
    }
  }, 24);

  return (
    <Container>
      <PlayerScroll initialize={onScrollbarInitialized} scroll={onScroll}>
        <PlaylistContainer height={playlistData.length * 24}>
          {playlistData.map((song, i) => (
            <Fragment key={i}>
              {mouseState.isMoving &&
                !scrollState.isScrollEnabled &&
                i === movingIndex.cursor && <MovementCursor />}
              <SongContainer
                $playing={playlistData[i].isPlaying}
                $selected={playlistData[i].isSelected}
                $ismoving={mouseState.isMoving}
                $istarget={mouseState.isMoving && movingIndex.target === i}
                onClick={() => onSongSelected(i)}
                onMouseDown={() => handleMouseDown(i)}
              >
                <TitleText>{song.title}</TitleText>
                <ArtistText>{song.artist}</ArtistText>
              </SongContainer>
            </Fragment>
          ))}
          {mouseState.isMoving &&
            !scrollState.isScrollEnabled &&
            movingIndex.cursor === playlistData.length && <MovementCursor />}
        </PlaylistContainer>
      </PlayerScroll>
    </Container>
  );
};

const Container = styled.div`
  padding: 16px 0;
`;

const PlaylistContainer = styled.div<{ height: number }>`
  width: 100%;
  height: calc(100vh - 410px);
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
  width: 176px;
`;

const ArtistText = styled(T7Light)`
  width: 82px;
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
