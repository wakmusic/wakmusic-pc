import { SongTotal } from "./song";

export type SearchAllResponse = {
  song: SongTotal[];
  artist: SongTotal[];
  remix: SongTotal[];
};

export type NewSongsResponse = SongTotal[];

export type SearchTabType = "all" | "song" | "artist" | "remix";
