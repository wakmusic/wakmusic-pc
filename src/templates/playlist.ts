import { Image } from "./image";
import { RawSong, Song } from "./song";
import { User } from "./user";

type playlistMeta = {
  key: string;
  title: string;
  createAt: number;
  user?: User;
};

export type BasePlaylist = playlistMeta & {
  songs: Song[];
};

type recommendImage = {
  round: boolean;
  square: boolean;
};

export type RecommendListMetaType = playlistMeta & {
  public: boolean;
  image: recommendImage;
};

export type RawPlaylist = playlistMeta & {
  songs: RawSong[];
};

export type PlaylistType = BasePlaylist & {
  image: Image;
};

export type RecommendListType = RecommendListMetaType & BasePlaylist;

export type myListItemType = PlaylistType & {
  index: number;
};
