import { useCallback, useEffect, useState } from "react";

import { OrderedSongType, Song } from "@templates/song";

import { isUndefined } from "@utils/isTypes";

export const useSelectSongs = (songs: Song[]) => {
  const [selected, setSelected] = useState<OrderedSongType[]>([]);

  useEffect(() => {
    // select만 바뀐경우, songs의 곡이 삭제된 경우
    // selected.forEach((item) => {
    //   item.index = songs.findIndex((song) => song.songId === item.songId);
    // });
    console.log(selected);
  }, [songs, selected]);

  const findIndex = (from: Song[] | OrderedSongType[], songId: string) => {
    let index = -1;

    for (let target = 0; target < Math.ceil(from.length / 2); target++) {
      if (from[target].songId === songId) {
        index = target;
        break;
      }

      const targetOpposite = from.length - target - 1;
      if (targetOpposite != target && from[targetOpposite].songId === songId) {
        index = targetOpposite;
        break;
      }
    }

    return index;
  };

  const selectCallback = (song: Song | Song[], index?: number) => {
    if (Array.isArray(song)) {
      const newSelected: OrderedSongType[] = [];

      if (
        song.length === selected.length &&
        song.every((value) => findIndex(songs, value.songId) !== -1)
      ) {
        setSelected([]);
        return;
      }

      song.forEach((item) => {
        if (selectedIncludes(item)) {
          return;
        }

        newSelected.push({
          ...item,
          index: findIndex(song, item.songId),
        });
      });

      setSelected(newSelected);
      return;
    }

    if (isUndefined(index)) return;

    const newSelected = [...selected];
    const songIndex = findIndex(selected, song.songId);

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
    (song: Song) => findIndex(selected, song.songId) != -1,
    [selected]
  );

  return { selected, setSelected, selectCallback, selectedIncludes };
};
