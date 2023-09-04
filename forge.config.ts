import { MakerAppX } from "@electron-forge/maker-appx";
import { MakerDMG } from "@electron-forge/maker-dmg";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";

const config: ForgeConfig = {
  packagerConfig: {
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
      teamId: process.env.TEAM_ID ?? "",
    },
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
    new MakerDMG({
      additionalDMGOptions: {
        "code-sign": {
          "signing-identity": process.env.APPLE_IDENTITY ?? "",
        },
      },
      icon: "./build/appicon.icns",
    }),
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
