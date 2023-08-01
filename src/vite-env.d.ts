/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="youtube" />

declare global {
  interface Window {
    // ipcRenderer를 사용하기 위한 모시깽이
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    require: any;
  }
}
