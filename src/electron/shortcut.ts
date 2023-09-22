import { app, shell } from "electron";
import { join } from "path";

export const createShortcut = () => {
  shell.writeShortcutLink(join(app.getPath("desktop"), "왁타버스 뮤직.lnk"), {
    target: process.execPath,
  });
};
