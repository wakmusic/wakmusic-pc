import checkOff from "@assets/icons/ic_24_Check_off.svg";
import checkOn from "@assets/icons/ic_24_Check_on.svg";
import deleteMusic from "@assets/icons/ic_24_delete.svg";
import musicPlay from "@assets/icons/ic_24_play_25.svg";
import playlistAdd from "@assets/icons/ic_24_play_add.svg";
import playAdd from "@assets/icons/ic_24_playadd_25.svg";

interface controllType {
  name: string;
  selectName?: string;
  img: string;
  selectImg?: string;
  id: string;
}

const musicControllerDataOne: controllType[] = [
  {
    name: "전체선택",
    selectName: "선택헤제",
    img: checkOff,
    selectImg: checkOn,
    id: "",
  },
  {
    name: "노래담기",
    img: playAdd,
    id: "",
  },
  {
    name: "재생목록추가",
    img: playlistAdd,
    id: "",
  },
  {
    name: "재생",
    img: musicPlay,
    id: "",
  },
];

const musicControllerDataTwo: controllType[] = [
  {
    name: "전체선택",
    selectName: "선택헤제",
    img: checkOff,
    selectImg: checkOn,
    id: "",
  },
  {
    name: "노래담기",
    img: playAdd,
    id: "",
  },
  {
    name: "재생목록추가",
    img: playlistAdd,
    id: "",
  },
  {
    name: "재생",
    img: musicPlay,
    id: "",
  },
];
