import { useEffect, useState } from "react";
import styled from "styled-components/macro";

import AddPlaylist from "@components/globals/musicControllers/AddPlaylist";
import DeleteMusic from "@components/globals/musicControllers/DeleteMusic";
import SelectAll from "@components/globals/musicControllers/SelectAll";
import MusicControllerBar from "@components/globals/musicControllers/musicControllerContainers/MusicControllerBar";

import { usePlaySongs } from "@hooks/player";

import { PlaylistType } from "@templates/playlist";

interface ListControllerProps {
  hide?: boolean;

  playlists: PlaylistType[];
  selectedPlaylists: PlaylistType[];

  dispatchSelectedPlaylists: (playlists: PlaylistType[]) => void;
  onDelete?: (playlists: PlaylistType[]) => void;
}

const ListController = ({
  hide = false,
  playlists,
  selectedPlaylists,
  dispatchSelectedPlaylists,
  onDelete,
}: ListControllerProps) => {
  const [showControllerState, setShowControllerState] = useState(false);
  const [popdown, setPopdown] = useState(false);

  const [selectedLength, setSelectedLength] = useState(
    selectedPlaylists.length
  );

  const playSongs = usePlaySongs();

  useEffect(() => {
    // 컨트롤러 애니메이션 토글
    if (selectedPlaylists.length === 0 || hide) {
      setPopdown(true);
      return;
    }

    if (selectedPlaylists.length > 0 || (selectedPlaylists && !hide)) {
      setPopdown(false);
      setShowControllerState(true);
    }
  }, [hide, selectedPlaylists]);

  useEffect(() => {
    if (selectedPlaylists.length < 1) return;

    setSelectedLength(selectedPlaylists.length);
  }, [selectedPlaylists.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        dispatchSelectedPlaylists([]);
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [dispatchSelectedPlaylists]);

  return (
    <Container $display={showControllerState}>
      <MusicControllerBar count={selectedLength} popdown={popdown}>
        <SelectAll
          isSelect={selectedLength === playlists.length}
          onClick={() => {
            if (selectedLength === playlists.length) {
              dispatchSelectedPlaylists([]);
              return;
            }

            dispatchSelectedPlaylists(playlists);
          }}
        />

        <AddPlaylist
          onClick={() => {
            const songs = selectedPlaylists
              .map((playlist) => playlist.songs)
              .flat();

            console.log(songs);

            playSongs(songs, false, false);
            dispatchSelectedPlaylists([]);
          }}
        />

        <DeleteMusic
          onClick={() => {
            dispatchSelectedPlaylists([]);

            onDelete && onDelete(selectedPlaylists);
          }}
        />
      </MusicControllerBar>
    </Container>
  );
};

const Container = styled.div<{ $display: boolean }>`
  display: ${({ $display }) => ($display ? "block" : "none")};
`;

export default ListController;
