const staticURL = "https://static.wakmusic.xyz/static";

type profileImgType =
  | "bat"
  | "dulgi"
  | "ddong"
  | "gorani"
  | "jupock"
  | "panchi"
  | "segyun"
  | "ifari";

type artistImgType = "card" | "big" | "group" | "full" | "round" | "square";

type documentType = "privacy" | "terms";

export const getArtistImg = (type: artistImgType, id: string) => {
  if (type == "big") {
    return `${staticURL}/artist/${type}/${id}.jpg`;
  }
  return `${staticURL}/artist/${type}/${id}.png`;
};

export const getLyrics = (id: string) => {
  return `${staticURL}/lyrics/${id}.vtt`;
};

export const getProfileImg = (name: profileImgType) => {
  return `${staticURL}/profile/${name}.png`;
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

export const getPlaylistIcon = (id: number) => {
  return `${staticURL}/playlist/${id}.png`;
};

export const getDocument = (type: documentType) => {
  return `${staticURL}/document/${type}.pdf`;
};
