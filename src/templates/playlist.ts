import { SongTotal } from "./song";
import { User } from "./user";

export type PlaylistType = {
  key: string;
  title: string;
  createAt: number;
  user: User;
  image: {
    name: string;
    version: number;
  };
  songs: SongTotal[];
};

export interface myListItemType extends PlaylistType {
  readonly index: number;
}
