import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as SoundOffSvg } from "@assets/icons/ic_20_sound_off.svg";
import { ReactComponent as SoundOnSvg } from "@assets/icons/ic_20_sound_on.svg";

import colors from "@constants/colors";

import IconButton from "./IconButton";

interface VolumeProps {
  volume: number;
  onChange: (value: number) => void;
}

const Volume = ({ volume, onChange }: VolumeProps) => {
  const [isHover, setIsVolumeHovered] = useState(false);

  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(parseInt(e.target.value));
  }

  return (
    <Container
      onMouseEnter={() => setIsVolumeHovered(true)}
      onMouseLeave={() => setIsVolumeHovered(false)}
    >
      <IconButton icon={isHover ? SoundOnSvg : SoundOffSvg} />
      <Popover>
        <Input
          type="range"
          min={0}
          max={100}
          value={volume}
          onChange={onValueChange}
        />
      </Popover>
    </Container>
  );
};

const Popover = styled.div`
  height: 12px;
  width: 64px;

  padding: 0 4px;

  position: absolute;
  transform: translate(-5px, calc(-100% - 10px));

  align-items: center;
  justify-content: center;

  display: none;

  border-radius: 4px;
  background-color: ${colors.gray700};
`;

const Container = styled.div`
  height: 100%;
  width: 38px;

  margin-right: -18px;

  display: flex;
  justify-items: center;
  align-items: center;

  &:hover ${Popover} {
    display: inherit;
  }
`;

const Input = styled.input<{ value: number }>`
  width: 100%;

  appearance: none;

  background: linear-gradient(
    to right,
    ${colors.blueGray25} 0%,
    ${colors.blueGray25} ${({ value }) => value}%,
    rgba(255, 255, 255, 0.4) ${({ value }) => value}%,
    rgba(255, 255, 255, 0.4) 100%
  );

  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    height: 5px;
    width: 5px;

    margin-top: -2px;
    border-radius: 3px;

    -webkit-appearance: none;

    cursor: pointer;
    background: ${colors.blueGray25};
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 1px;

    -webkit-appearance: none;

    cursor: pointer;
  }
`;

export default Volume;
