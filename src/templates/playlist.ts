import { SongTotal } from "./song";
import { User } from "./user";

type basePlaylist = {
  key: string;
  title: string;
  createAt: number;
  user?: User;
  songs: SongTotal[];
};

type defaultImage = {
  name: string;
  version: number;
};

type recommendImage = {
  round: boolean;
  square: boolean;
};

export type PlaylistType = basePlaylist & {
  image: defaultImage;
};

export type RecommendlistType = basePlaylist & {
  image: recommendImage;
};

export type myListItemType = PlaylistType & {
  index: number;
};
