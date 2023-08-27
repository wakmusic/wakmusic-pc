import { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components/macro";

import { useControlState, usePlayingInfoState } from "@hooks/player";

import { ControllerFeature } from "@templates/musicController";
import { Song } from "@templates/song";

import AddMusic from "./AddMusic";
import AddPlaylist from "./AddPlaylist";
import DeleteMusic from "./DeleteMusic";
import PlayMusic from "./PlayMusic";
import SelectAll from "./SelectAll";
import MusicControllerBar from "./musicControllerContainers/MusicControllerBar";
import MusicControllerPlayer from "./musicControllerContainers/MusicControllerPlayer";

interface MusicControllerProps {
  displayDefault?: boolean;
  hide?: boolean;

  player?: boolean;
  features?: ControllerFeature[];

  songs: Song[];
  selectedSongs: Song[];

  dispatchSelectedSongs: (song: Song | Song[]) => void;
  onDelete?: (newSongs: Song[]) => void;
}

const MusicController = ({
  displayDefault = false,
  hide = false,
  player = false,
  features = [
    ControllerFeature.selectAll,
    ControllerFeature.addMusic,
    ControllerFeature.addToList,
    ControllerFeature.play,
  ],
  songs,
  selectedSongs,
  dispatchSelectedSongs,
  onDelete,
}: MusicControllerProps) => {
  const Controller = useMemo(
    () => (player ? MusicControllerPlayer : MusicControllerBar),
    [player]
  );
  const [showControllerState, setShowControllerState] =
    useState(displayDefault);
  const [popdown, setPopdown] = useState(false);

  const [, setPlayingInfo] = usePlayingInfoState();
  const [, setControlState] = useControlState();

  const [selectedLength, setSelectedLength] = useState(selectedSongs.length);

  const addSongs = useCallback(
    (list: Song[], play?: boolean) => {
      // 재생목록에 노래 추가
      setPlayingInfo((prev) => ({
        playlist: [...prev.playlist, ...list],
        history: [],
        current: play ? prev.playlist.length : prev.current,
      }));

      if (!play) return;
      setControlState((prev) => ({
        ...prev,
        isPlaying: true,
      }));
    },
    [setControlState, setPlayingInfo]
  );

  const getControllerComponent = useCallback(
    (feature: ControllerFeature, key: number) => {
      switch (feature) {
        case ControllerFeature.selectAll:
          return (
            <SelectAll
              isSelect={false}
              onClick={() => {
                dispatchSelectedSongs(songs);
              }}
              key={key}
            />
          );
        case ControllerFeature.addMusic:
          // 플레이리스트에 노래 추가
          return <AddMusic key={key} />;
        case ControllerFeature.addToList:
          return (
            <AddPlaylist
              onClick={() => {
                addSongs(selectedSongs);
                dispatchSelectedSongs([]);
              }}
              key={key}
            />
          );
        case ControllerFeature.play:
          return (
            <PlayMusic
              onClick={() => {
                addSongs(selectedSongs, true);
                dispatchSelectedSongs([]);
              }}
              key={key}
            />
          );
        case ControllerFeature.delete:
          return (
            <DeleteMusic
              onClick={() => {
                const newSongs = songs.slice();

                selectedSongs.forEach((item) => {
                  newSongs.splice(
                    newSongs.findIndex((song) => song.songId === item.songId),
                    1
                  );
                });

                dispatchSelectedSongs([]);

                onDelete && onDelete(newSongs);
              }}
            />
          );
      }
    },
    [addSongs, songs, selectedSongs, dispatchSelectedSongs, onDelete]
  );

  useEffect(() => {
    // 컨트롤러 애니메이션 토글
    if ((selectedSongs.length === 0 && !displayDefault) || hide) {
      setPopdown(true);
      return;
    }

    if (selectedSongs.length > 0 || (displayDefault && !hide)) {
      setPopdown(false);
      setShowControllerState(true);
    }
  }, [showControllerState, setPopdown, displayDefault, selectedSongs, hide]);

  useEffect(() => {
    if (selectedSongs.length < 1 && !displayDefault) return;

    setSelectedLength(selectedSongs.length);
  }, [displayDefault, selectedSongs.length]);

  return (
    <Container $display={showControllerState}>
      <Controller count={selectedLength} popdown={popdown}>
        {features.map(getControllerComponent)}
        {onDelete && getControllerComponent(ControllerFeature.delete, -1)}
      </Controller>
    </Container>
  );
};

const Container = styled.div<{ $display: boolean }>`
  display: ${({ $display }) => ($display ? "block" : "none")};
`;

export default MusicController;
