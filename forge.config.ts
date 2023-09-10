import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";
import * as dotenv from "dotenv";
import { readdir, rmdir, unlink } from "fs/promises";
import { join } from "path";

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

    afterCopy: [
      async (buildPath, _electronVersion, platform, _arch, callback) => {
        if (platform == "win32") {
          const localeDir = join(buildPath, "../../locales");

          const files = await readdir(localeDir);

          for (const file of files) {
            if (file !== "en-US.pak") {
              await unlink(join(localeDir, file));
            }
          }
        }
        if (platform == "darwin") {
          const resourcesDir = join(buildPath, "../../Resources");

          const files = await readdir(resourcesDir);

          for (const file of files) {
            if (
              file.endsWith(".lproj") &&
              !["ko.lproj", "en.lproj"].includes(file)
            ) {
              await rmdir(join(resourcesDir, file));
            }
          }
        }

        callback();
      },
    ],

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

    extraResource: [
      "./build/macos/resources/en.lproj",
      "./build/macos/resources/ko.lproj",
    ],
  },
  rebuildConfig: {},
  makers: [
    // {
    //   name: "@electron-forge/maker-appx",
    //   config: {
    //     identityName: "55390B70E4627.1221F2615847",
    //     publisher: "CN=CFF2F2B0-3997-40A5-9513-E927980AC814",
    //     publisherDisplayName: "왁타버스 뮤직",

    //     assets: "./build/appx",
    //   },
    // },
    {
      name: "@electron-forge/maker-dmg",
      config: {
        additionalDMGOptions: {
          window: {
            size: {
              height: 586,
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
              path: `${process.cwd()}/out/Wakmusic-darwin-${
                process.arch
              }/Wakmusic.app`,
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
    {
      name: "@electron-forge/maker-zip",
      config: {},
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
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "wakmusic",
          name: "wakmusic-pc",
        },
        authToken: process.env.GITHUB_TOKEN,
        prerelease: true,
      },
    },
  ],
};

export default config;
