import { Song } from "./song";
import { User } from "./user";

export type Playlist = {
  key: string;
  title: string;
  createAt: number;
  user: User;
  image: {
    name: string;
    version: number;
  };
  songs: Song[];
};
