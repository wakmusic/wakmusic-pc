import { Artist } from "@templates/artists";
import { RecommendListMetaType } from "@templates/playlist";
import { UserProfile } from "@templates/user";

const staticURL = import.meta.env.VITE_STATIC_URL;

type profileImgType =
  | "bat"
  | "dulgi"
  | "ddong"
  | "gorani"
  | "jupock"
  | "panchi"
  | "segyun"
  | "ifari";

type documentType = "privacy" | "terms";

type RoundOrSquare = "round" | "square";

export const getProfileImg = (profile: UserProfile) => {
  return `${staticURL}/profile/${profile.type}.png?v=${profile.version}`;
};

export const getYoutubeHQThumbnail = (id: string) => {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
};

export const getYoutubeThumbnail = (id: string) => {
  return `https://i.ytimg.com/vi/${id}/default.jpg`;
};

export const getAudio = (id: string) => {
  return `${staticURL}/audio/${id}.mp3`;
};

export const getPlaylistIconSquare = (id: string) => {
  return `${staticURL}/playlist/icon/square/${id}.png`;
};

export const getPlaylistIconRound = (id: string) => {
  return `${staticURL}/playlist/icon/round/${id}.png`;
};

export const getDocument = (type: documentType) => {
  return `${staticURL}/document/${type}.pdf`;
};

export const getPlaylistIcon = (id: number) => {
  return `${staticURL}/playlist/${id}.png`;
};

export const getRecommendImage = (
  list: RecommendListMetaType,
  type: RoundOrSquare
) => {
  return `${staticURL}/playlist/icon/${type}/${list.key}.png?v=${list.image[type]}`;
};

export const getRecommendRoundImage = (list: RecommendListMetaType) => {
  return getRecommendImage(list, "round");
};

export const getRecommendSquareImage = (list: RecommendListMetaType) => {
  return getRecommendImage(list, "square");
};

export const getArtistImage = (artist: Artist, type: RoundOrSquare) => {
  return `${staticURL}/artist/${type}/${artist.artistId}.png?v=${artist.image[type]}`;
};

export const getArtistRoundImage = (artist: Artist) => {
  return getArtistImage(artist, "round");
};

export const getArtistSquareImage = (artist: Artist) => {
  return getArtistImage(artist, "square");
};
