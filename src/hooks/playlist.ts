import { playlistState } from "@state/playlist/atoms";
import { useRecoilState } from "recoil";

export const usePlaylistState = () => {
  return useRecoilState(playlistState);
};
