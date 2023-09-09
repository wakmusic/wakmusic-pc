import { useCallback, useEffect, useState } from "react";

import { OrderedSongType, Song } from "@templates/song";

import { isUndefined } from "@utils/isTypes";

export const useSelectSongs = (songs: Song[]) => {
  const [selected, setSelected] = useState<OrderedSongType[]>([]);

  useEffect(() => {
    // select만 바뀐경우, songs의 곡이 삭제된 경우
    selected.forEach((item) => {
      item.index = songs.findIndex((song) => song.songId === item.songId);
    });
  }, [songs, selected]);

  const selectCallback = (song: Song | Song[], index?: number) => {
    if (Array.isArray(song)) {
      const newSelected: OrderedSongType[] = [];

      song.forEach((item) => {
        if (selectedIncludes(item)) {
          return;
        }

        newSelected.push({
          ...item,
          index: songs.findIndex((value) => value.songId === item.songId),
        });
      });

      setSelected(newSelected);
      return;
    }

    if (isUndefined(index)) return;

    const newSelected = [...selected];
    const songIndex = selected.findIndex(
      (value) => value.songId === song.songId
    );

    if (songIndex === -1) {
      newSelected.push({
        ...song,
        index: index,
      });
    } else {
      newSelected.splice(songIndex, 1);
    }

    setSelected(newSelected);
  };

  const selectedIncludes = useCallback(
    (song: Song) =>
      selected.findIndex((value) => value.songId === song.songId) !== -1,
    [selected]
  );

  return { selected, setSelected, selectCallback, selectedIncludes };
};
