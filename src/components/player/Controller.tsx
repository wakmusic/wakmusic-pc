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

import {
  useControlState,
  useSetVolumeState,
  useToggleIsLyricsOnState,
  useToggleIsPlayingState,
  useToggleIsRandomState,
  useToggleRepeatTypeState,
} from "@hooks/player";

import { RepeatType } from "@templates/player";

import IconButton from "./IconButton";
import Volume from "./Volume";

interface ControllerProps {}

const Controller = ({}: ControllerProps) => {
  const [controlState] = useControlState();

  const setVolumeState = useSetVolumeState();
  const toggleRepeatTypeState = useToggleRepeatTypeState();
  const toggleIsPlayingState = useToggleIsPlayingState();
  const toggleIsRandomState = useToggleIsRandomState();
  const toggleIsLyricsOnState = useToggleIsLyricsOnState();

  function onVolumeChange(value: number) {
    setVolumeState(value);
  }

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function movePrev() {}

  // TODO
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function moveNext() {}

  function getRepeatIcon() {
    switch (controlState.repeatType) {
      case RepeatType.All:
        return RepeatOnAllSvg;
      case RepeatType.One:
        return RepeatOn1Svg;
      default:
        return RepeatOffSvg;
    }
  }

  return (
    <Container>
      <Volume volume={controlState.volume} onChange={onVolumeChange} />
      <IconButton icon={getRepeatIcon()} onClick={toggleRepeatTypeState} />
      <IconButton icon={PrevSvg} onClick={movePrev} />
      <IconButton
        icon={controlState.isPlaying ? StopSvg : PlaySvg}
        onClick={toggleIsPlayingState}
      />
      <IconButton icon={NextSvg} onClick={moveNext} />
      <IconButton
        icon={controlState.isRandom ? RandomOnSvg : RandomOffSvg}
        onClick={toggleIsRandomState}
      />
      <IconButton
        icon={controlState.isLyricsOn ? DocumentOnSvg : DocumentOffSvg}
        onClick={toggleIsLyricsOnState}
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
