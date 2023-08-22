import { useCallback, useEffect } from "react";
import { queryClient } from "src/main";

import { fetchSong } from "@apis/songs";
import { fetchUser } from "@apis/user";

import { IPCMain, IPCRenderer } from "@constants/ipc";

import { useAlertModal } from "@hooks/alertModal";
import { useLoginModalOpener } from "@hooks/loginModal";
import { usePlayingInfoState } from "@hooks/player";
import { useUserState } from "@hooks/user";

import { isNull } from "./isTypes";
import { ipcRenderer } from "./modules";

const SchemeHandler = (): null => {
  const [, setUser] = useUserState();
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
    })();
  }, [setUser]);

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
            playlist: [
              ...prev.playlist,
              {
                songId: song.songId,
                title: song.title,
                artist: song.artist,
                start: song.start,
                end: song.end,
                views: song.total.views,
              },
            ],
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
        }
      }
    },
    [alertModal, openLoginModal, setPlayingInfo, setUser]
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
