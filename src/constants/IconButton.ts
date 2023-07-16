import { ReactComponent as playAll } from "@assets/icons/ic_24_play_all.svg";
import { ReactComponent as palyRandom } from "@assets/icons/ic_24_random_900.svg";

import iconButtonType from "../types/iconButtonType";

export const playButtonData: iconButtonType[] = [
  {
    icon: playAll,
    text: "전체재생",
  },
  {
    icon: palyRandom,
    text: "랜덤재생",
  },
];
