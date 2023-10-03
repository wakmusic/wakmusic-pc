import { useEffect, useMemo, useRef, useState } from "react";
import styled, { css, keyframes } from "styled-components/macro";

interface MarqueeProps {
  width: number;
  children: React.ReactNode;

  hoverOnPlay?: boolean;
  startAtMiddle?: boolean;
}

const Marquee = ({
  width,
  children,
  hoverOnPlay,
  startAtMiddle,
}: MarqueeProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [elementWidth, setElementWidth] = useState(0);
  const running = useMemo(() => elementWidth > width, [elementWidth, width]);

  useEffect(() => {
    setElementWidth(ref.current?.clientWidth || 0);
  }, [children]);

  return (
    <Container $running={running} $hoverOnPlay={hoverOnPlay}>
      <Wrapper
        $running={running}
        $startAtMiddle={startAtMiddle}
        style={{
          animationDuration: `${elementWidth / 30}s`,
        }}
      >
        <Element ref={ref} $running={running}>
          {children}
        </Element>
        {running && <Element $running={running}>{children}</Element>}
      </Wrapper>
    </Container>
  );
};

const MarqueeKeyframes = keyframes`
  0% {
    transform: translateX(0);
  }
  
  100% {
    transform: translateX(-50%);
  }
`;

const Wrapper = styled.div<{ $running: boolean; $startAtMiddle?: boolean }>`
  white-space: nowrap;

  ${({ $running }) =>
    $running &&
    css`
      width: fit-content;
      animation: ${MarqueeKeyframes} 10s linear infinite;
    `}

  ${({ $running, $startAtMiddle }) =>
    $running &&
    $startAtMiddle &&
    css`
      padding-left: calc(50vw - 160px);
    `}
`;

const Container = styled.div<{ $running: boolean; $hoverOnPlay?: boolean }>`
  overflow: hidden;

  ${({ $hoverOnPlay, $running }) =>
    $hoverOnPlay &&
    $running &&
    css`
      &:hover ${Wrapper} {
        animation: ${MarqueeKeyframes} 10s linear infinite;
      }

      ${Wrapper} {
        animation: none;
      }
    `}
`;

const Element = styled.div<{ $running: boolean }>`
  display: inline-block;

  ${({ $running }) =>
    $running &&
    css`
      text-indent: 60px;
      transform: translateX(-60px);
    `};
`;

export default Marquee;
