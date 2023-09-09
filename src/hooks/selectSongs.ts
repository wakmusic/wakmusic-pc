import { useCallback, useEffect, useState } from "react";

import { OrderedSongType, Song } from "@templates/song";

import { isUndefined } from "@utils/isTypes";

export const useSelectSongs = (songs?: Song[]) => {
  const [selected, setSelected] = useState<OrderedSongType[]>([]);
  const [prevSongs, setPrevSongs] = useState<OrderedSongType[]>([]);

  useEffect(() => {
    if (isUndefined(songs)) return;

    const newSelected = [...selected];
    selected.forEach((selectedItem, index) => {
      let itemIndex = -1;

      songs.forEach((songItem, compareIndex) => {
        const selectedSong: Song = selectedItem;
        console.log(songItem, selectedSong);
        if (songItem.songId === selectedSong.songId) {
          itemIndex = compareIndex;
        }
      });

      newSelected[index].index = itemIndex;
      console.log(itemIndex);
    });

    if (
      !newSelected.every(
        (value, index) =>
          JSON.stringify(value) === JSON.stringify(selected[index])
      )
    ) {
      newSelected.sort((a, b) => {
        if (isUndefined(a.index) || isUndefined(b.index)) return 0;
        return a.index - b.index;
      });

      setSelected(newSelected);
    }
  }, [songs, selected]);

  const selectCallback = (song: Song | Song[], index?: number) => {
    if (Array.isArray(song)) {
      if (
        selected.length === song.length &&
        selected.every((value, index) =>
          selectedIncludes(song[index], value.index)
        )
      ) {
        setSelected([]);
      } else {
        const newSelected: OrderedSongType[] = song.map((item, index) => ({
          ...item,
          index: index,
        }));

        setSelected(newSelected);
      }

      return;
    }

    if (isUndefined(index)) return;

    const item: OrderedSongType = {
      ...song,
      index: index,
    };

    if (selectedIncludes(song, index)) {
      const newSelected = selected.slice();
      let selectedIndex = -1;

      selected.forEach((value, index) => {
        if (JSON.stringify(value) === JSON.stringify(item)) {
          selectedIndex = index;
        }
      });

      newSelected.splice(selectedIndex, 1);

      setSelected(newSelected);
    } else {
      const newSelected = selected.slice();
      newSelected.push(item);

      setSelected(newSelected);
    }
  };

  const selectedIncludes = useCallback(
    (song: Song, index?: number) =>
      !selected.every(
        (value) =>
          JSON.stringify(value) !==
          JSON.stringify({
            ...song,
            index: index,
          })
      ),
    [selected]
  );

  return { selected, setSelected, selectCallback, selectedIncludes };
};
