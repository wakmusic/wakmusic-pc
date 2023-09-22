import { MouseEvent, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as SoundOffActivateSvg } from "@assets/icons/ic_20_sound_off_activate.svg";
import { ReactComponent as SoundOn50ActivateSvg } from "@assets/icons/ic_20_sound_on_50_activate.svg";
import { ReactComponent as SoundOn100ActivateSvg } from "@assets/icons/ic_20_sound_on_100_activate.svg";
import { ReactComponent as VolumeSvg } from "@assets/svgs/volume.svg";

import { T8Medium } from "@components/Typography";
import SimpleIconButton from "@components/globals/SimpleIconButton";

import colors from "@constants/colors";

interface VolumeProps {
  volume: number;
  isMute: boolean;
  onChange: (volume: number, isMute: boolean) => void;
}

const Volume = ({ volume, isMute, onChange }: VolumeProps) => {
  const [isChanging, setIsChanging] = useState(false);
  const [prvVolume, setPrvVolume] = useState(50);

  const [isActivate, setIsActivate] = useState(false);

  const [indicatorPosition, setIndicatorPosition] = useState(0);
  const sliderRef = useRef<HTMLInputElement>(null);

  function onClick() {
    if (isActivate) {
      onChange(volume, !isMute);
    } else {
      setIsActivate(true);
    }
  }

  function onHandleMouseUp() {
    setIsChanging(false);
  }

  function onContainerMouseUp(e: MouseEvent) {
    if (isActivate) {
      e.stopPropagation();
    }
  }

  function handleGlobalMouseUp() {
    setIsActivate(false);
  }

  function onValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = parseInt(e.target.value);

    if (!isChanging) {
      setIsChanging(true);
      setPrvVolume(volume);
    }

    if (value === 0) {
      onChange(prvVolume, true);
    } else {
      onChange(value, false);
    }

    updateIndicatorPosition(value);
  }

  function updateIndicatorPosition(value: number) {
    if (!sliderRef?.current) {
      return;
    }

    // 양쪽으로 slider thumb의 width 절반만큼씩 빼기
    setIndicatorPosition((sliderRef.current.clientWidth - 12) * (value / 100));
  }

  function getVolumeIcon() {
    if (isMute || volume === 0) {
      return SoundOffActivateSvg;
    }

    if (volume < 50) {
      return SoundOn50ActivateSvg;
    }

    return SoundOn100ActivateSvg;
  }

  useEffect(() => {
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  return (
    <Container onMouseUp={onContainerMouseUp}>
      <IconWrapper $activate={isActivate}>
        <SimpleIconButton icon={getVolumeIcon()} onClick={onClick} />
      </IconWrapper>
      <Popover $activate={isActivate}>
        <VolumeSvg />
        <Input
          type="range"
          min={0}
          max={100}
          value={isMute ? 0 : volume}
          onChange={onValueChange}
          onInput={onValueChange}
          onMouseUp={onHandleMouseUp}
          ref={sliderRef}
        />
        <VolumeIndicator $visible={isChanging} $left={indicatorPosition}>
          <T8Medium>{isMute ? 0 : volume}</T8Medium>
        </VolumeIndicator>
      </Popover>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;

  display: flex;
  justify-items: center;
  align-items: center;
`;

const IconWrapper = styled.div<{ $activate: boolean }>`
  path {
    stroke: ${colors.gray500};
  }

  &:hover {
    path {
      stroke: ${colors.blueGray25};
    }
  }

  ${({ $activate }) =>
    $activate &&
    css`
      path {
        stroke: ${colors.blueGray25};
      }
    `}
`;

const Popover = styled.div<{ $activate: boolean }>`
  position: absolute;
  transform: translateY(-100%);

  align-items: center;
  justify-content: center;

  display: ${({ $activate }) => ($activate ? "inherit" : "none")};
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

const VolumeIndicator = styled.div<{ $visible: boolean; $left: number }>`
  height: 18px;
  width: 24px;

  position: absolute;
  top: -16px;

  // left + (padding - (width / 2) + (sliderWidth / 2))
  left: ${({ $left }) => $left + 2}px;

  align-items: center;
  justify-content: center;

  display: ${({ $visible }) => ($visible ? "inherit" : "none")};

  border-radius: 4px;

  background-color: ${colors.gray400};
  color: ${colors.gray900};
`;

export default Volume;
