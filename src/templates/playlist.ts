import { Image } from "./Image";
import { SongTotal } from "./song";
import { User } from "./user";

type playlistMeta = {
  key: string;
  title: string;
  createAt: number;
  user?: User;
};

export type BasePlaylist = playlistMeta & {
  songs: SongTotal[];
};

type recommendImage = {
  round: boolean;
  square: boolean;
};

export type RecommendListMetaType = playlistMeta & {
  public: boolean;
  image: recommendImage;
};

export type PlaylistType = BasePlaylist & {
  image: Image;
};

export type RecommendListType = RecommendListMetaType & BasePlaylist;

export type myListItemType = PlaylistType & {
  index: number;
};
