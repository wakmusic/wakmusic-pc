import { MakerZIP } from "@electron-forge/maker-zip";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";
import { readdir, unlink } from "fs/promises";
import { join } from "path";

const config: ForgeConfig = {
  packagerConfig: {
    name: "왁타버스 뮤직",
    icon: "public/favicon.ico",
    asar: true,

    ignore: [
      /.github/,
      /.vscode/,
      /.yarn/,
      /.dist/,
      /public/,
      /src/,
      /.env/,
      /.editorconfig/,
      /.eslintrc/,
      /.gitignore/,
      /.gitmodules/,
      /.prettierrc/,
      /.forge.config.ts/,
      /README.md/,
      /tsconfig.json/,
      /tsconfig.node.json/,
      /vite.main.config.ts/,
      /vite.renderer.config.ts/,
      /node_modules\/.vite/,
    ],

    protocols: [
      {
        name: "왁타버스 뮤직",
        schemes: ["wakmusic"],
      },
    ],

    afterCopy: [
      async (buildPath, _electronVersion, _platform, _arch, callback) => {
        const localeDir = join(buildPath, "../../locales");

        const files = await readdir(localeDir);

        for (const file of files) {
          if (file !== "en-US.pak") {
            await unlink(join(localeDir, file));
          }
        }

        callback();
      },
    ],
  },
  makers: [new MakerZIP({})],
  plugins: [
    new VitePlugin({
      build: [
        {
          entry: "src/electron.ts",
          config: "vite.main.config.ts",
        },
      ],
      renderer: [
        {
          name: "main_window",
          config: "vite.renderer.config.ts",
        },
      ],
    }),
  ],
};

export default config;
