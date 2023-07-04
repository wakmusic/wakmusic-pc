import { CSSProperties } from "react";
import Lottie from "react-lottie";

interface LottiePlayerProps {
  animationData: unknown;
  style?: CSSProperties;
}

export default function LottiePlayer(Props: LottiePlayerProps) {
  const { animationData, style } = Props;

  // making a default option

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} style={style} />;
}
