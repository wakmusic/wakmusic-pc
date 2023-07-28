import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { T4Medium, T6Medium } from "@components/Typography";

import colors from "@constants/colors";
import { lyrics as dummy } from "@constants/dummys";

import { usePlayingProgressState } from "@hooks/player";

interface LyricsProps {
  size: "large" | "medium" | "small";
}

const Lyrics = ({ size }: LyricsProps) => {
  const lyrics = dummy;

  const [current, setCurrent] = usePlayingProgressState();
  const [padding, setPadding] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  function onLineClick(index: number) {
    setCurrent(lyrics[index].start);
  }

  const getIndex = useCallback(() => {
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

    const index = getIndex();

    const target = ref.current.children[index] as HTMLDivElement;
    if (!target) return;

    const top = target.offsetTop - ref.current.offsetTop - padding + 12;

    ref.current.scrollTo({ top, behavior: "smooth" });
  }, [getIndex, padding]);

  useEffect(() => {
    setPadding((ref.current?.offsetHeight ?? 0) / 2);
  }, [ref]);

  return (
    <Container ref={ref} padding={padding} $noGap={size === "medium"}>
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

const Container = styled.div<{ padding: number; $noGap: boolean }>`
  width: 100%;
  height: 100%;

  padding: ${({ padding }) => padding}px 0;

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
  line-height: 20px;

  ${Line}

  opacity: 0.6;
`;

export default Lyrics;
