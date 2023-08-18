type LoginPlatform = "naver" | "google" | "apple";

type Platforms = {
  [key in LoginPlatform]: string;
};

const platforms: Platforms = {
  naver: "네이버",
  google: "구글",
  apple: "애플",
};

export default platforms;
