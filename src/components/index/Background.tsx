import throttle from "lodash.throttle";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface BackgroundProps {}

const Background = ({}: BackgroundProps) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = throttle((event: MouseEvent) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    });

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Container
      style={{
        transform: `translate(${mousePosition.x * 0.05}px, ${
          mousePosition.y * 0.05
        }px)`,
      }}
    >
      <Circle1 />
      <Circle2 />
      <Circle3 />
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

const Circle1 = styled.div`
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

const Circle2 = styled.div`
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

const Circle3 = styled.div`
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
