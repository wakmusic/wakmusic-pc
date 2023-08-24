import styled, { css, keyframes } from "styled-components/macro";

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
    margin-left: ${isNumber($marginLeft) ? `${$marginLeft}px` : $marginLeft};

    margin-right: ${isNumber($marginRight)
      ? `${$marginRight}px`
      : $marginRight};

    margin-top: ${isNumber($marginTop) ? `${$marginTop}px` : $marginTop};

    margin-bottom: ${isNumber($marginBottom)
      ? `${$marginBottom}px`
      : $marginBottom};
  `}
`;

const ChangeColor = keyframes`
  0% {
    background-color: #d3d3d3;
  }

  50% {
    background-color: #acacac;
  }

  100% {
    background-color: #d3d3d3;
  }
`;

const Container = styled.div<{
  $width?: string | number;
  $height?: string | number;
  $borderRadius?: string | number;
}>`
  ${({ $width, $height, $borderRadius }) => css`
    width: ${isNumber($width) ? `${$width}px` : $width};
    height: ${isNumber($height) ? `${$height}px` : $height};

    border-radius: ${isNumber($borderRadius)
      ? `${$borderRadius}px`
      : $borderRadius};
  `}

  animation: ${ChangeColor} 2s infinite;
`;

export default Skeleton;
