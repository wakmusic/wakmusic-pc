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

  width: 188px;
  height: 188px;
  transform: rotate(67.211deg);
  border-radius: 187.636px;

  background: linear-gradient(
    210deg,
    rgba(244, 255, 129, 0) 14.42%,
    #ffd859 106.09%
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
    180deg,
    rgba(236, 244, 195, 0) 14.69%,
    #f0af4d 61.48%
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
  background: linear-gradient(
    127deg,
    rgba(128, 143, 60, 0) 14.42%,
    #b7cf3b 106.09%
  );

  filter: blur(12.5px);
`;

export default Background;
