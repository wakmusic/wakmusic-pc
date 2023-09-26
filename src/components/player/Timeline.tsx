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

  const displayingCurrent = (Math.min(current, length) / length) * 100;

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
    <Wrapper
      $controlling={isMouseDown}
      $isSeparated={isSeparated ?? false}
      ref={ref}
      onMouseDown={handleMouseState}
    >
      <Container $controlling={isMouseDown} $isSeparated={isSeparated ?? false}>
        <Line
          $progress={displayingCurrent}
          $isSeparated={isSeparated ?? false}
        />
        <HandleContainer
          $progress={displayingCurrent}
          $isSeparated={isSeparated}
        >
          <Handle />
        </HandleContainer>
        <TimelinePopover
          $progress={displayingCurrent}
          $isSeparated={isSeparated}
        >
          <T8Medium color={colors.point}>{formatSecond(current)}</T8Medium>
          <LengthText color={colors.blueGray100}>
            {formatSecond(length)}
          </LengthText>
        </TimelinePopover>
      </Container>
    </Wrapper>
  );
};

const HandleContainer = styled.div.attrs<{
  $progress: number;
  $isSeparated: boolean;
}>(({ $progress, $isSeparated }) => ({
  style: {
    left: $isSeparated
      ? `calc(${$progress}% - 6px)`
      : `min(calc(100% - 12px), max(0px, calc(${$progress}% - 6px)))`,
  },
}))`
  position: relative;

  display: none;
`;

const TimelinePopover = styled.div.attrs<{
  $progress: number;
  $isSeparated: boolean;
}>(({ $progress, $isSeparated }) => ({
  style: {
    left: $isSeparated
      ? `calc(${$progress}%)`
      : `min(calc(100% - 38px), max(32px, calc(${$progress}%)))`,
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

  ${({ $isSeparated }) =>
    $isSeparated &&
    css`
      border-radius: 2px;
      background-color: rgba(255, 255, 255, 0.1);
    `}

  ${({ $controlling }) =>
    $controlling &&
    css`
      padding-bottom: 0;

      ${HandleContainer} {
        display: inherit;
      }

      ${TimelinePopover} {
        display: inline-flex;
      }
    `}
`;

const Wrapper = styled.div<{ $isSeparated: boolean; $controlling: boolean }>`
  height: 14px;

  cursor: pointer;

  ${({ $controlling }) =>
    $controlling &&
    css`
      padding-bottom: 0;

      ${Container} {
        height: 4px;
      }

      ${HandleContainer} {
        display: inherit;
      }

      ${TimelinePopover} {
        display: inline-flex;
      }
    `}

  &:hover {
    padding-bottom: 0;

    ${Container} {
      height: 4px;
    }

    ${HandleContainer} {
      display: inherit;
    }

    ${TimelinePopover} {
      display: inline-flex;
    }
  }
`;

const Line = styled.div.attrs<{ $progress: number }>(({ $progress }) => ({
  style: {
    width: `${$progress}%`,
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
