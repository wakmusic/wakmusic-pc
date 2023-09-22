import instance from "@apis/axios";

import { Teams } from "@templates/team";

const TEAM_BASE = "/team";

export const fetchTeam = async (): Promise<Teams> => {
  const { data } = await instance.get(`${TEAM_BASE}`);
  return data;
};
