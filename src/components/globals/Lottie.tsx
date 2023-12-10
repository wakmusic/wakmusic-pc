import LottieWeb, { AnimationItem } from "lottie-web";
import { useEffect, useRef } from "react";
import styled from "styled-components/macro";

interface LottieProps {
  renderer: "svg" | "canvas";
  animationData: unknown;

  loop?: boolean;
  autoplay?: boolean;

  onCompleteHandler?: () => void;
}

const Lottie = ({
  renderer,
  animationData,
  onCompleteHandler,
  loop = false,
  autoplay = true,
}: LottieProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    lottieRef.current?.destroy();

    lottieRef.current = LottieWeb.loadAnimation({
      container: ref.current,
      renderer,
      loop,
      autoplay,
      animationData: animationData,
    });

    if (onCompleteHandler)
      lottieRef.current.addEventListener("complete", onCompleteHandler);
  }, [animationData, autoplay, loop, onCompleteHandler, renderer]);

  return <LottieContainer ref={ref} />;
};

const LottieContainer = styled.div`
  width: 100%;
  height: 100%;

  & > svg {
    transform: none !important;
  }
`;

export default Lottie;
