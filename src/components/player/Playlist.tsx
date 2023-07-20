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

  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const [targetIndex, setTargetIndex] = useState(0);
  const [cursorIndex, setCursorIndex] = useState(0);

  const [scrollbar, setScrollbar] = useState<HTMLElement | null>(null);
  const [mouseY, setMouseY] = useState(0);

  function onScrollbarInitialized(scroll: HTMLElement) {
    setScrollbar(scroll);
  }

  function onScroll() {
    if (!isScrollEnabled) {
      setIsScrollEnabled(true);
    }
  }

  function onSongSelected(index: number) {
    playlistData[index].isSelected = !playlistData[index].isSelected;

    setPlaylisData([...playlistData]);
  }

  const updatePlaylist = useCallback(() => {
    const target = playlistData[targetIndex];

    playlistData.splice(targetIndex, 1);
    playlistData.splice(
      targetIndex < cursorIndex ? cursorIndex - 1 : cursorIndex,
      0,
      target
    );

    onChange(playlistData);
    onPlayingChange(playlistData.findIndex((song) => song.isPlaying));
  }, [playlistData, targetIndex, cursorIndex, onChange, onPlayingChange]);

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

    setCursorIndex(index);
  }, [mouseY, playlistData, scrollbar]);

  const handleMouseDown = useCallback((index: number) => {
    setIsMouseDown(true);
    setTargetIndex(index);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isMoving && !isScrollEnabled) {
      updatePlaylist();
    }

    setIsMouseDown(false);
    setIsMoving(false);
  }, [isMoving, isScrollEnabled, updatePlaylist]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      setMouseY(e.clientY);
      if (isMouseDown) {
        if (!isMoving) {
          setIsMoving(true);
        }

        if (!isScrolling) {
          setIsScrollEnabled(false);
        }

        updateCursorPosition();
      }
    },
    [isMoving, isMouseDown, updateCursorPosition, isScrolling]
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
    if (!isMoving) return;

    const rect = scrollbar?.getBoundingClientRect();
    if (!scrollbar || !rect) return;

    const range = 25;
    const scale = 0.5;

    const topOffset = mouseY - rect.top;
    const bottomOffset = rect.bottom - mouseY;
    const maxScroll = scrollbar.scrollHeight - scrollbar.clientHeight;

    if (bottomOffset < range && scrollbar.scrollTop < maxScroll) {
      scrollbar.scrollTo(
        0,
        scrollbar.scrollTop + Math.abs(bottomOffset - range) * scale
      );

      setIsScrollEnabled(true);
      setIsScrolling(true);
    } else if (topOffset < range && scrollbar.scrollTop !== 0) {
      scrollbar.scrollTo(0, scrollbar.scrollTop + (topOffset - range) * scale);

      setIsScrollEnabled(true);
      setIsScrolling(true);
    } else {
      setIsScrolling(false);
    }
  }, 24);

  return (
    <Container>
      <PlayerScroll initialize={onScrollbarInitialized} scroll={onScroll}>
        <PlaylistContainer height={playlistData.length * 24}>
          {playlistData.map((song, i) => (
            <Fragment key={i}>
              {isMoving && !isScrollEnabled && i === cursorIndex && (
                <MovementCursor />
              )}
              <SongContainer
                playing={playlistData[i].isPlaying ? 1 : 0}
                selected={playlistData[i].isSelected ? 1 : 0}
                ismoving={isMoving ? 1 : 0}
                istarget={isMoving && targetIndex === i ? 1 : 0}
                onClick={() => onSongSelected(i)}
                onMouseDown={() => handleMouseDown(i)}
              >
                <TitleText>{song.title}</TitleText>
                <ArtistText>{song.artist}</ArtistText>
              </SongContainer>
            </Fragment>
          ))}
          {isMoving &&
            !isScrollEnabled &&
            cursorIndex === playlistData.length && <MovementCursor />}
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
  playing: 1 | 0;
  selected: 1 | 0;
  ismoving: 1 | 0;
  istarget: 1 | 0;
}>`
  width: 100%;
  height: 24px;

  padding-left: 16px;

  display: flex;
  align-items: center;

  cursor: pointer;
  color: ${({ playing }) => (playing ? colors.point : colors.gray500)};

  ${({ selected, istarget }) =>
    (selected || istarget) &&
    css`
      background-color: ${colors.gray700};
    `}

  &:hover {
    ${({ ismoving }) =>
      !ismoving &&
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
