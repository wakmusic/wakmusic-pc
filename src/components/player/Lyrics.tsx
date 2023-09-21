import throttle from "lodash.throttle";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";

import { PretendardMedium, T4Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useInterval } from "@hooks/interval";
import {
  useControlState,
  useLyricsState,
  usePlayingInfoState,
  usePlayingProgressChangeState,
  usePlayingProgressState,
  useVisualModeState,
} from "@hooks/player";

import { isNull } from "@utils/isTypes";
import { ipcRenderer } from "@utils/modules";

type LyricsSize = "large" | "small";

interface LyricsProps {
  size: LyricsSize;
  isVisualMode: boolean;
}

const Lyrics = ({ size, isVisualMode }: LyricsProps) => {
  const [lyrics] = useLyricsState();

  const [current] = usePlayingProgressState();
  const [, setCurrent] = usePlayingProgressChangeState();
  const [control, setControl] = useControlState();
  const [info] = usePlayingInfoState();

  const [visualMode] = useVisualModeState();

  const [timeout, setTimeout] = useState<number>(0);

  const ref = useRef<HTMLDivElement>(null);
  const currentRef = useRef<HTMLDivElement>(null);

  const [prvLyrics, setPrvLyrics] = useState(lyrics);
  const [prvVisualMode, setPrvVisualMode] = useState(visualMode);

  function onLineClick(index: number) {
    if (isNull(lyrics)) return;

    if (!control.isPlaying) {
      setControl({ ...control, isPlaying: true });
    }

    setTimeout(0);
    setCurrent({
      progress: lyrics[index].start,
      force: true,
    });
  }

  const getIndex = useCallback(() => {
    if (isNull(lyrics) || current < lyrics[0].start) {
      return 0;
    }

    if (current >= lyrics[lyrics.length - 1].start) {
      return lyrics.length - 1;
    }

    return lyrics.findIndex((line) => current < line.start) - 1;
  }, [current, lyrics]);

  const setPosition = useCallback(
    (isSmooth: boolean) => {
      if (!ref.current || !currentRef.current) return;

      const index = getIndex();

      const target = ref.current.children[index] as HTMLDivElement;
      if (!target) return;

      const padding = ref.current.offsetHeight / 2;
      const top =
        target.offsetTop -
        ref.current.offsetTop -
        padding +
        currentRef.current.offsetHeight / 2;

      if (Math.abs(ref.current.scrollTop - top) > 300) {
        setTimeout(1);
      }

      ref.current.scrollTo({
        top,
        behavior: (isSmooth ? "smooth" : "instant") as ScrollBehavior,
      });
    },
    [getIndex, ref, currentRef]
  );

  useEffect(() => {
    if (timeout > 0) return;

    setPosition(true);
  }, [setPosition, timeout]);

  useEffect(() => {
    if (lyrics !== prvLyrics) {
      if (!ref.current) return;

      ref.current.scrollTo({
        top: 0,
      });

      setPrvLyrics(lyrics);
    }
  }, [lyrics, prvLyrics]);

  useEffect(() => {
    if (visualMode !== prvVisualMode) {
      if (!ref.current) return;
      setPosition(false);

      setPrvVisualMode(visualMode);
    }
  }, [visualMode, prvVisualMode, setPosition, getIndex]);

  useInterval(() => {
    setTimeout((prev) => {
      if (prev < 0) return 0;

      return prev - 1;
    });
  }, 1000);

  useEffect(() => {
    ipcRenderer?.on(
      "window:resize",
      throttle(() => {
        setPosition(false);
      })
    );

    return () => {
      ipcRenderer?.removeAllListeners("window:resize");
    };
  }, [setPosition]);

  if (info.playlist.length === 0) {
    return <NoLyricsContainer />;
  }

  if (!lyrics) {
    return (
      <NoLyricsContainer>
        <NoLyrics>가사가 존재하지 않습니다</NoLyrics>
      </NoLyricsContainer>
    );
  }

  return (
    <Container
      ref={ref}
      onWheel={throttle(() => setTimeout(3))}
      style={{
        padding: `${(ref.current?.offsetHeight ?? 0) / 2}px 0`,
      }}
    >
      {visualMode === isVisualMode &&
        lyrics.map((line, i) => {
          const isCurrent = i === getIndex();
          const Line =
            current >= lyrics[0].start &&
            current <= lyrics[lyrics.length - 1].end &&
            isCurrent
              ? CurrentLine
              : DefaultLine;

          return (
            <Line
              key={i}
              $size={size}
              ref={isCurrent ? currentRef : null}
              color={colors.blueGray25}
              onClick={() => onLineClick(i)}
            >
              {line.text}
            </Line>
          );
        })}
    </Container>
  );
};

const NoLyricsContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const NoLyrics = styled(T4Medium)`
  color: ${colors.blueGray25};
`;

const Container = styled.div`
  width: 100%;
  height: 100%;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 6px;

  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Line = css`
  text-align: center;

  cursor: pointer;
  white-space: pre-wrap;
`;

const CurrentLine = styled(PretendardMedium)<{ $size: LyricsSize }>`
  ${Line}

  ${({ $size }) =>
    $size === "large"
      ? css`
          font-size: 18px;
          line-height: 30px;
        `
      : css`
          font-size: 16px;
          line-height: 22px;
        `}
`;

const DefaultLine = styled(PretendardMedium)<{ $size: LyricsSize }>`
  ${Line}

  opacity: 0.6;

  ${({ $size }) =>
    $size === "large"
      ? css`
          font-size: 14px;
          line-height: 20px;
        `
      : css`
          font-size: 12px;
          line-height: 18px;
        `}
`;

export default Lyrics;
