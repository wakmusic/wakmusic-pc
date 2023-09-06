import { MakerAppX } from "@electron-forge/maker-appx";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";
import * as dotenv from "dotenv";

dotenv.config();

const config: ForgeConfig = {
  packagerConfig: {
    name: "Wakmusic",
    icon: "./build/appicon",
    asar: true,
    appBundleId: "com.wakmusic-pc",

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

    // afterCopy: [
    //   async (buildPath, _electronVersion, platform, _arch, callback) => {
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

    protocols: [
      {
        name: "왁타버스 뮤직",
        schemes: ["wakmusic"],
      },
    ],

    osxSign: {
      type: "distribution",
      identityValidation: true,
      identity: process.env.APPLE_IDENTITY,
      provisioningProfile: process.env.PP_PATH,
      optionsForFile: (_) => {
        return {
          hardenedRuntime: true,
          entitlements: "./build/macos/entitlements.plist",
        };
      },
      strictVerify: true,
      preAutoEntitlements: false,
      preEmbedProvisioningProfile: false,
    },
    osxNotarize: {
      tool: "notarytool",
      appleId: process.env.APPLE_ID ?? "",
      appleIdPassword: process.env.APPLE_PASSWORD ?? "",
      teamId: process.env.APPLE_TEAM_ID ?? "",
    },

    extraResource: "./build/macos/ko.lproj/",
  },
  rebuildConfig: {},
  makers: [
    new MakerAppX({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      identityName: "55390B70E4627.1221F2615847",
      publisher: "CN=CFF2F2B0-3997-40A5-9513-E927980AC814",
      publisherDisplayName: "왁타버스 뮤직",

      assets: "./build/appx",
    }),
    {
      name: "@electron-forge/maker-dmg",
      config: {
        additionalDMGOptions: {
          window: {
            size: {
              height: 634,
              width: 960,
            },
          },
          "code-sign": {
            "signing-identity": process.env.APPLE_IDENTITY ?? "",
          },
        },
        background: "./build/macos/background.png",
        icon: "./build/appicon.icns",
        iconSize: 184,
        contents: () => {
          return [
            {
              type: "file",
              path: `${process.cwd()}/out/wakmusic-pc-darwin-x64/wakmusic-pc.app`,
              x: 292,
              y: 290,
            },
            {
              name: "Applications",
              type: "link",
              path: "/Applications",
              x: 668,
              y: 290,
            },
          ];
        },
      },
    },
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
