import { useQuery } from "react-query";

import { fetchTeam } from "@apis/team";

export const useTeam = () => {
  const { data: team } = useQuery({
    queryKey: "team",
    queryFn: fetchTeam,
  });

  return team;
};

export const useMembers = () => {
  const { data: team } = useQuery({
    queryKey: "team",
    queryFn: fetchTeam,
  });

  if (!team) {
    return [];
  }

  return [
    team.king,
    ...team.weekly,
    ...team.pc[0],
    ...team.pc[1],
    ...team.mobile[0],
    ...team.mobile[1],
    ...team.design[0],
    ...team.design[1],
  ];
};
