import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";

import { T8Medium } from "@components/Typography";

import colors from "@constants/colors";

import {
  useIsControllingState,
  usePlayingLengthState,
  usePlayingProgressChangeState,
  usePlayingProgressState,
} from "@hooks/player";

import { formatSecond } from "@utils/formatting";

interface TimelineProps {
  isSeparated?: boolean;
}

const Timeline = ({ isSeparated }: TimelineProps) => {
  const [length] = usePlayingLengthState();
  const [progress] = usePlayingProgressState();
  const [change, setChange] = usePlayingProgressChangeState();

  const [isMouseDown, setIsMouseDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = useMemo(() => {
    return isMouseDown ? change.progress : progress;
  }, [change, isMouseDown, progress]);

  const [, setIsControlling] = useIsControllingState();

  const changeProgressPosition = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;

      const x = e.clientX - rect.left;
      const newProgress = x / rect.width;

      setChange({
        progress: Math.min(1, Math.max(0, newProgress)) * length,
        force: false,
      });
    },
    [length, setChange]
  );

  const handleMouseState = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      if (e.type !== "mousedown") {
        setIsMouseDown(false);

        return;
      }

      setIsMouseDown(true);

      if (e.type === "mousedown") {
        changeProgressPosition(e);
      }
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

  useEffect(() => {
    setIsControlling(isMouseDown);
  }, [isMouseDown, setIsControlling]);

  return (
    <Container
      ref={ref}
      onMouseDown={handleMouseState}
      $controlling={isMouseDown}
      $isSeparated={isSeparated ?? false}
    >
      <Line
        progress={(current / length) * 100}
        $isSeparated={isSeparated ?? false}
      />
      <HandleContainer progress={(current / length) * 100}>
        <Handle />
      </HandleContainer>
      <TimelinePopover
        progress={(current / length) * 100}
        $isSeparated={isSeparated}
      >
        <T8Medium color={colors.point}>{formatSecond(current)}</T8Medium>
        <LengthText color={colors.blueGray100}>
          {formatSecond(length)}
        </LengthText>
      </TimelinePopover>
    </Container>
  );
};

const HandleContainer = styled.div.attrs<{
  progress: number;
}>(({ progress }) => ({
  style: {
    left: `calc(${progress}% - 3px)`,
  },
}))`
  position: relative;

  display: none;
`;

const TimelinePopover = styled.div.attrs<{
  progress: number;
  $isSeparated: boolean;
}>(({ progress, $isSeparated }) => ({
  style: {
    left: $isSeparated
      ? `calc(${progress}%)`
      : `min(calc(100% - 38px), max(32px, calc(${progress}%)))`,
  },
}))`
  height: 18px;

  padding: 4px;

  position: relative;
  transform: translate(calc(-50% + 3px), -45px);

  display: none;
  align-items: center;
  gap: 3px;

  border-radius: 4px;
  background-color: ${colors.gray900};
  opacity: 0.8;
`;

const Container = styled.div<{ $controlling: boolean; $isSeparated: boolean }>`
  width: 100%;
  height: 2px;

  margin-bottom: 2px;

  cursor: pointer;

  ${({ $isSeparated }) =>
    $isSeparated &&
    css`
      border-radius: 2px;
      background-color: rgba(255, 255, 255, 0.1);
    `}

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
}))<{ $isSeparated: boolean }>`
  height: 100%;

  background-color: ${colors.point};

  ${({ $isSeparated }) =>
    $isSeparated &&
    css`
      border-radius: 2px;
    `}
`;

const Handle = styled.div`
  height: 12px;
  width: 12px;

  position: relative;
  top: -8px;

  border-radius: 50%;
  background-color: ${colors.point};
`;

const LengthText = styled(T8Medium)`
  opacity: 0.6;
`;

export default Timeline;
