import styled, { css } from "styled-components/macro";

import { T6Medium } from "@components/Typography";

import colors, { teamColors } from "@constants/colors";

import { useCreditModal } from "@hooks/creditModal";

interface TeamProps {
  name: string;
  special?: boolean;
}

const Team = ({ name, special }: TeamProps) => {
  const openCreditModal = useCreditModal();

  function onClick() {
    openCreditModal({
      type: special ? "special" : "team",
      target: name,
    });
  }

  return (
    <Container onClick={onClick}>
      <PrettyBackground $color={teamColors[name] ?? [255, 255, 255]} />
      <Text color={colors.blueGray500}>{name}</Text>
    </Container>
  );
};

const PrettyBackground = styled.div<{ $color: [number, number, number] }>`
  position: relative;

  height: 100%;
  width: 100%;

  opacity: 0;
  transition: 0.5s;

  ${({ $color }) => {
    const colors = $color.join(", ");

    return css`
      background: linear-gradient(
          180deg,
          rgba(${colors}, 0.1) 0%,
          rgba(${colors}, 0) 100%
        ),
        #fff;
    `;
  }}
`;

const Container = styled.div`
  width: 100%;
  height: 68px;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;

  cursor: pointer;
  border-radius: 16px;
  background-color: ${colors.white};
  transition: 1s;

  &:hover {
    ${PrettyBackground} {
      opacity: 1;
    }
  }
`;

const Text = styled(T6Medium)`
  position: absolute;
`;

export default Team;
