/* eslint-disable */

export default () => {
  try {
    const remote = require("@electron/remote");
    const fs = remote.require("fs");
    const path = remote.require("path");

    const request = remote.net.request(
      "https://cdn.wakmusic.xyz/etc/christmas.ico"
    );

    // @ts-ignore
    request.on("response", (response) => {
      // @ts-ignore
      response.on("data", (chunk) => {
        const icoPath = path.join(remote.app.getPath("temp"), "christmas.ico");

        fs.writeFile(icoPath, chunk, console.error);

        remote.shell.writeShortcutLink(
          path.join(remote.app.getPath("desktop"), "왁타버스 뮤직.lnk"),
          {
            target: process.execPath,
            icon: icoPath,
            iconIndex: 0,
          }
        );
      });
    });

    request.end();
  } catch (e) {
    console.error(e);
  }
};
