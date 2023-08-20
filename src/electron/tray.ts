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

const openWindow = () => {
  const win = BrowserWindow.getAllWindows()[0];

  if (win) {
    win.show();
    win.focus();
  }
};

const processLogin = (menu: MenuItem) => {
  const win = BrowserWindow.getAllWindows()[0];

  if (!win) return;

  win.focus();

  switch (menu.label) {
    case "로그인":
      win.webContents.send(IPCMain.SCHEME, "wakmusic://open-login/");
      break;

    case "로그아웃":
      win.webContents.send(IPCMain.SCHEME, "wakmusic://logout/");
      break;
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
    role: "quit",
    label: "종료",
  },
];

export const initTray = () => {
  const tray = new Tray(
    nativeImage.createFromPath(join(__dirname, "/favicon.ico"))
  );

  const contextMenu = Menu.buildFromTemplate(template);

  tray.on("click", openWindow);
  tray.setContextMenu(contextMenu);
  tray.setToolTip("왁타버스 뮤직");

  return (label: string) => {
    const templateIndex = template.findIndex(
      (item) => item.label === "로그인" || item.label === "로그아웃"
    );

    template[templateIndex].label = label;
    const contextMenu = Menu.buildFromTemplate(template);
    tray.setContextMenu(contextMenu);
  };
};
