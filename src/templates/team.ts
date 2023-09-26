export type CreditModalDetail = {
  type: "member" | "team" | "special";
  target: string;
};

export type Member = {
  name: string;
  team: string;
  title: string;
  contributions: string[];
  role: "leader" | "member" | "helper";
};

export type Team = {
  name: string;
  introduction: string;
};

export type Special = {
  name: string;
  members: string[];
};

export type Teams = {
  king: Member;
  weekly: Member[];
  pc: [Member[], Member[]];
  mobile: [Member[], Member[]];
  design: [Member[], Member[]];
  teams: Team[];
  specials: Special[];
};
