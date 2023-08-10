export type Artist = {
  artistId: string;
  name: string;
  short: string;
  graduated: boolean;
  title: string;
  appTitle: string;
  description: string;
  color: string[][];
  youtube: string;
  twitch: string;
  instagram: string;
  group: {
    en: string;
    kr: string;
  };
  image: {
    round: number;
    square: number;
  };
};
