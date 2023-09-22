import { atom } from "recoil";

import { Notice } from "@templates/notice";
import { Song } from "@templates/song";
import { CreditModalDetail } from "@templates/team";
import { UserProfile } from "@templates/user";

interface AddListModalState {
  isOpen: boolean;

  selected: Song[];

  resolve?: (value: boolean | undefined) => void;
}

export const addListModalState = atom<AddListModalState>({
  key: "addListModalState",
  default: {
    isOpen: false,
    selected: [],
  },
});

interface AlertModalState {
  isOpen: boolean;

  title?: string | null;
  children?: React.ReactNode;

  resolve?: () => void;
}

export const alertModalState = atom<AlertModalState>({
  key: "alertModalState",
  default: {
    isOpen: false,
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((value) => {
        if (!value.isOpen && value.resolve) {
          value.resolve();
          setSelf({ isOpen: false });
        }
      });
    },
  ],
});

interface ConfirmModalState {
  isOpen: boolean;

  title?: string;
  children?: React.ReactNode;

  value?: boolean | undefined;
  resolve?: (value: boolean | undefined) => void;
}

export const confirmModalState = atom<ConfirmModalState>({
  key: "confirmModalState",
  default: {
    isOpen: false,
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((value) => {
        if (!value.isOpen && value.resolve) {
          value.resolve(value.value);
          setSelf({ isOpen: false, value: undefined });
        }
      });
    },
  ],
});

export const noticeModalState = atom<boolean>({
  key: "noticeModalState",
  default: false,
});

interface ShareListModalState {
  isOpen: boolean;

  code?: string;
  resolve?: () => void;
}

export const shareListModalState = atom<ShareListModalState>({
  key: "shareListModalState",
  default: {
    isOpen: false,
  },
});

interface SetUsernameModalState {
  isOpen: boolean;
  name?: string;
  resolve?: (value: string | undefined) => void;
}

export const setUsernameModalState = atom<SetUsernameModalState>({
  key: "setUsernameModalState",
  default: {
    isOpen: false,
  },
});

interface ProfileModalState {
  isOpen: boolean;
  profile?: UserProfile | null;
  resolve?: (value: UserProfile | null) => void;
}

export const profileModalState = atom<ProfileModalState>({
  key: "profileModalState",
  default: {
    isOpen: false,
  },
  effects: [
    ({ onSet, setSelf }) => {
      onSet((value) => {
        if (!value.isOpen && value.resolve) {
          value.resolve(value.profile || null);
          setSelf({ isOpen: false });
        }
      });
    },
  ],
});

interface NoticeDetailModalState {
  isOpen: boolean;

  notice?: Notice;
}

export const noticeDetailModalState = atom<NoticeDetailModalState>({
  key: "noticeDetailModalState",
  default: {
    isOpen: false,
  },
});

export const loginModalState = atom<boolean>({
  key: "loginModalState",
  default: false,
});

interface LoadListModalState {
  isOpen: boolean;

  resolve?: (value: string | undefined) => void;
}

export const loadListModalState = atom<LoadListModalState>({
  key: "loadListModalState",
  default: {
    isOpen: false,
  },
});

interface ExitModalState {
  isOpen: boolean;

  isFirst?: boolean;
  resolve?: (value: "close" | "background" | null) => void;
}

export const exitModalState = atom<ExitModalState>({
  key: "exitModalState",
  default: {
    isOpen: false,
  },
});

interface CreateListModalState {
  isOpen: boolean;

  originalTitle?: string;
  resolve?: (value: string | undefined) => void;
}

export const createListModalState = atom<CreateListModalState>({
  key: "createListModalState",
  default: {
    isOpen: false,
  },
});

interface CreditModalState {
  isOpen: boolean;
  detail?: CreditModalDetail;
}

export const creditModalState = atom<CreditModalState>({
  key: "creditModalState",
  default: {
    isOpen: false,
  },
});
