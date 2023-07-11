import styled from "styled-components";

import { T7Medium } from "@components/Typography/Medium";

import colors from "@constants/colors";
import { musicControllerDataTwo } from "@constants/musicController";

import MusicControllerBase, { ControllerButton } from "./MusicControllerBase";

interface MusicControllerProps {}

const MusicControllerTwo = ({}: MusicControllerProps) => {
  return (
    <MusicControllerBase>
      {musicControllerDataTwo.map((item) => {
        return (
          <ControllerButton key={item.name}>
            <img src={item.img} />
            <ControllerText>{item.name}</ControllerText>
          </ControllerButton>
        );
      })}
    </MusicControllerBase>
  );
};

const ControllerText = styled(T7Medium)`
  color: ${colors.blueGray25};
`;

export default MusicControllerTwo;
