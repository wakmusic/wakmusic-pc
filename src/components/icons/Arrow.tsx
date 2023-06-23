import { ReactComponent as ArrowLeft } from "@assets/icons/ic_16_arrow_left.svg";
import { ReactComponent as ArrowRight } from "@assets/icons/ic_16_arrow_right.svg";

interface ArrowProps {
  direction: "left" | "right";
  [key: string]: unknown;
}

const Arrow = ({ direction, ...props }: ArrowProps) => {
  if (direction === "left") return <ArrowLeft {...props} />;
  else if (direction === "right") return <ArrowRight {...props} />;
  else return null;
};

export default Arrow;
