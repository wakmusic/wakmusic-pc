import { ReactElement, useEffect, useState } from "react";
import { Keyframes } from "styled-components/dist/types";
import styled, { css, keyframes } from "styled-components/macro";

import { useTabState } from "@hooks/tab";

import { isNull } from "@utils/isTypes";

interface TabContentProps {
  children: ReactElement | ReactElement[];
  onChange?: () => void;
}

const TabContent = ({ children, onChange }: TabContentProps) => {
  const { tabState, setTabState } = useTabState();

  const [animation, setAnimation] = useState<Keyframes | null>(null);

  useEffect(() => {
    setTabState((prev) => ({
      ...prev,
      beforeChange: (currentTab, newTab) => {
        if (currentTab - newTab > 0) {
          setAnimation(FadeOutRight);
        } else {
          setAnimation(FadeOutLeft);
        }
      },
    }));
  }, [setTabState, children]);

  return (
    <Container>
      <AnimatedContainer
        $animation={animation}
        $animationTime={tabState.transitionTime}
        onAnimationEnd={(e) => {
          if (e.animationName === animation?.name) {
            switch (e.animationName) {
              case FadeOutRight.name:
                setAnimation(FadeInLeft);
                break;
              case FadeOutLeft.name:
                setAnimation(FadeInRight);
                break;
              default:
                setAnimation(null);
                onChange && onChange();
                break;
            }
          }
        }}
      >
        {children}
      </AnimatedContainer>
    </Container>
  );
};

const FadeInLeft = keyframes`
  0% {
    left: -100px;
    opacity: 0;
  }

  100% {
    left: 0px;
    opacity: 1;
  }
`;

const FadeInRight = keyframes`
  0% {
    right: -100px;
    opacity: 0;
  }

  100% {
    right: 0px;
    opacity: 1;
  }
`;

const FadeOutLeft = keyframes`
  0% {
    left: 0px;
    opacity: 1;
  }

  100% {
    left: -100px;
    opacity: 0;
  }
`;

const FadeOutRight = keyframes`
  0% {
    right: 0px;
    opacity: 1;
  }

  100% {
    right: -100px;
    opacity: 0;
  }
`;

const Container = styled.div``;

const AnimatedContainer = styled.div<{
  $animation: Keyframes | null;
  $animationTime: number;
}>`
  position: relative;

  ${({ $animation, $animationTime }) =>
    !isNull($animation) &&
    css`
      animation: ${$animation} ${$animationTime}s ease-out;
    `}
  animation-fill-mode: forwards;
`;

export default TabContent;
