/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="youtube" />

export interface WAKMU {
  __setPlayingInfo?: SetterOrUpdater<PlayingInfoStateType>;
  playSong: (song: Song) => void;
  playYoutube: (youtubeId: string, title?: string, artist?: string) => void;
}

declare global {
  interface Window {
    require: NodeRequire;
    WAKMU: WAKMU;
  }
}
