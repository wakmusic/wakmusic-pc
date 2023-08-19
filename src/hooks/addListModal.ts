import { addListModalState } from "@state/addListModal/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";

import { PlaylistType } from "@templates/playlist";
import { Song } from "@templates/song";

import { useIsSpaceDisabled } from "./player";

export const useAddListModal = () => {
  const setState = useSetRecoilState(addListModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openAddListModal = (selected: Song[]) => {
    return new Promise<PlaylistType | undefined>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        selected,
        resolve,
      });
    });
  };

  return openAddListModal;
};

export const useAddListModalState = () => {
  return useRecoilState(addListModalState);
};
