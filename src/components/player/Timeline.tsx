import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";

import { T8Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useCurrentPlayingState } from "@hooks/player";

import { formatSecond } from "@utils/formatting";

interface TimelineProps {
  length: number;
}

const Timeline = ({ length }: TimelineProps) => {
  const [current, setCurrent] = useCurrentPlayingState();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const changeProgressPosition = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const newProgress = x / rect.width;

      setCurrent(Math.min(1, Math.max(0, newProgress)) * length);
    },
    [length, setCurrent]
  );

  const handleMouseState = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      if (e.type !== "mousedown") {
        setIsMouseDown(false);

        return;
      }

      setIsMouseDown(true);
      changeProgressPosition(e);
    },
    [changeProgressPosition]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isMouseDown) {
        changeProgressPosition(e);
      }
    },
    [isMouseDown, changeProgressPosition]
  );

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseState);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseState);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseState, handleMouseMove]);

  return (
    <Container
      ref={ref}
      onMouseDown={handleMouseState}
      $controlling={isMouseDown}
    >
      <Line progress={(current / length) * 100} />
      <HandleContainer progress={(current / length) * 100}>
        <Handle />
      </HandleContainer>
      <TimelinePopover progress={(current / length) * 100}>
        <T8Medium color={colors.point}>{formatSecond(current)}</T8Medium>
        <LengthText color={colors.blueGray100}>
          {formatSecond(length)}
        </LengthText>
      </TimelinePopover>
    </Container>
  );
};

const HandleContainer = styled.div.attrs<{ progress: number }>(
  ({ progress }) => ({
    style: {
      left: `calc(${progress}% - 3px)`,
    },
  })
)`
  position: relative;

  display: none;
`;

const TimelinePopover = styled.div.attrs<{ progress: number }>(
  ({ progress }) => ({
    style: {
      left: `min(calc(100% - 35px), max(35px, calc(${progress}% - 3px)))`,
    },
  })
)`
  height: 18px;

  padding: 4px;

  position: relative;
  transform: translate(-50%, -40px);

  display: none;
  align-items: center;
  gap: 3px;

  border-radius: 4px;
  background-color: ${colors.gray900};
  opacity: 0.8;
`;

const Container = styled.div<{ $controlling: boolean }>`
  width: 100%;
  height: 2px;

  margin-bottom: 2px;

  cursor: pointer;

  &:hover {
    height: 4px;

    margin-bottom: 0;

    ${HandleContainer} {
      display: inherit;
    }

    ${TimelinePopover} {
      display: inline-flex;
    }
  }

  ${({ $controlling }) =>
    $controlling &&
    css`
      height: 4px;

      margin-bottom: 0;

      ${HandleContainer} {
        display: inherit;
      }

      ${TimelinePopover} {
        display: inline-flex;
      }
    `}
`;

const Line = styled.div.attrs<{ progress: number }>(({ progress }) => ({
  style: {
    width: `${progress}%`,
  },
}))`
  height: 100%;

  background-color: ${colors.point};
`;

const Handle = styled.div`
  height: 8px;
  width: 8px;

  position: relative;
  top: -6px;

  border-radius: 50%;
  background-color: ${colors.point};
`;

const LengthText = styled(T8Medium)`
  opacity: 0.6;
`;

export default Timeline;
