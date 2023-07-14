import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

import { T8Medium } from "@components/Typography";

import colors from "@constants/colors";

import { formatSecond } from "@utils/formatting";

interface TimelineProps {
  length: number;
  current: number;
  onChange: (time: number) => void;
}

const Timeline = ({ length, current, onChange }: TimelineProps) => {
  const progress = current / length;

  const [isMouseDown, setIsMouseDown] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const changeProgressPosition = useCallback(
    (e: MouseEvent | React.MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();

      if (!rect) {
        return;
      }

      const x = e.clientX - rect.left;
      const newProgress = x / rect.width;

      onChange(Math.min(1, Math.max(0, newProgress)) * length);
    },
    [length, onChange]
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
      controlling={isMouseDown ? 1 : 0}
    >
      <Line style={{ width: `${progress * 100}%` }} />
      <HandleContainer style={{ left: `calc(${progress * 100}% - 3px)` }}>
        <Handle />
        <TimelinePopover>
          <CurrentTimeText>{formatSecond(progress * length)}</CurrentTimeText>
          <LengthText>{formatSecond(length)}</LengthText>
        </TimelinePopover>
      </HandleContainer>
    </Container>
  );
};

const HandleContainer = styled.div`
  position: relative;
  display: none;
`;

const Container = styled.div<{ controlling: 0 | 1 }>`
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
  }

  ${({ controlling }) =>
    controlling &&
    css`
      height: 4px;

      margin-bottom: 0;

      & ${HandleContainer} {
        display: inherit;
      }
    `}
`;

const Line = styled.div`
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

const TimelinePopover = styled.div`
  height: 18px;

  position: relative;
  top: -40px;
  transform: translateX(calc(-50% + 5px));

  padding: 4px;

  display: inline-flex;
  align-items: center;
  gap: 3px;

  border-radius: 4px;
  background-color: ${colors.gray900};
  opacity: 0.8;
`;

const CurrentTimeText = styled(T8Medium)`
  color: ${colors.point};
`;

const LengthText = styled(T8Medium)`
  color: ${colors.blueGray100};
  opacity: 0.6;
`;

export default Timeline;
