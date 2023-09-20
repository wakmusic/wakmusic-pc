import styled, { css } from "styled-components/macro";

import { T4Bold } from "@components/Typography";
import ArrowIcon from "@components/icons/Arrow";

import colors from "@constants/colors";

import { useToast } from "@hooks/toast";

interface HeaderProps {
  name: string;
  member?: boolean;
  isFirst: boolean;
  isLast: boolean;
  onLeft: () => void;
  onRight: () => void;
}

const Header = ({
  name,
  member,
  isFirst,
  isLast,
  onLeft,
  onRight,
}: HeaderProps) => {
  const toast = useToast();

  return (
    <Container>
      <Arrow direction="left" disabled={isFirst} onClick={onLeft} />
      <T4Bold
        color={colors.gray700}
        onClick={() => {
          if (!member) return;

          navigator.clipboard.writeText(name);
          toast("클립보드에 복사되었습니다.");
        }}
      >
        {name}
      </T4Bold>
      <Arrow direction="right" disabled={isLast} onClick={onRight} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Arrow = styled(ArrowIcon)<{ disabled: boolean }>`
  ${({ disabled }) =>
    disabled
      ? css`
          cursor: auto;
          color: ${colors.gray400};
        `
      : css`
          cursor: pointer;
          color: ${colors.gray500};
        `}
`;

export default Header;
