import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as DocumentOffSvg } from "@assets/icons/ic_20_document_off.svg";
import { ReactComponent as DocumentOnSvg } from "@assets/icons/ic_20_document_on.svg";
import { ReactComponent as NextSvg } from "@assets/icons/ic_20_next_on.svg";
import { ReactComponent as PrevSvg } from "@assets/icons/ic_20_prev_on.svg";
import { ReactComponent as RandomOffSvg } from "@assets/icons/ic_20_random_off.svg";
import { ReactComponent as RandomOnSvg } from "@assets/icons/ic_20_random_on.svg";
import { ReactComponent as RepeatOffSvg } from "@assets/icons/ic_20_repeat_off.svg";
import { ReactComponent as RepeatOn1Svg } from "@assets/icons/ic_20_repeat_on_1.svg";
import { ReactComponent as RepeatOnAllSvg } from "@assets/icons/ic_20_repeat_on_all.svg";
import { ReactComponent as SoundOffSvg } from "@assets/icons/ic_20_sound_off.svg";
import { ReactComponent as SoundOnSvg } from "@assets/icons/ic_20_sound_on.svg";
import { ReactComponent as PlaySvg } from "@assets/icons/ic_30_play_25_point.svg";
import { ReactComponent as StopSvg } from "@assets/icons/ic_30_stop.svg";

import colors from "@constants/colors";

import { RepeatType } from "../../types/player";
import IconButton from "./IconButton";

interface ControllerProps {}

const Controller = ({}: ControllerProps) => {
  const [repeatType, setRepeatType] = useState(RepeatType.Off);
  const [isRandomOn, setIsRandomOn] = useState(false);
  const [isLyricOn, setIsLyricOn] = useState(false);
  const [isPlyaing, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  const [isVolumeHovered, setIsVolumeHovered] = useState(false);

  function onRepeatButtonClicked() {
    setRepeatType((repeatType + 1) % 3);
  }

  function onRandomButtonClicked() {
    setIsRandomOn(!isRandomOn);
  }

  function onLyricButtonClicked() {
    setIsLyricOn(!isLyricOn);
  }

  function onPlayStopButtonClicked() {
    setIsPlaying(!isPlyaing);
  }

  function onVolumeInputChanged(e: React.ChangeEvent<HTMLInputElement>) {
    setVolume(parseInt(e.target.value));
  }

  function movePrev() {}

  function moveNext() {}

  return (
    <Container>
      <VolumeContainer
        onMouseEnter={() => setIsVolumeHovered(true)}
        onMouseLeave={() => setIsVolumeHovered(false)}
      >
        <IconButton icon={isVolumeHovered ? SoundOnSvg : SoundOffSvg} />
        <VolumePopover>
          <VolumeInput
            type="range"
            min={0}
            max={100}
            value={volume}
            onChange={onVolumeInputChanged}
          />
        </VolumePopover>
      </VolumeContainer>
      <IconButton
        icon={
          repeatType === RepeatType.All
            ? RepeatOnAllSvg
            : repeatType === RepeatType.One
            ? RepeatOn1Svg
            : RepeatOffSvg
        }
        onClick={onRepeatButtonClicked}
      />
      <IconButton icon={PrevSvg} onClick={movePrev} />
      <IconButton
        icon={isPlyaing ? StopSvg : PlaySvg}
        onClick={onPlayStopButtonClicked}
      />
      <IconButton icon={NextSvg} onClick={moveNext} />
      <IconButton
        icon={isRandomOn ? RandomOnSvg : RandomOffSvg}
        onClick={onRandomButtonClicked}
      />
      <IconButton
        icon={isLyricOn ? DocumentOnSvg : DocumentOffSvg}
        onClick={onLyricButtonClicked}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  gap: 18px;
`;

const VolumePopover = styled.div`
  height: 12px;
  width: 74px;

  padding: 0 4px;

  position: absolute;
  transform: translate(-5px, calc(-100% - 10px));

  align-items: center;
  justify-content: center;

  display: none;

  border-radius: 4px;
  background-color: ${colors.gray700};
  opacity: 0.8;
`;

const VolumeContainer = styled.div`
  height: 100%;

  display: flex;
  justify-items: center;
  align-items: center;

  &:hover {
    ${VolumePopover} {
      display: inherit;
    }
  }
`;

const VolumeInput = styled.input`
  width: 100%;

  appearance: none;

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
    background: ${colors.blueGray25};
  }
`;

export default Controller;
