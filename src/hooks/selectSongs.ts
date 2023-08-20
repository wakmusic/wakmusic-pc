import { useCallback, useState } from "react";

import { OrderdSongType, Song } from "@templates/song";

import { isUndefined } from "@utils/isTypes";

export const useSelectSongs = () => {
  const [selected, setSelected] = useState<OrderdSongType[]>([]);

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
        const newSelected: OrderdSongType[] = song.map((item, index) => ({
          ...item,
          index: index,
        }));

        setSelected(newSelected);
      }

      return;
    }

    if (isUndefined(index)) return;

    const item: OrderdSongType = {
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
      newSelected.sort((a, b) => a.index - b.index);

      setSelected(newSelected);
    }
  };

  const selectedIncludes = useCallback(
    (song: Song, index: number) =>
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
