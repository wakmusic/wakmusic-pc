import { Client } from "@xhayper/discord-rpc";

export const runDiscordRPC = async () => {
  const client = new Client({
    clientId: "1130044110837923890",
  });

  client.on("ready", () => {
    client.user?.setActivity({
      largeImageKey: "https://i.ytimg.com/vi/QgMFpuos4Rg/default.jpg",
      smallImageKey: "logo",

      state: "이세계아이돌",
      details: "LOCKDOWN",
      buttons: [
        {
          label: "듣기",
          url: "https://www.youtube.com/watch?v=QgMFpuos4Rg",
        },
      ],
    });
  });

  client.login();
};
