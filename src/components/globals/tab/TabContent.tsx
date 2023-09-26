import {
  Children,
  ReactElement,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
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

  const [prevChildren, setPrevChildren] = useState<Node | null>(null);

  const animatedContainerRef = useRef<HTMLDivElement | null>(null);
  const prevContentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTabState({
      beforeChange: () => {
        const animatedContainerDOM = animatedContainerRef.current;
        const child = animatedContainerDOM?.firstChild;

        if (!animatedContainerDOM || !child) return;

        Children.forEach(children, (child) => {
          if ("ref" in child && child.ref !== null) {
            // defaultScroll 스크롤 초기화

            const viewportRef = (child.ref as RefObject<HTMLDivElement>)
              .current;

            viewportRef?.scrollTo({
              top: 0,
            });
          }
        });

        setPrevChildren(child.cloneNode(true));
      },
    });
  }, [setTabState, children]);

  useEffect(() => {
    if (tabState.prevTab === -1 || tabState.prevTab === tabState.currentTab) {
      setAnimation(null);
      return;
    }

    if (tabState.prevTab - tabState.currentTab > 0) {
      setAnimation(FadeOutRight);
    } else {
      setAnimation(FadeOutLeft);
    }
  }, [tabState.currentTab, tabState.prevTab]);

  useEffect(() => {
    const prevContentDOM = prevContentRef.current;
    if (!prevContentDOM || !prevChildren || prevContentDOM.hasChildNodes())
      return;

    prevContentDOM.appendChild(prevChildren);
  }, [prevChildren]);

  return (
    <Container>
      <AnimatedContainer
        ref={animatedContainerRef}
        $animation={animation}
        onAnimationEnd={(e) => {
          if (e.animationName === animation?.name) {
            const prevContentDom = prevContentRef.current;

            if (prevChildren && prevContentDom) {
              prevContentDom.replaceChildren();
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
                onChange && onChange();
                break;
            }
          }
        }}
      >
        <Content $display={isNull(prevChildren)}>{children}</Content>
        <PrevContent ref={prevContentRef} />
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

const Content = styled.div<{
  $display: boolean;
}>`
  display: ${({ $display }) => ($display ? "block" : "none")};
`;

const PrevContent = styled.div``;

export default TabContent;
