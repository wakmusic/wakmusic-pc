import throttle from "lodash.throttle";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";

import { PretendardMedium, T4Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useInterval } from "@hooks/interval";
import {
  useControlState,
  useLyricsState,
  usePlayingProgressChangeState,
  usePlayingProgressState,
} from "@hooks/player";

import { isNull } from "@utils/isTypes";

type LyricsSize = "large" | "small";

interface LyricsProps {
  size: LyricsSize;
}

const Lyrics = ({ size }: LyricsProps) => {
  const [lyrics] = useLyricsState();

  const [current] = usePlayingProgressState();
  const [, setCurrent] = usePlayingProgressChangeState();
  const [control, setControl] = useControlState();

  const [padding, setPadding] = useState(0);

  const [timeout, setTimeout] = useState<number>(0);

  const ref = useRef<HTMLDivElement>(null);

  function onLineClick(index: number) {
    if (isNull(lyrics)) return;

    if (!control.isPlaying) {
      setControl({ ...control, isPlaying: true });
    }

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

  useEffect(() => {
    if (!ref.current) return;
    if (timeout !== 0) return;

    const index = getIndex();

    const target = ref.current.children[index] as HTMLDivElement;
    if (!target) return;

    const top = target.offsetTop - ref.current.offsetTop - padding + 12;

    ref.current.scrollTo({ top, behavior: "smooth" });
  }, [getIndex, padding, timeout]);

  useEffect(() => {
    setPadding((ref.current?.offsetHeight ?? 0) / 2);
  }, [ref]);

  useInterval(() => {
    setTimeout((prev) => {
      if (prev === 0) return 0;

      return prev - 1;
    });
  }, 1000);

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
      $padding={padding}
      onWheel={throttle(() => setTimeout(5))}
    >
      {lyrics.map((line, i) => {
        const Line = i === getIndex() ? CurrentLine : DefaultLine;

        return (
          <Line
            key={i}
            $size={size}
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

const Container = styled.div<{
  $padding: number;
}>`
  width: 100%;
  height: 100%;

  padding: ${({ $padding }) => $padding}px 0;

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
