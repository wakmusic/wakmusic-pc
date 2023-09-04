import { MakerDMG } from "@electron-forge/maker-dmg";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";

const config: ForgeConfig = {
  packagerConfig: {
    name: "왁타버스 뮤직",
    icon: "./build/appicon",
    asar: true,
    appBundleId: "com.wakmusic-pc",
    ignore: [/.yarn/],
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
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({}),
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
