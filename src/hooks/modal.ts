import {
  addListModalState,
  alertModalState,
  confirmModalState,
  createListModalState,
  exitModalState,
  loadListModalState,
  loginModalState,
  noticeDetailModalState,
  noticeModalState,
  profileModalState,
  setUsernameModalState,
  shareListModalState,
} from "@state/modal/atoms";
import { userState } from "@state/user/atoms";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { Notice } from "@templates/notice";
import { Song } from "@templates/song";
import { UserProfile } from "@templates/user";

import { useIsSpaceDisabled } from "./player";

export const useAlertModal = () => {
  const setState = useSetRecoilState(alertModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openAlertModal = (title: string | null, children: React.ReactNode) => {
    return new Promise<void>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        title,
        children,
        resolve,
      });
    });
  };

  return openAlertModal;
};

export const useAlertModalState = () => {
  return useRecoilState(alertModalState);
};

export const useConfirmModal = () => {
  const setState = useSetRecoilState(confirmModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openConfirmModal = (title: string, children: React.ReactNode) => {
    return new Promise<boolean | undefined>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        title,
        children,
        resolve,
      });
    });
  };

  return openConfirmModal;
};

export const useConfirmModalState = () => {
  return useRecoilState(confirmModalState);
};

export const useCreateListModal = () => {
  const setState = useSetRecoilState(createListModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openCreateListModal = (
    originalTitle: string | undefined = undefined
  ) => {
    return new Promise<string | undefined>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        originalTitle,
        resolve,
      });
    });
  };

  return openCreateListModal;
};

export const useCreateListModalState = () => {
  return useRecoilState(createListModalState);
};

export const useExitModal = () => {
  const setState = useSetRecoilState(exitModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openExitModal = (isFirst = false) => {
    return new Promise<"close" | "background" | null>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        isFirst,
        resolve,
      });
    });
  };

  return openExitModal;
};

export const useExitModalState = () => {
  return useRecoilState(exitModalState);
};

export const useLoadListModal = () => {
  const setState = useSetRecoilState(loadListModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openLoadListModal = () => {
    return new Promise<string | undefined>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        resolve,
      });
    });
  };

  return openLoadListModal;
};

export const useLoadListModalState = () => {
  return useRecoilState(loadListModalState);
};

export const useLoginModalState = () => {
  return useRecoilState(loginModalState);
};

export const useLoginModalOpener = () => {
  const setIsOpen = useSetRecoilState(loginModalState);
  const user = useRecoilValue(userState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  return (state?: boolean) => {
    if (user) return false;

    setIsSpaceDisabled(true);
    setIsOpen(state ?? true);

    return true;
  };
};

export const useNoticeModalState = () => {
  return useRecoilState(noticeModalState);
};

export const useNoticeDetailModal = () => {
  const setState = useSetRecoilState(noticeDetailModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openNoticeDetailModal = (notice: Notice) => {
    setIsSpaceDisabled(true);
    setState({
      isOpen: true,
      notice,
    });
  };

  return openNoticeDetailModal;
};

export const useNoticeDetailModalState = () => {
  return useRecoilState(noticeDetailModalState);
};

export const useAddListModal = () => {
  const setState = useSetRecoilState(addListModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openAddListModal = (selected: Song[]) => {
    return new Promise<boolean | undefined>((resolve) => {
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

export const useShareListModal = () => {
  const setState = useSetRecoilState(shareListModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openLoadListModal = (code: string) => {
    return new Promise<void>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        code,
        resolve,
      });
    });
  };

  return openLoadListModal;
};

export const useShareListModalState = () => {
  return useRecoilState(shareListModalState);
};

export const useSetUsernameModal = () => {
  const setState = useSetRecoilState(setUsernameModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openSetUsernameModal = (name: string) => {
    return new Promise<string | undefined>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        name,
        resolve,
      });
    });
  };

  return openSetUsernameModal;
};

export const useSetUsernameModalState = () => {
  return useRecoilState(setUsernameModalState);
};

export const useSelectProfileModal = () => {
  const setState = useSetRecoilState(profileModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openProfileModal = (profile?: UserProfile) => {
    return new Promise<UserProfile | null>((resolve) => {
      setIsSpaceDisabled(true);
      setState({
        isOpen: true,
        profile,
        resolve,
      });
    });
  };

  return openProfileModal;
};

export const useSelectProfileModalState = () => {
  return useRecoilState(profileModalState);
};
