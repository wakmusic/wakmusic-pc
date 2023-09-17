import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";

import { useAddListModal } from "@hooks/addListModal";
import { useLoginModalOpener } from "@hooks/loginModal";
import { usePlaySongs } from "@hooks/player";
import { useToast } from "@hooks/toast";
import { useUserState } from "@hooks/user";

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

  dispatchSelectedSongs: (song: Song[]) => void;
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

  const [selectedLength, setSelectedLength] = useState(selectedSongs.length);
  const [popdown, setPopdown] = useState(false);
  const openLoginModal = useLoginModalOpener();
  const openAddListModal = useAddListModal();
  const playSongs = usePlaySongs();
  const location = useLocation();
  const [user] = useUserState();
  const toast = useToast();

  const getControllerComponent = useCallback(
    (feature: ControllerFeature, key: number) => {
      switch (feature) {
        case ControllerFeature.selectAll:
          return (
            <SelectAll
              isSelect={selectedLength === songs.length}
              onClick={() => {
                dispatchSelectedSongs(songs);
              }}
              key={key}
            />
          );
        case ControllerFeature.addMusic:
          if (!user && location.pathname === "/player") return null;

          return (
            <AddMusic
              key={key}
              onClick={async () => {
                if (!user) {
                  openLoginModal();
                  return;
                }

                if (location.pathname === "/player") {
                  const win = open(
                    "/addList",
                    "_blank",
                    "width=440,height=500,frame=false"
                  );

                  if (win) {
                    win.addEventListener("message", (e) => {
                      if (e.data === "ready") {
                        win.postMessage({
                          type: "setSongs",
                          data: selectedSongs,
                        });
                      }

                      if (e.data === "resolve") {
                        dispatchSelectedSongs([]);
                      }
                    });
                  }

                  return;
                }

                const success = await openAddListModal(selectedSongs);

                if (success) {
                  toast(`${selectedSongs.length}곡을 추가하였습니다.`);
                } else if (success === false) {
                  toast("오류가 발생하였습니다.");
                }

                dispatchSelectedSongs(selectedSongs);
              }}
            />
          );
        case ControllerFeature.addToList:
          return (
            <AddPlaylist
              onClick={() => {
                playSongs(selectedSongs, false, false);
                dispatchSelectedSongs(selectedSongs);
              }}
              key={key}
            />
          );
        case ControllerFeature.play:
          return (
            <PlayMusic
              onClick={() => {
                playSongs(selectedSongs);
                dispatchSelectedSongs(selectedSongs);
              }}
              key={key}
            />
          );
        case ControllerFeature.delete:
          return (
            <DeleteMusic
              onClick={() => {
                const newSongs = [...songs];

                selectedSongs.forEach((item) => {
                  newSongs.splice(
                    newSongs.findIndex((song) => song.songId === item.songId),
                    1
                  );
                });

                dispatchSelectedSongs(selectedSongs);

                onDelete && onDelete(newSongs);
              }}
              key={key}
            />
          );
      }
    },
    [
      dispatchSelectedSongs,
      location.pathname,
      onDelete,
      openAddListModal,
      openLoginModal,
      playSongs,
      selectedLength,
      selectedSongs,
      songs,
      toast,
      user,
    ]
  );

  useEffect(() => {
    if (selectedSongs.length < 1 && !displayDefault) return;

    setSelectedLength(selectedSongs.length);
  }, [displayDefault, selectedSongs.length]);

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
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        dispatchSelectedSongs(selectedSongs);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [dispatchSelectedSongs, selectedSongs]);

  return (
    <Container $display={showControllerState}>
      <Controller count={selectedLength} popdown={popdown}>
        {" "}
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
