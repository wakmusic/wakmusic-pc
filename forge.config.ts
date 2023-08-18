import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { VitePlugin } from "@electron-forge/plugin-vite";
import type { ForgeConfig } from "@electron-forge/shared-types";

const config: ForgeConfig = {
  packagerConfig: {
    name: "왁타버스 뮤직",
    icon: "public/favicon.ico",
    asar: true,

    /*
      나중에 실제 퍼블리싱을 위해서 필요 없는 라이브러리들과
      개발에 쓰이는 파일들을 제외하는 등의 asar 경량화와 같은 설정이 필요

      메모)
        - 엄청난 include, exclude 설정을 하여서 알잘딱 빌드를 구성하기
        - prebuiltAsar 옵션을 이용하여서 미리 라이브러리만 빌드해두기
    */

    ignore: [/.yarn/],
  },
  rebuildConfig: {},
  makers: [new MakerSquirrel({})],
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
