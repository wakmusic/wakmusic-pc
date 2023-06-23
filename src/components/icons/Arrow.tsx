import { ReactComponent as ArrowLeft } from "@assets/icons/ic_16_arrow_left.svg";
import { ReactComponent as ArrowRight } from "@assets/icons/ic_16_arrow_right.svg";

interface ArrowProps {
  direction: "left" | "right";

  // props 처리용
  [key: string]: unknown;
}

const Arrow = ({ direction, ...props }: ArrowProps) => {
  switch (direction) {
    case "left":
      return <ArrowLeft {...props} />;
    case "right":
      return <ArrowRight {...props} />;
    default:
      return null;
  }
};

export default Arrow;
