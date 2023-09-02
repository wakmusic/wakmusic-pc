import { useCallback, useEffect } from "react";
import { queryClient } from "src/main";

import { fetchSong } from "@apis/songs";
import { fetchLikes, fetchUser } from "@apis/user";

import { IPCMain, IPCRenderer } from "@constants/ipc";

import { useAlertModal } from "@hooks/alertModal";
import { useLikesState } from "@hooks/likes";
import { useLoginModalOpener } from "@hooks/loginModal";
import { useControlState, usePlayingInfoState } from "@hooks/player";
import { useUserState } from "@hooks/user";

import { isNull } from "./isTypes";
import { ipcRenderer } from "./modules";

const SchemeHandler = (): null => {
  const [, setUser] = useUserState();
  const [, setLikes] = useLikesState();
  const [, setControl] = useControlState();
  const [, setPlayingInfo] = usePlayingInfoState();

  const alertModal = useAlertModal();
  const openLoginModal = useLoginModalOpener();

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
      const { protocol, pathname } = new URL(url);
      const paths = pathname.split("/").filter((x) => x);

      if (protocol !== "wakmusic:") return;

      switch (paths[0]) {
        case "play": {
          const songId = paths[1];

          if (!songId) return;

          const song = await queryClient.fetchQuery(
            ["song", { songId }],
            async () => await fetchSong(songId)
          );

          if (!song) return;

          setPlayingInfo((prev) => ({
            ...prev,
            playlist: [...prev.playlist, song],
            current: prev.playlist.length,
          }));

          break;
        }

        case "login": {
          const user = await fetchUser();

          if (isNull(user)) {
            alertModal("로그인에 실패했습니다.", null);
            return;
          }

          if (ipcRenderer) {
            ipcRenderer.send("user:login");
          }

          setUser(user);

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

        case "pause": {
          setControl((prev) => ({
            ...prev,
            isPlaying: false,
          }));

          break;
        }
      }
    },
    [alertModal, openLoginModal, setControl, setPlayingInfo, setUser]
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
