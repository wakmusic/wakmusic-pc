import { motion } from "framer-motion";
import { useRef } from "react";
import styled from "styled-components/macro";

import { useFollowPointer } from "@hooks/followPointer";

interface BackgroundProps {}

const Background = ({}: BackgroundProps) => {
  const ref = useRef(null);
  const { x, y } = useFollowPointer(ref, 0.3);

  return (
    <Container ref={ref}>
      <Circle1
        animate={{ x, y }}
        transition={{
          type: "spring",
          damping: 4,
          stiffness: 20,
          restDelta: 0.001,
        }}
      />
      <Circle2
        animate={{ x, y }}
        transition={{
          type: "spring",
          damping: 3,
          stiffness: 60,
          restDelta: 0.002,
        }}
      />
      <Circle3
        animate={{ x, y }}
        transition={{
          type: "spring",
          damping: 2,
          stiffness: 30,
          restDelta: 0.003,
        }}
      />
    </Container>
  );
};

const Container = styled.div`
  z-index: -1;

  position: fixed;
  top: 0;
  left: 0;

  width: 100vw;
  height: 100vh;
`;

const Circle1 = styled(motion.div)`
  position: absolute;
  top: 352.5px;
  left: 17.5px;

  width: 187.636px;
  height: 187.636px;
  transform: rotate(67.211deg);
  border-radius: 187.636px;

  background: linear-gradient(
    127deg,
    rgba(56, 230, 255, 0.35) 0%,
    rgba(244, 255, 129, 0.4) 100%
  );

  filter: blur(12.5px);
`;

const Circle2 = styled(motion.div)`
  position: absolute;
  top: -22px;
  left: 380px;

  width: 282.499px;
  height: 282.499px;
  transform: rotate(46.442deg);
  border-radius: 282.499px;
  background: linear-gradient(
    133deg,
    rgba(56, 230, 255, 0) 0%,
    rgba(0, 200, 210, 0.8) 100%
  );
  filter: blur(12.5px);
`;

const Circle3 = styled(motion.div)`
  position: absolute;
  top: 446px;
  left: 653px;

  width: 211.25px;
  height: 211.25px;
  border-radius: 211.25px;
  background: linear-gradient(127deg, rgba(244, 255, 129, 0) 0%, #f4ff81 100%);
  filter: blur(12.5px);
`;

export default Background;
