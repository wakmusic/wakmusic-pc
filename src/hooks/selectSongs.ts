import { useState } from "react";

import { Song } from "@templates/song";

export const useSelectSongs = () => {
  const [selected, setSelected] = useState<Song[]>([]);

  const selectCallback = (song: Song | Song[]) => {
    if (Array.isArray(song)) {
      if (selected === song) {
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
