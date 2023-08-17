import { userState } from "@state/user/atoms";
import { useRecoilState } from "recoil";

export const useUserState = () => {
  return useRecoilState(userState);
};
