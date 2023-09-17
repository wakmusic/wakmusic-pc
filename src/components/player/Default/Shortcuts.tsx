import { useCallback, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  useControlState,
  useIsSpaceDisabled,
  useNextSong,
  usePrevSong,
  useSetVolumeState,
  useToggleIsLyricsOnState,
  useToggleIsPlayingState,
  useToggleIsRandomState,
  useToggleRepeatTypeState,
  useVisualModeState,
} from "@hooks/player";
import { useToggleSeparateMode } from "@hooks/toggleSeparateMode";

interface ShortcutsProps {
  openVisualMode: () => Promise<void>;
}

const Shortcuts = ({ openVisualMode }: ShortcutsProps): null => {
  const [lastFCall, setLastFCall] = useState(0);

  const [control] = useControlState();
  const [visualModeState, setVisualMode] = useVisualModeState();
  const [isSpaceDisabled] = useIsSpaceDisabled();

  const setVolumeState = useSetVolumeState();
  const toggleRepeatTypeState = useToggleRepeatTypeState();
  const toggleIsPlayingState = useToggleIsPlayingState();
  const toggleIsRandomState = useToggleIsRandomState();
  const toggleIsLyricsOnState = useToggleIsLyricsOnState();
  const toggleSeparateMode = useToggleSeparateMode();

  const prevSong = usePrevSong();
  const nextSong = useNextSong();

  const location = useLocation();

  const shortcutHandler = useCallback(
    (e: KeyboardEvent) => {
      if (
        e.repeat ||
        isSpaceDisabled ||
        location.pathname === "/support" ||
        location.pathname === "/about"
      )
        return;

      if (e.ctrlKey) {
        return;
      }

      // 비주얼모드 토글
      if (
        e.code === "KeyF" &&
        lastFCall + 500 < Date.now() // 무지성 연타로 인해 UI 깨지는거 방지
      ) {
        if (visualModeState) {
          setVisualMode(false);
        } else {
          openVisualMode();
        }

        setLastFCall(Date.now());
      }

      // 비주얼모드 종료
      if (e.code === "Escape") {
        setVisualMode(false);
      }

      // 재생 / 일시정지
      if (e.code == "Space") {
        toggleIsPlayingState();
      }

      // 가사 토글
      if (e.code === "KeyL") {
        toggleIsLyricsOnState();
      }

      // 분리모드 토글
      if (e.code === "KeyI") {
        toggleSeparateMode();
      }

      // 음소거 토글
      if (e.code === "KeyM") {
        setVolumeState(control.volume, !control.isMute);
      }

      // 이전곡
      if (e.code === "KeyP" || e.code === "BracketLeft") {
        prevSong();
      }

      // 다음곡
      if (e.code === "KeyN" || e.code === "BracketRight") {
        nextSong();
      }

      // 반복모드 토글
      if (e.code === "KeyR") {
        toggleRepeatTypeState();
      }

      // 셔플모드 토글
      if (e.code === "KeyS") {
        toggleIsRandomState();
      }

      // 볼륨 조절
      if (e.code === "ArrowUp") {
        const newVolume = control.volume + 5;
        setVolumeState(newVolume > 100 ? 100 : newVolume, control.isMute);
      }

      if (e.code === "ArrowDown") {
        const newVolume = control.volume - 5;
        setVolumeState(newVolume < 0 ? 0 : newVolume, control.isMute);
      }

      e.preventDefault();
    },
    [
      control.isMute,
      control.volume,
      isSpaceDisabled,
      lastFCall,
      nextSong,
      openVisualMode,
      prevSong,
      setVisualMode,
      setVolumeState,
      toggleIsLyricsOnState,
      toggleIsPlayingState,
      toggleIsRandomState,
      toggleRepeatTypeState,
      toggleSeparateMode,
      visualModeState,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", shortcutHandler);

    return () => {
      window.removeEventListener("keydown", shortcutHandler);
    };
  }, [shortcutHandler]);

  return null;
};

export default Shortcuts;
