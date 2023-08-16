export type UserProfile = { type: string; version: number };

export type User = {
  displayName: string;
  profile: UserProfile;
};
