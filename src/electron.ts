import { BrowserWindow, app } from "electron";
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
      width: 1000,
      height: 580,
      minWidth: 1000,
      minHeight: 580,
      frame: false,
    });

    win.setMenuBarVisibility(false);
    win.loadURL(`http://localhost:${port}`);
  });
})();
