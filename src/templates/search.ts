import { Song } from "./song";

export type SearchAllResponse = {
  song: Song[];
  artist: Song[];
  remix: Song[];
};

export type SearchTabType = "all" | "song" | "artist" | "remix";
