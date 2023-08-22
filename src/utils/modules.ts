let electron;

try {
  electron = window.require("electron");
} catch {
  /* empty */
}

const ipcRenderer: Electron.IpcRenderer | undefined = electron?.ipcRenderer;

const openExternal: ((url: string) => void) | undefined =
  electron?.shell?.openExternal;

export { ipcRenderer, openExternal };
