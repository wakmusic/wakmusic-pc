import styled from "styled-components/macro";

import { T4Bold } from "@components/Typography";

import colors from "@constants/colors";

import { useTeam } from "@hooks/creditModal";
import { useToast } from "@hooks/toast";

import Special from "./Special";

interface SpecialModalProps {
  special: string;
}

const SpecialModal = ({ special: name }: SpecialModalProps) => {
  const toast = useToast();
  const team = useTeam();

  const special = team?.specials.find((s) => s.name === name);

  if (!special) {
    return null;
  }

  return (
    <Container>
      <T4Bold color={colors.gray700}>{name}</T4Bold>
      <Members>
        {special.members.map((member, i) => (
          <Special
            key={i}
            name={member}
            onClick={() => {
              navigator.clipboard.writeText(member);
              toast("클립보드에 복사되었습니다.");
            }}
          />
        ))}
      </Members>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Members = styled.div`
  padding-top: 16px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 4px;
`;

export default SpecialModal;
