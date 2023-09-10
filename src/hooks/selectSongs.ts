import { useCallback, useEffect, useState } from "react";

import { OrderedSongType, Song } from "@templates/song";

import { isUndefined } from "@utils/isTypes";

export const useSelectSongs = (songs: Song[]) => {
  const [prevSongs, setPrevSongs] = useState(songs);
  const [selected, setSelected] = useState<OrderedSongType[]>([]);

  const findIndex = (from: Song[] | OrderedSongType[], songId: string) => {
    let index = -1;

    for (let target = 0; target < Math.ceil(from.length / 2); target++) {
      if (from[target].songId === songId) {
        index = target;
        break;
      }

      const targetOpposite = from.length - target - 1;
      if (targetOpposite !== target && from[targetOpposite].songId === songId) {
        index = targetOpposite;
        break;
      }
    }

    return index;
  };

  const selectCallback = (song: Song, index?: number) => {
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

    newSelected.sort((a, b) => a.index - b.index);
    setSelected(newSelected);
  };

  const selectManyCallback = (song: Song[]) => {
    if (
      song.length === selected.length &&
      song.every((value) => selectedIncludes(value))
    ) {
      setSelected([]);
      return;
    }

    const newSelected = [...selected];

    song.forEach((item) => {
      if (selectedIncludes(item)) {
        return;
      }

      newSelected.push({
        ...item,
        index: findIndex(songs, item.songId),
      });
    });

    newSelected.sort((a, b) => a.index - b.index);
    setSelected(newSelected);
  };

  const selectedIncludes = useCallback(
    (song: Song) => findIndex(selected, song.songId) != -1,
    [selected]
  );

  useEffect(() => {
    if (
      songs.length === prevSongs.length &&
      songs.every((value, index) => value.songId === prevSongs[index].songId)
    ) {
      return;
    }

    const newSelected = [...selected];

    if (songs.length !== prevSongs.length) {
      // 곡이 삭제된 경우
      selected.forEach((item) => {
        if (findIndex(songs, item.songId) === -1) {
          newSelected.splice(findIndex(newSelected, item.songId), 1);
        }
      });
    } else {
      // 곡의 순서가 변경된 경우
      newSelected.forEach((item) => {
        item.index = findIndex(songs, item.songId);
      });
    }

    newSelected.sort((a, b) => a.index - b.index);
    setSelected(newSelected);

    setPrevSongs(songs);
  }, [songs, prevSongs, selected]);

  return {
    selected,
    setSelected,
    selectCallback,
    selectManyCallback,
    selectedIncludes,
  };
};
