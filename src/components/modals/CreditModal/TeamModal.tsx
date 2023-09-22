import styled from "styled-components/macro";

import { T5Medium, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useMembers, useTeam } from "@hooks/credit";
import { useCreditModal } from "@hooks/modal";

import Header from "./Header";
import Special from "./Special";

interface TeamModalProps {
  team: string;
}

const TeamModal = ({ team: name }: TeamModalProps) => {
  const openCreditModal = useCreditModal();
  const teams = useTeam();
  const members = useMembers();

  if (!teams) {
    return null;
  }

  const index = teams.teams.findIndex((t) => t.name === name);
  const team = teams.teams[index];

  const helpers = members.filter(
    (m) => m.team === team.name && m.role === "helper"
  );

  return (
    <Container>
      <Header
        isFirst={index === 0}
        isLast={index === teams.teams.length - 1}
        name={team.name}
        onLeft={() => {
          if (index === 0) return;

          openCreditModal({
            type: "team",
            target: teams.teams[index - 1].name,
          });
        }}
        onRight={() => {
          if (index === teams.teams.length - 1) return;

          openCreditModal({
            type: "team",
            target: teams.teams[index + 1].name,
          });
        }}
      />
      <IntroductionContainer>
        <T6Medium color={colors.blueGray500}>팀 소개</T6Medium>
        <Introduction color={colors.gray700}>{team.introduction}</Introduction>
      </IntroductionContainer>
      {helpers.length > 0 && (
        <HelperContainer>
          <T6Medium color={colors.blueGray500}>도움 주신 분들</T6Medium>
          <Helpers>
            {helpers.map((helper, i) => (
              <Special
                key={i}
                name={helper.name}
                onClick={() => {
                  openCreditModal({
                    type: "member",
                    target: helper.name,
                  });
                }}
              />
            ))}
          </Helpers>
        </HelperContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const IntroductionContainer = styled.div`
  width: 380px;

  padding-top: 16px;
`;

const Introduction = styled(T5Medium)`
  width: 100%;

  padding-top: 10px;

  word-break: keep-all;
`;

const HelperContainer = styled.div`
  width: 100%;

  justify-content: start;

  padding-left: 6px;
  padding-top: 30px;
`;

const Helpers = styled.div`
  padding-top: 10px;

  display: flex;
  flex-direction: row;

  gap: 4px;
`;

export default TeamModal;
