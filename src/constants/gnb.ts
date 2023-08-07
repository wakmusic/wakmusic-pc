import { ReactComponent as ArtistSVG } from "@assets/icons/ic_40_artist_disabled.svg";
import { ReactComponent as ChartSVG } from "@assets/icons/ic_40_chart_disabled.svg";
import { ReactComponent as HomeSVG } from "@assets/icons/ic_40_home_disabled.svg";
import { ReactComponent as KeepSVG } from "@assets/icons/ic_40_keep_disabled.svg";
import { ReactComponent as SearchSVG } from "@assets/icons/ic_40_search_disabled.svg";
import artistLottie from "@assets/lotties/ic_artist.json";
import chartLottie from "@assets/lotties/ic_chart.json";
import homeLottie from "@assets/lotties/ic_home.json";
import keepLottie from "@assets/lotties/ic_keep.json";
import searchLottie from "@assets/lotties/ic_search.json";

export const SectionData = [
  { path: "/", name: "홈", icon: HomeSVG, lottie: homeLottie },
  { path: "/chart", name: "왁뮤차트", icon: ChartSVG, lottie: chartLottie },
  { path: "/new", name: "최신음악", icon: SearchSVG, lottie: searchLottie },
  { path: "/artists", name: "아티스트", icon: ArtistSVG, lottie: artistLottie },
  {
    path: "/user/playlists",
    name: "보관함",
    icon: KeepSVG,
    lottie: keepLottie,
  },
];
