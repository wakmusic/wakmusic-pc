import { app, autoUpdater, dialog } from "electron";

export let isAppQuitting = false;

export default () => {
  const server = "https://update.electronjs.org";
  const feed = `${server}/wakmusic/wakmusic-pc/${
    process.platform
  }-arm64/${app.getVersion()}`;

  autoUpdater.setFeedURL({
    url: feed,
  });

  autoUpdater.on("update-available", () => {
    console.log("update available");
  });

  autoUpdater.on("update-downloaded", (_, __, releaseName) => {
    console.log("update downloaded");
    const dialogOpts: Electron.MessageBoxOptions = {
      type: "info",
      buttons: ["재시작", "나중에"],
      title: "Application Update",
      message: releaseName,
      detail: "새 버전이 감지되었습니다. 재시작하여 업데이트해주세요.",
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) {
        isAppQuitting = true;
        autoUpdater.quitAndInstall();
      }
    });
  });

  autoUpdater.on("error", (message) => {
    console.error("There was a problem updating the application");
    console.error(message);
  });

  app.on("before-quit", function (_) {
    isAppQuitting = true;
  });
};
