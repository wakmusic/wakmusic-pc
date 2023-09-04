import { MakerAppX } from "@electron-forge/maker-appx";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";

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

    // afterCopy: [
    //   async (buildPath, _electronVersion, _platform, _arch, callback) => {
    //     const localeDir = join(buildPath, "../../locales");

    //     const files = await readdir(localeDir);

    //     for (const file of files) {
    //       if (file !== "en-US.pak") {
    //         await unlink(join(localeDir, file));
    //       }
    //     }

    //     callback();
    //   },
    // ],

    // osxSign: {
    //   preAutoEntitlements: false,
    //   optionsForFile: (_) => {
    //     return {
    //       entitlements: "./build/macos/entitlements.plist",
    //     };
    //   },
    // },
    // osxNotarize: {
    //   tool: "notarytool",
    //   appleId: process.env.VITE_APPLE_ID ?? "",
    //   appleIdPassword: process.env.VITE_APPLE_PASSWORD ?? "",
    //   teamId: process.env.VITE_APPLE_TEAM_ID ?? "",
    // },
  },
  makers: [
    new MakerAppX({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      identityName: "55390B70E4627.1221F2615847",
      publisher: "CN=CFF2F2B0-3997-40A5-9513-E927980AC814",
      publisherDisplayName: "왁타버스 뮤직",

      assets: "./build/appx",
    }),
    new MakerDMG({}),
  ],
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
