import { useCallback, useEffect } from "react";

import { fetchSong } from "@apis/songs";
import { fetchLikes, fetchUser } from "@apis/user";

import { IPCMain, IPCRenderer } from "@constants/ipc";

import { useLikesState } from "@hooks/likes";
import { useAlertModal, useLoginModalOpener } from "@hooks/modal";
import {
  useControlState,
  useNextSong,
  usePlaySong,
  usePrevSong,
} from "@hooks/player";
import { useToast } from "@hooks/toast";
import { useUserState } from "@hooks/user";

import { isNull } from "./isTypes";
import { ipcRenderer } from "./modules";

const SchemeHandler = (): null => {
  const [, setUser] = useUserState();
  const [, setLikes] = useLikesState();
  const [, setControl] = useControlState();

  const toast = useToast();
  const alertModal = useAlertModal();
  const openLoginModal = useLoginModalOpener();

  const playSong = usePlaySong();
  const prevSong = usePrevSong();
  const nextSong = useNextSong();

  useEffect(() => {
    (async () => {
      const user = await fetchUser();

      if (isNull(user)) return;

      if (ipcRenderer) {
        ipcRenderer.send(IPCRenderer.USER_LOGIN);
      }

      setUser(user);

      const likes = await fetchLikes();

      setLikes(likes);
    })();
  }, [setLikes, setUser]);

  const handler = useCallback(
    async (url: string) => {
      const { protocol, pathname, search: searchRaw } = new URL(url);
      const paths = pathname.split("/").filter((x) => x);
      const search = new URLSearchParams(searchRaw);

      if (protocol !== "wakmusic:") return;

      switch (paths[0]) {
        case "play": {
          const songId = paths[1];

          if (!songId) return;

          fetchSong(songId)
            .then(playSong)
            .catch(() => {
              toast("곡을 불러오는데 실패했습니다.");
            });

          break;
        }

        case "login": {
          localStorage.setItem("token", search.get("token") ?? "");

          const user = await fetchUser();

          if (isNull(user)) {
            alertModal("로그인에 실패했습니다.", null);
            return;
          }

          if (ipcRenderer) {
            ipcRenderer.send("user:login");
          }

          const likes = await fetchLikes();

          setUser(user);
          setLikes(likes);

          break;
        }

        case "open-login": {
          openLoginModal();

          break;
        }

        case "logout": {
          if (ipcRenderer) ipcRenderer.send("user:logout");

          setUser(null);

          break;
        }

        case "resume": {
          setControl((prev) => ({
            ...prev,
            isPlaying: true,
          }));

          break;
        }

        case "pause": {
          setControl((prev) => ({
            ...prev,
            isPlaying: false,
          }));

          break;
        }

        case "prevSong": {
          prevSong();

          break;
        }

        case "nextSong": {
          nextSong();

          break;
        }
      }
    },
    [
      alertModal,
      nextSong,
      openLoginModal,
      playSong,
      prevSong,
      setControl,
      setLikes,
      setUser,
      toast,
    ]
  );

  useEffect(() => {
    if (ipcRenderer) {
      ipcRenderer.on(IPCMain.SCHEME, (_event, url: string) => {
        handler(url);
      });
    }

    return () => {
      if (ipcRenderer) {
        ipcRenderer.removeAllListeners(IPCMain.SCHEME);
      }
    };
  }, [handler]);

  return null;
};

export default SchemeHandler;
