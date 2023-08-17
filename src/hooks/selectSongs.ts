import { useState } from "react";

import { Song } from "@templates/song";

export const useSelectSongs = () => {
  const [selected, setSelected] = useState<Song[]>([]);

  const selectCallback = (song: Song) => {
    if (selected.includes(song)) {
      setSelected(selected.filter((s) => s !== song));
    } else {
      setSelected([...selected, song]);
    }
  };

  return { selected, setSelected, selectCallback };
};
