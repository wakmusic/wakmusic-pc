import styled, { css } from "styled-components/macro";

import { T5Medium, T6Medium } from "@components/Typography";

import colors, { teamColors } from "@constants/colors";

import { useCreditModal, useMembers } from "@hooks/creditModal";

import Header from "./Header";

interface MemberModalProps {
  member: string;
}

const MemberModal = ({ member: name }: MemberModalProps) => {
  const openCreditModal = useCreditModal();
  const members = useMembers();

  const index = members.findIndex((m) => m.name === name);
  const member = members[index];

  return (
    <Container>
      <Header
        isFirst={index === 0}
        isLast={index === members.length - 1}
        name={member.name}
        member
        onLeft={() => {
          if (index === 0) return;

          openCreditModal({
            type: "member",
            target: members[index - 1].name,
          });
        }}
        onRight={() => {
          if (index === members.length - 1) return;

          openCreditModal({
            type: "member",
            target: members[index + 1].name,
          });
        }}
      />
      <Title $color={teamColors[member.team] ?? [255, 255, 255]}>
        <T5Medium color={colors.gray700}>{member.title}</T5Medium>
      </Title>
      <ContributionContainer>
        <T6Medium color={colors.blueGray500}>기여한 업무</T6Medium>
        <Contributions>
          {member.contributions.map((contrubution, i) => (
            <li key={i}>
              <T6Medium color={colors.blueGray500}>{contrubution}</T6Medium>
            </li>
          ))}
        </Contributions>
      </ContributionContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div<{ $color: [number, number, number] }>`
  width: 226px;
  height: 38px;

  margin-top: 16px;
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  ${({ $color }) => {
    const colors = $color.join(", ");

    return css`
      background: linear-gradient(
        270deg,
        rgba(${colors}, 0) 0%,
        rgba(${colors}, 0.1) 50%,
        rgba(${colors}, 0) 100%
      );
    `;
  }}
`;

const ContributionContainer = styled.div`
  width: 316px;
  align-items: start;
`;

const Contributions = styled.ul`
  width: 100%;

  padding-top: 12px;
  margin-left: 20px;

  list-style-type: disc;
  color: ${colors.blueGray400};

  ${T6Medium} {
    margin-left: -5px;
    margin-bottom: 2px;
  }
`;

export default MemberModal;
