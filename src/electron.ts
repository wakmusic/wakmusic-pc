import { BrowserWindow, app, ipcMain } from "electron";
import { createServer } from "vite";

(async () => {
  // Initialize the Vite server
  const server = await createServer({
    server: {
      port: 1337,
    },
  });

  await server.listen();

  const port = server.config.server.port;

  console.log(`Server running at http://localhost:${port}`);

  // Initialize the Electron application
  app.whenReady().then(() => {
    const win = new BrowserWindow({
      width: 1240,
      height: 720,
      minWidth: 1240,
      minHeight: 720,
      frame: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });

    win.webContents.openDevTools();
    win.setMenuBarVisibility(false);
    win.loadURL(`http://localhost:${port}`);
  });
})();

ipcMain.on("window:least", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.minimize();
});

ipcMain.on("window:max", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win)
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
});

ipcMain.on("window:close", () => {
  const win = BrowserWindow.getFocusedWindow();
  if (win) win.close();
});
