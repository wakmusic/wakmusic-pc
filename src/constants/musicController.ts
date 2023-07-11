import deletIcon from "@assets/icons/ic_24_delete.svg";
import musicPlay from "@assets/icons/ic_24_play_25.svg";
import playlistAdd from "@assets/icons/ic_24_play_add.svg";
import playAdd from "@assets/icons/ic_24_playadd_25.svg";

import {
  deleteMusic,
  playAddMusic,
  playMusic,
  playlistAddMusic,
  selectAllMusic,
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

// const musicControllerDataTwo: controllType[] = [
//   {
//     name: "전체선택",
//     selectName: "선택헤제",
//     img: checkOff,
//     selectImg: checkOn,
//     method: "",
//   },
//   {
//     name: "노래담기",
//     img: playAdd,
//     method: "",
//   },
//   {
//     name: "재생목록추가",
//     img: playlistAdd,
//     method: "",
//   },
//   {
//     name: "재생",
//     img: musicPlay,
//     method: "",
//   },
// ];
