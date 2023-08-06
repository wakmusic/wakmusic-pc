import { Client } from "@xhayper/discord-rpc";

import { SongInfo } from "../templates/player";

let last: SongInfo | undefined;
let startTimestamp: number | undefined;

export const client = new Client({
  clientId: "1130044110837923890",
});

export const setProgress = (progress: number) => {
  if (!last || !startTimestamp) return;

  const now = Date.now();

  // 마지막으로 디스코드에 전송한 startTimestamp와
  // progress를 이용해서 계산한 시간의 오차가 1초 이상일 때
  // startTimestamp를 변경하는 로직
  if (Math.abs(startTimestamp + progress * 1000 - now) > 1000) {
    changePresence(last, true, now - progress * 1000);
  }
};

export const showPlaying = (isPlaying: boolean) => {
  if (isPlaying && last) {
    changePresence(last, true);
  } else {
    client.user?.clearActivity();
  }
};

export const changePresence = (
  current: SongInfo | null,
  force = false,
  timestamp: number | null = null
) => {
  if (!current) return;
  if (!force && current.songId === last?.songId) return;

  startTimestamp = timestamp ?? Date.now();
  last = current;

  client.user?.setActivity({
    largeImageKey: `https://i.ytimg.com/vi/${current.songId}/default.jpg`,
    smallImageKey: "logo",

    state: current.artist,
    details: current.title,
    buttons: [
      {
        label: "듣기",
        url: `https://www.youtube.com/watch?v=${current.songId}`,
      },
    ],

    startTimestamp,
  });
};
