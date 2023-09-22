import styled, { css } from "styled-components/macro";

import { T4Bold, T6Bold, T6Medium } from "@components/Typography";

import colors, { teamColors } from "@constants/colors";

import { useCreditModal } from "@hooks/creditModal";

import { Member as MemberType } from "@templates/team";

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
      <KingContainer onClick={onClick}>
        <PrettyBackground $color={teamColors[member.team] ?? [255, 255, 255]} />
        <Text>
          <T4Bold color={colors.gray700}>{member.name}</T4Bold>
        </Text>
      </KingContainer>
    );
  }

  return (
    <Container onClick={onClick}>
      <PrettyBackground $color={teamColors[member.team] ?? [255, 255, 255]} />

      <Text>
        {member.role === "leader" ? (
          <T6Bold color={colors.gray700}>{member.name}</T6Bold>
        ) : (
          <T6Medium color={colors.gray600}>{member.name}</T6Medium>
        )}
      </Text>
    </Container>
  );
};

const PrettyBackground = styled.div<{ $color: [number, number, number] }>`
  position: relative;

  width: 0%;
  height: 100%;

  opacity: 0;
  transition: 0.3s;

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

const Container = styled.div`
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border-radius: 99px;

  &:hover {
    ${PrettyBackground} {
      width: 100%;
      opacity: 1;
    }
  }
`;

const Text = styled.div`
  position: absolute;
`;

const KingContainer = styled(Container)`
  width: 98px;
`;

export default Member;
