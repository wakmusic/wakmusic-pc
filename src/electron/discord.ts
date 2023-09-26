import { Client } from "@xhayper/discord-rpc";

import { Song } from "@templates/song";

let isPlaying = false;
let last: Song | undefined;
let startTimestamp: number | undefined;
let is_first_song = true;

export const client = new Client({
  clientId: "1130044110837923890",
});

const reconnect = () => {
  client.login();
};

let reconnectInterval: NodeJS.Timer | undefined = setInterval(reconnect, 5000);

client.on("ready", () => {
  if (reconnectInterval) {
    clearInterval(reconnectInterval);
    reconnectInterval = undefined;
  }

  if (last) {
    changePresence(last, true);
  }
});

client.on("disconnected", () => {
  client.destroy();

  reconnectInterval = setInterval(reconnect, 5000);
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

export const showPlaying = (_isPlaying: boolean) => {
  isPlaying = _isPlaying;

  if (isPlaying && last) {
    changePresence(last, true);
  } else {
    client.user?.clearActivity();
  }
};

export const changePresence = (
  current: Song | null,
  force = false,
  timestamp: number | null = null
) => {
  if (!current) return;
  if (!force && current.songId === last?.songId) return;

  if (is_first_song) {
    is_first_song = false;
    last = current;
    return;
  }

  if (!isPlaying) return;

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
