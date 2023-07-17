import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { T7Light } from "@components/Typography";

import colors from "@constants/colors";
import { Playlist } from "../../types/player";

interface PlaylistProps {
  playlist: Playlist;
  playing: number;
  onChange: (playlist: Playlist) => void;
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

  const [targetIndex, setTargetIndex] = useState(0);
  const [cursorIndex, setCursorIndex] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);

  const [mouseY, setMouseY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  function onSongSelected(index: number) {
    const newPlaylistData = [...playlistData];

    newPlaylistData[index].isSelected = !newPlaylistData[index].isSelected;

    setPlaylisData(newPlaylistData);
  }

  const updateCursorPosition = useCallback(() => {
    const rect = ref.current?.getBoundingClientRect();
    if (!ref.current || !rect) return;

    const y =
      Math.max(rect.top, Math.min(rect.bottom, mouseY)) +
      (ref.current.scrollTop ?? 0) -
      rect.top;

    const index = Math.max(
      0,
      Math.min(playlistData.length, Math.round(y / 24))
    );

    setCursorIndex(index);

    setCursorPosition(rect.top - ref.current.scrollTop + index * 24);
  }, [mouseY, playlistData]);

  const handleMouseDown = useCallback((index: number) => {
    setIsMouseDown(true);

    setTargetIndex(index);
  }, []);

  const handleMouseUp = useCallback(() => {
    if (isMoving) {
      const target = playlistData[targetIndex];

      playlistData.splice(targetIndex, 1);
      playlistData.splice(
        targetIndex < cursorIndex ? cursorIndex - 1 : cursorIndex,
        0,
        target
      );

      onChange(
        playlistData.map((song) => ({ title: song.title, artist: song.artist }))
      );
      onPlayingChange(playlistData.findIndex((song) => song.isPlaying));
    }

    setIsMouseDown(false);
    setIsMoving(false);
  }, [
    isMoving,
    playlistData,
    cursorIndex,
    targetIndex,
    onChange,
    onPlayingChange,
  ]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseDown) {
        if (!isMoving) {
          setIsMoving(true);
        }

        updateCursorPosition();
      }

      setMouseY(e.clientY);
    },
    [isMoving, isMouseDown, updateCursorPosition]
  );

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseUp, handleMouseMove]);

  useEffect(() => {
    if (!isMoving) return;

    const rect = ref.current?.getBoundingClientRect();
    if (!ref.current || !rect) return;

    if (rect.bottom - mouseY < 25) {
      ref.current.scrollTop += 5;
    } else if (mouseY - rect.top < 25) {
      ref.current.scrollTop -= 5;
    }
  }, [cursorPosition, mouseY, isMoving]);

  return (
    <Container>
      <PlaylistContainer ref={ref} onScroll={updateCursorPosition}>
        {playlistData.map((song, i) => (
          <SongContainer
            key={i}
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
        ))}
      </PlaylistContainer>

      <MovementCursor isenabled={isMoving ? 1 : 0} position={cursorPosition} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: calc(100% - 341px);

  padding: 16px 5px 16px 0;
`;

const PlaylistContainer = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${colors.gray600};
    border-radius: 3px;
  }
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

  &:hover {
    ${({ ismoving }) =>
      !ismoving &&
      css`
        background-color: ${colors.gray700};
      `}
  }

  ${({ selected, istarget }) =>
    (selected || istarget) &&
    css`
      background-color: ${colors.gray700};
    `}
`;

const TitleText = styled(T7Light)`
  width: 176px;
`;

const ArtistText = styled(T7Light)`
  width: 82px;
`;

const MovementCursor = styled.div.attrs<{ isenabled: 1 | 0; position: number }>(
  ({ isenabled, position }) => ({
    style: {
      top: `${position}px`,
      display: isenabled ? "inherit" : "none",
    },
  })
)`
  width: 268px;
  height: 1px;

  margin-left: 11px;

  position: absolute;

  background-color: ${colors.gray500};
`;

export default Playlist;
