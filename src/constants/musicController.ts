import deleteIcon from "@assets/icons/ic_24_delete.svg";
import musicPlay from "@assets/icons/ic_24_play_25.svg";
import playlistAdd from "@assets/icons/ic_24_play_add.svg";
import playAdd from "@assets/icons/ic_24_playadd_25.svg";

import {
  deleteMusic,
  playAddMusic,
  playMusic,
  playlistAddMusic,
} from "@utils/musicControllerFunctions";

interface controllType {
  name: string;
  img: string;
  method: (item?: any) => any;
}

export const musicControllerDataOne: controllType[] = [
  {
    name: "노래담기",
    img: playAdd,
    method: playAddMusic,
  },
  {
    name: "재생목록추가",
    img: playlistAdd,
    method: playlistAddMusic,
  },
  {
    name: "재생",
    img: musicPlay,
    method: playMusic,
  },
];

export const musicControllerDataTwo: controllType[] = [
  {
    name: "재생목록추가",
    img: playlistAdd,
    method: playlistAddMusic,
  },
  {
    name: "삭제",
    img: deleteIcon,
    method: deleteMusic,
  },
];
