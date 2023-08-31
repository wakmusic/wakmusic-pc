import styled, { css, keyframes } from "styled-components/macro";

import colors from "@constants/colors";

import { isNumber } from "@utils/isTypes";

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;

  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  marginBottom?: string | number;
}

const convert = (value: string | number | undefined) => {
  return isNumber(value) ? `${value}px` : value;
};

const Skeleton = ({
  width = "100%",
  height = "100%",
  borderRadius = 4,
  marginLeft = 0,
  marginRight = 0,
  marginTop = 0,
  marginBottom = 0,
}: SkeletonProps) => {
  return (
    <MarginContainer
      $marginLeft={marginLeft}
      $marginRight={marginRight}
      $marginTop={marginTop}
      $marginBottom={marginBottom}
    >
      <Container $width={width} $height={height} $borderRadius={borderRadius} />
    </MarginContainer>
  );
};

const MarginContainer = styled.div<{
  $marginLeft?: string | number;
  $marginRight?: string | number;
  $marginTop?: string | number;
  $marginBottom?: string | number;
}>`
  ${({ $marginLeft, $marginRight, $marginTop, $marginBottom }) => css`
    margin-left: ${convert($marginLeft)};
    margin-right: ${convert($marginRight)};
    margin-top: ${convert($marginTop)};
    margin-bottom: ${convert($marginBottom)};
  `}
`;

const Shimmer = keyframes`
  100% {
    transform: translateX(100%);
  }
`;

const Container = styled.div<{
  $width?: string | number;
  $height?: string | number;
  $borderRadius?: string | number;
}>`
  ${({ $width, $height, $borderRadius }) => css`
    width: ${convert($width)};
    height: ${convert($height)};

    border-radius: ${convert($borderRadius)};
  `}

  background-color: ${colors.blueGray200};

  position: relative;

  overflow: hidden;

  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;

    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0) 0,
      rgba(255, 255, 255, 0.2) 20%,
      rgba(255, 255, 255, 0.5) 60%,
      rgba(255, 255, 255, 0)
    );

    animation: ${Shimmer} 1s infinite linear;
    content: "";
  }
`;

export default Skeleton;
