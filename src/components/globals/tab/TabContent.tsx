import { ReactElement, useEffect, useRef, useState } from "react";
import { Keyframes } from "styled-components/dist/types";
import styled, { css, keyframes } from "styled-components/macro";

import { useTabState } from "@hooks/tab";

import { isNull } from "@utils/isTypes";

interface TabContentProps {
  children: ReactElement | ReactElement[];
}

const TabContent = ({ children }: TabContentProps) => {
  const [tabState, setTabState] = useTabState();

  const [animation, setAnimation] = useState<Keyframes | null>(null);
  const [prevChildren, setPrevChildren] = useState<Node | null>(null);

  const animatedContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTabState((prev) => ({
      ...prev,
      beforeChange: () => {
        const child = animatedContainerRef.current?.firstChild;

        if (!child) return;

        setPrevChildren(child);
      },
    }));
  }, [children, setTabState, tabState.currentTab]);

  useEffect(() => {
    if (tabState.prevTab === -1 || tabState.prevTab === tabState.currentTab) {
      setAnimation(null);
      return;
    }
    console.log(
      `PlayTransition prevTab: ${tabState.prevTab}, currentTab: ${tabState.currentTab}`
    );

    if (tabState.prevTab - tabState.currentTab > 0) {
      setAnimation(FadeOutRight);
      console.log("FOR");
    } else {
      setAnimation(FadeOutLeft);
      console.log("FOL");
    }
  }, [tabState.currentTab, tabState.prevTab]);

  useEffect(() => {
    console.log(prevChildren);
    if (!animatedContainerRef.current) return;

    if (prevChildren) {
      animatedContainerRef.current.replaceChildren(prevChildren);
    }
  }, [prevChildren]);

  useEffect(() => {
    console.log(`animation: ${animation?.id}`);
  }, [animation]);

  return (
    <Container>
      <AnimatedContainer
        ref={animatedContainerRef}
        $animation={animation}
        onAnimationEnd={(e) => {
          if (e.animationName === animation?.name) {
            if (prevChildren && animatedContainerRef.current) {
              animatedContainerRef.current.removeChild(prevChildren);
              setPrevChildren(null);
            }

            switch (e.animationName) {
              case FadeOutRight.name:
                setAnimation(FadeInLeft);
                break;
              case FadeOutLeft.name:
                setAnimation(FadeInRight);
                break;
              default:
                setAnimation(null);
                break;
            }
          }
        }}
      >
        {isNull(prevChildren) && <Content>{children}</Content>}
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
}>`
  position: relative;

  ${({ $animation }) =>
    !isNull($animation) &&
    css`
      animation: ${$animation} 0.1s ease-out;
    `}
  animation-fill-mode: forwards;
`;

const Content = styled.div``;

export default TabContent;
