import { Song } from "./song";

export type SongsSearchResponse = {
  song: Song[];
  artist: Song[];
  remix: Song[];
};

export type tabsTypes = "all" | "song" | "artist" | "remix";
