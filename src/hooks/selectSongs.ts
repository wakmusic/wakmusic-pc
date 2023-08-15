import { useState } from "react";

import { Song } from "@templates/song";

export const useSelectSongs = () => {
  const [selected, setSelected] = useState<Song[]>([]);

  const selectCallback = (song: Song | Song[]) => {
    if (Array.isArray(song)) {
      const _song = song
        .slice()
        .sort((a, b) =>
          a.songId < b.songId ? -1 : a.songId == b.songId ? 0 : 1
        );
      const _selected = selected
        .slice()
        .sort((a, b) =>
          a.songId < b.songId ? -1 : a.songId == b.songId ? 0 : 1
        );

      if (
        _selected.length === _song.length &&
        _selected.every((value, index) => value === _song[index])
      ) {
        setSelected([]);
      } else {
        setSelected(song);
      }

      return;
    }

    if (selected.includes(song)) {
      setSelected(selected.filter((s) => s !== song));
    } else {
      setSelected([...selected, song]);
    }
  };

  return { selected, setSelected, selectCallback };
};
