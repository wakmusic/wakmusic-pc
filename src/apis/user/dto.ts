import { PlaylistType } from "@templates/playlist";
import { Song } from "@templates/song";
import { User, UserProfile } from "@templates/user";

export type ProfileListResponse = UserProfile[];

export type UserProfileResponse = User | null;

export type PlaylistsResponse = PlaylistType[];

export type LikesListResponse = Song[];
