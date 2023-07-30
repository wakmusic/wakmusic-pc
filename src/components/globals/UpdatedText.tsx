import { useMemo } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as CheckSVG } from "@assets/icons/ic_16_check.svg";

import { T7Light } from "@components/Typography";

import colors from "@constants/colors";

interface UpdatedTextProps {
  updated: string;

  marginTop?: number;
  marginLeft?: number;
}

const UpdatedText = ({ updated, marginTop, marginLeft }: UpdatedTextProps) => {
  const text = useMemo(() => {
    const date = new Date(Number(updated) * 1000);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate() + 1).padStart(2, "0");
    const ampm = date.getHours() > 12 ? "오후" : "오전";
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();

    return `${month}월 ${day}일 ${ampm} ${hour}시 업데이트`;
  }, [updated]);

  return (
    <Container $marginTop={marginTop} $marginLeft={marginLeft}>
      <CheckSVG />
      <T7Light>{text}</T7Light>
    </Container>
  );
};

const Container = styled.div<{ $marginTop?: number; $marginLeft?: number }>`
  display: flex;
  align-items: center;
  gap: 2px;

  color: ${colors.blueGray500};

  ${({ $marginTop }) =>
    $marginTop &&
    css`
      margin-top: ${$marginTop}px;
    `}

  ${({ $marginLeft }) =>
    $marginLeft &&
    css`
      margin-left: ${$marginLeft}px;
    `}
`;

export default UpdatedText;
