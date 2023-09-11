import { useCallback, useEffect, useState } from "react";

import { Song } from "@templates/song";

import { isNull } from "@utils/isTypes";

export const useSelectSongs = (songs: Song[]) => {
  const [prevSongs, setPrevSongs] = useState(songs);
  const [selected, setSelected] = useState<Song[]>([]);

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

  const selectCallback = (song: Song) => {
    const newSelected = [...selected];
    const songIndex = findIndex(selected, song.songId);

    if (songIndex === -1) {
      insertSong(newSelected, song);
    } else {
      newSelected.splice(songIndex, 1);
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

  useEffect(() => {
    if (
      selected.length === 0 ||
      (songs.length === prevSongs.length &&
        songs.every((value) => findIndex(prevSongs, value.songId) != -1))
    ) {
      return;
    }

    if (prevSongs.length === 0) {
      // api에서 로딩이 끝난 경우
      setPrevSongs(songs);
      return;
    }

    setSelected([]);
    setPrevSongs(songs);
  }, [songs, prevSongs, selected]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return {
    selected,
    setSelected,
    selectCallback,
    selectManyCallback,
    selectedIncludes,
  };
};
