export type Artist = {
  artistId: string;
  name: string;
  short: string;
  graduated: boolean;
  title: {
    app: string;
    web: string;
  };
  appTitle: string;
  description: string;
  color: {
    background: string[][];
    card: string[][];
  };
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
    clear: number;
    special?: string;
  };
};
