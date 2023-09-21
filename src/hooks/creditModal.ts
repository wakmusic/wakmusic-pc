import { CreditModalState } from "@state/creditModal/atoms";
import { useQuery } from "react-query";
import { useRecoilState, useSetRecoilState } from "recoil";

import { fetchTeam } from "@apis/team";

import { CreditModalDetail } from "@templates/team";

import { useIsSpaceDisabled } from "./player";

export const useCreditModal = () => {
  const setState = useSetRecoilState(CreditModalState);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const openCreditModal = (detail: CreditModalDetail) => {
    setIsSpaceDisabled(true);
    setState({
      isOpen: true,
      detail,
    });
  };

  return openCreditModal;
};

export const useCreditModalState = () => {
  return useRecoilState(CreditModalState);
};

export const useTeam = () => {
  const { data: team } = useQuery({
    queryKey: "team",
    queryFn: fetchTeam,
  });

  if (!team) {
    return {
      king: null,
      weekly: [],
      pc: [[], []],
      mobile: [[], []],
      design: [[], []],
      teams: [],
      specials: [],
    };
  }

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
