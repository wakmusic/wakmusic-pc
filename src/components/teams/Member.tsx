import styled, { css } from "styled-components/macro";

import { T4Bold, T6Bold, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useCreditModal } from "@hooks/creditModal";

import { Member as MemberType } from "@templates/team";

import { getTeamColor } from "@utils/utils";

interface MemberProps {
  member: MemberType;
  king?: boolean;
}

const Member = ({ member, king }: MemberProps) => {
  const openCreditModal = useCreditModal();

  function onClick() {
    openCreditModal({
      type: "member",
      target: member.name,
    });
  }

  if (king) {
    return (
      <KingContainer $color={getTeamColor(member.team)} onClick={onClick}>
        <T4Bold color={colors.gray700}>{member.name}</T4Bold>
      </KingContainer>
    );
  }

  return (
    <Container $color={getTeamColor(member.team)} onClick={onClick}>
      {member.role === "leader" ? (
        <T6Bold color={colors.gray700}>{member.name}</T6Bold>
      ) : (
        <T6Medium color={colors.gray600}>{member.name}</T6Medium>
      )}
    </Container>
  );
};

const Container = styled.div<{ $color: [number, number, number] }>`
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border-radius: 99px;
  background-color: ${colors.white};

  &:hover {
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
  }
`;

const KingContainer = styled(Container)`
  width: 98px;
`;

export default Member;
