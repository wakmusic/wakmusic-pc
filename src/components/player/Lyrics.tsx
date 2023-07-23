import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { T7Medium, T8Medium } from "@components/Typography";

import colors from "@constants/colors";
import { lyrics as dummy } from "@constants/dummys";

import { useCurrentPlayingState } from "@hooks/player";

interface LyricsProps {}

const Lyrics = ({}: LyricsProps) => {
  const lyrics = dummy;

  const [current, setCurrent] = useCurrentPlayingState();
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

    const top = target.offsetTop - ref.current.offsetTop - padding;

    ref.current.scrollTo({ top, behavior: "smooth" });
  }, [getIndex, padding]);

  useEffect(() => {
    setPadding((ref.current?.offsetHeight ?? 0) / 2 - 9);
  }, [ref]);

  return (
    <Container>
      <LyricsWrapper ref={ref} padding={padding}>
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
      </LyricsWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 5px 0;
`;

const LyricsWrapper = styled.div<{ padding: number }>`
  width: 100%;
  height: 100%;

  padding: ${({ padding }) => padding}px 0;

  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 4px;

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

const CurrentLine = styled(T7Medium)`
  ${Line}
`;

const DefaultLine = styled(T8Medium)`
  ${Line}

  opacity: 0.6;
`;

export default Lyrics;
