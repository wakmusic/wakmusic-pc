import styled from "styled-components/macro";

import { ReactComponent as SoundOffSvg } from "@assets/icons/ic_20_sound_off.svg";
import { ReactComponent as SoundOn50Svg } from "@assets/icons/ic_20_sound_on_50.svg";
import { ReactComponent as SoundOn100Svg } from "@assets/icons/ic_20_sound_on_100.svg";
import { ReactComponent as VolumeSvg } from "@assets/svgs/volume.svg";

import SimpleIconButton from "@components/globals/SimpleIconButton";

import colors from "@constants/colors";

interface VolumeProps {
  volume: number;
  isMute: boolean;
  onChange: (value: number) => void;
  onIsMuteChange: (value: boolean) => void;
}

const Volume = ({ volume, isMute, onChange, onIsMuteChange }: VolumeProps) => {
  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);

    onChange(value);

    if (isMute && value !== 0) {
      onIsMuteChange(false);
    }
  }

  function getVolumeIcon() {
    if (isMute || volume === 0) {
      return SoundOffSvg;
    }

    if (volume < 50) {
      return SoundOn50Svg;
    }

    return SoundOn100Svg;
  }

  return (
    <Container>
      <SimpleIconButton
        icon={getVolumeIcon()}
        onClick={() => onIsMuteChange(!isMute)}
      />
      <Popover>
        <VolumeSvg />
        <Input
          type="range"
          min={0}
          max={100}
          value={isMute ? 0 : volume}
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
