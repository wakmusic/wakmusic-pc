import { useCallback, useState } from "react";

import { Song } from "@templates/song";

import { isNull } from "@utils/isTypes";

export const useSelectSongs = (songs: Song[]) => {
  const [selected, setSelected] = useState<Song[]>([]);

  const [lastSelected, setLastSelected] = useState(-1);

  const findIndex = (from: Song[], songId: string) => {
    return from.findIndex((value) => value.songId === songId);
  };

  const insertSong = (to: Song[], song: Song) => {
    const insertIndex = findIndex(songs, song.songId);

    if (to.length === 0) {
      to.push(song);
      return;
    }

    for (let i = 0; i < to.length; i++) {
      const itemIndex = findIndex(songs, to[i].songId);

      if (i === to.length - 1 && itemIndex <= insertIndex) {
        to.push(song);
        break;
      }

      if (itemIndex <= insertIndex) continue;

      to.splice(i, 0, song);
      break;
    }
  };

  const selectCallback = (song: Song, shift = false) => {
    const newSelected = [...selected];
    const songSelectedIndex = findIndex(selected, song.songId);
    const songIndex = findIndex(songs, song.songId);

    if (
      shift &&
      lastSelected !== -1 &&
      Math.abs(songIndex - lastSelected) !== 1
    ) {
      if (lastSelected > songIndex) {
        selectManyCallback(songs.slice(songIndex, lastSelected + 1));
      } else {
        selectManyCallback(songs.slice(lastSelected, songIndex + 1));
      }

      setLastSelected(songIndex);
      return;
    }

    if (songSelectedIndex === -1) {
      setLastSelected(songIndex);
      insertSong(newSelected, song);
    } else {
      setLastSelected(-1);
      newSelected.splice(songSelectedIndex, 1);
    }

    setSelected(newSelected);
  };

  const selectManyCallback = (song: Song[]) => {
    if (
      song.length === selected.length &&
      song.every((value, i) => value.songId === selected[i].songId)
    ) {
      setSelected([]);
      return;
    }

    const newSelected = [...selected];

    song.forEach((item) => {
      if (findIndex(newSelected, item.songId) !== -1) {
        return;
      }

      insertSong(newSelected, item);
    });

    setSelected(newSelected);
  };

  const selectedIncludes = useCallback(
    (song: Song) => !isNull(song) && findIndex(selected, song.songId) !== -1,
    [selected]
  );

  return {
    selected,
    setSelected,
    selectCallback,
    selectManyCallback,
    selectedIncludes,
  };
};
