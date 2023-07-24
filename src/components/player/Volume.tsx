import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as SoundOffSvg } from "@assets/icons/ic_20_sound_off.svg";
import { ReactComponent as SoundOnSvg } from "@assets/icons/ic_20_sound_on.svg";
import { ReactComponent as VolumeSvg } from "@assets/svgs/volume.svg";

import colors from "@constants/colors";

import IconButton from "../globals/IconButton";

interface VolumeProps {
  volume: number;
  onChange: (value: number) => void;
}

const Volume = ({ volume, onChange }: VolumeProps) => {
  const [isHover, setIsHover] = useState(false);

  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    onChange(parseInt(e.target.value));
  }

  return (
    <Container
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <IconButton icon={isHover ? SoundOnSvg : SoundOffSvg} />
      <Popover>
        <VolumeSvg />
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
  position: absolute;
  transform: translateY(-100%);

  align-items: center;
  justify-content: center;

  display: none;
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
  position: absolute;
  width: 104px;

  top: calc(50% - 3px);

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
    height: 12px;
    width: 12px;

    margin-top: -5px;
    border-radius: 50%;

    -webkit-appearance: none;

    cursor: pointer;
    background: ${colors.blueGray25};
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;

    -webkit-appearance: none;

    cursor: pointer;
  }
`;

export default Volume;
