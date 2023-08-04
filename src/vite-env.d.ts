/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="youtube" />

export interface WAKMU {
  __setPlayingInfo?: SetterOrUpdater<PlayingInfoStateType>;
  playSong: (song: SongInfo) => void;
  playYoutube: (youtubeId: string, title?: string, artist?: string) => void;
}

declare global {
  interface Window {
    // ipcRenderer를 사용하기 위한 모시깽이
    require: NodeRequire;
    WAKMU: WAKMU;
  }
}
