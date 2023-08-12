import { Song, SongTotal } from "./song";

export type SongsSearchResponse = {
  song: Song[];
  artist: Song[];
  remix: Song[];
};

export type NewSongsResponse = SongTotal[];

export type tabsTypes = "all" | "song" | "artist" | "remix";
