import throttle from "lodash.throttle";
import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";

import { T4Medium, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useInterval } from "@hooks/interval";
import {
  useLyricsState,
  usePlayingProgressChangeState,
  usePlayingProgressState,
} from "@hooks/player";

import { isNull } from "@utils/isTypes";

interface LyricsProps {
  size: "large" | "medium" | "small";
  extraPadding?: number;
}

const Lyrics = ({ size, extraPadding }: LyricsProps) => {
  const [lyrics] = useLyricsState();

  const [current] = usePlayingProgressState();
  const [, setCurrent] = usePlayingProgressChangeState();

  const [padding, setPadding] = useState(0);

  const [timeout, setTimeout] = useState<number>(0);

  const ref = useRef<HTMLDivElement>(null);

  function onLineClick(index: number) {
    if (isNull(lyrics)) return;

    setCurrent(lyrics[index].start);
  }

  const getIndex = useCallback(() => {
    if (isNull(lyrics)) return 0;

    if (current < lyrics[0].start) {
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
      padding={padding}
      $extraPadding={extraPadding ?? 0}
      $noGap={size === "medium"}
      onWheel={throttle(() => setTimeout(5))}
    >
      {lyrics.map((line, i) => {
        const Line = i === getIndex() ? CurrentLine : DefaultLine;

        return (
          <Line
            key={i}
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
  padding: number;
  $extraPadding: number;
  $noGap: boolean;
}>`
  width: 100%;
  height: 100%;

  padding: ${({ padding }) => padding}px 0
    ${({ padding, $extraPadding }) => padding + $extraPadding}px 0;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: ${({ $noGap }) => ($noGap ? "4px" : "6px")};

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

const CurrentLine = styled(T4Medium)`
  line-height: 23px;

  ${Line}
`;

const DefaultLine = styled(T6Medium)`
  ${Line}

  opacity: 0.6;
`;

export default Lyrics;
