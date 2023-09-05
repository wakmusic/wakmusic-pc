import {
  BrowserWindow,
  Menu,
  MenuItem,
  MenuItemConstructorOptions,
  Tray,
  nativeImage,
} from "electron";
import { join } from "path";

import { IPCMain } from "@constants/ipc";

const getWindow = (): BrowserWindow | false => {
  const win = BrowserWindow.getAllWindows()[0];

  if (!win) return false;

  win.focus();

  return win;
};

const openWindow = () => {
  const wins = BrowserWindow.getAllWindows();

  for (const win of wins) {
    win.show();
    win.focus();
  }
};

const processLogin = (menu: MenuItem) => {
  const win = getWindow();

  if (!win) return;

  switch (menu.label) {
    case "로그인":
      win.webContents.send(IPCMain.SCHEME, "wakmusic://open-login/");
      break;

    case "로그아웃":
      win.webContents.send(IPCMain.SCHEME, "wakmusic://logout/");
      break;
  }
};

const controlSong = (menu: MenuItem) => {
  const win = getWindow();

  if (!win) return;

  switch (menu.label) {
    case "재생":
      win.webContents.send(IPCMain.SCHEME, "wakmusic://resume/");
      break;

    case "일시정지":
      win.webContents.send(IPCMain.SCHEME, "wakmusic://pause/");
      break;
  }
};

const prevSong = () => {
  const win = getWindow();

  if (win) {
    win.webContents.send(IPCMain.SCHEME, "wakmusic://prevSong/");
  }
};

const nextSong = () => {
  const win = getWindow();

  if (win) {
    win.webContents.send(IPCMain.SCHEME, "wakmusic://nextSong/");
  }
};

const template: MenuItemConstructorOptions[] = [
  {
    label: "열기",
    click: openWindow,
  },
  {
    label: "로그인",
    click: processLogin,
  },
  {
    type: "separator",
  },
  {
    label: "재생",
    click: controlSong,
  },
  {
    label: "이전 곡",
    click: prevSong,
  },
  {
    label: "다음 곡",
    click: nextSong,
  },
  {
    type: "separator",
  },
  {
    role: "quit",
    label: "종료",
  },
];

export const initTray = () => {
  const image = nativeImage.createFromPath(join(__dirname, "appicon.png"));
  const trayIcon = image.resize({ width: 16 });
  const tray = new Tray(trayIcon);

  const contextMenu = Menu.buildFromTemplate(template);

  tray.on("click", openWindow);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("왁타버스 뮤직");

  return (type: "login" | "play", label: string) => {
    let templateIndex;

    if (type === "login") {
      templateIndex = template.findIndex(
        (item) => item.label === "로그인" || item.label === "로그아웃"
      );
    }

    if (type === "play") {
      templateIndex = template.findIndex(
        (item) => item.label === "재생" || item.label === "일시정지"
      );
    }

    if (!templateIndex) return;

    template[templateIndex].label = label;
    const contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
  };
};
