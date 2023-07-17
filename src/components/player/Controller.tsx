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
import { ReactComponent as PlaySvg } from "@assets/icons/ic_30_play_25_point.svg";
import { ReactComponent as StopSvg } from "@assets/icons/ic_30_stop.svg";

import { RepeatType } from "../../types/player";
import IconButton from "./IconButton";
import Volume from "./Volume";

interface ControllerProps {}

const Controller = ({}: ControllerProps) => {
  const [repeatType, setRepeatType] = useState(RepeatType.Off);
  const [isRandomOn, setIsRandomOn] = useState(false);
  const [isLyricOn, setIsLyricOn] = useState(false);
  const [isPlyaing, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);

  function onRepeatStateChange() {
    setRepeatType((repeatType + 1) % 3);
  }

  function onRandomStateChange() {
    setIsRandomOn(!isRandomOn);
  }

  function onLyricStateChange() {
    setIsLyricOn(!isLyricOn);
  }

  function onPlayStateChange() {
    setIsPlaying(!isPlyaing);
  }

  function onVolumeChange(value: number) {
    setVolume(value);
  }

  function movePrev() {}

  function moveNext() {}

  return (
    <Container>
      <Volume volume={volume} onChange={onVolumeChange} />
      <IconButton
        icon={
          repeatType === RepeatType.All
            ? RepeatOnAllSvg
            : repeatType === RepeatType.One
            ? RepeatOn1Svg
            : RepeatOffSvg
        }
        onClick={onRepeatStateChange}
      />
      <IconButton icon={PrevSvg} onClick={movePrev} />
      <IconButton
        icon={isPlyaing ? StopSvg : PlaySvg}
        onClick={onPlayStateChange}
      />
      <IconButton icon={NextSvg} onClick={moveNext} />
      <IconButton
        icon={isRandomOn ? RandomOnSvg : RandomOffSvg}
        onClick={onRandomStateChange}
      />
      <IconButton
        icon={isLyricOn ? DocumentOnSvg : DocumentOffSvg}
        onClick={onLyricStateChange}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  gap: 18px;
`;

export default Controller;
