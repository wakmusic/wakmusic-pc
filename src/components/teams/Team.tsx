import styled, { css } from "styled-components/macro";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useCreditModal } from "@hooks/creditModal";

import { getTeamColor } from "@utils/utils";

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
    <Container $color={getTeamColor(name)} onClick={onClick}>
      <T6Medium color={colors.blueGray500}>{name}</T6Medium>
    </Container>
  );
};

const Container = styled.div<{ $color: [number, number, number] }>`
  width: 100%;
  height: 68px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  border-radius: 16px;
  background-color: ${colors.white};

  &:hover {
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
  }
`;

export default Team;
