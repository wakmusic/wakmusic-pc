import styled, { css } from "styled-components";

import { ReactComponent as BlowupSVG } from "@assets/icons/ic_16_blowup.svg";
import { ReactComponent as DownSVG } from "@assets/icons/ic_16_down.svg";
import { ReactComponent as UpSVG } from "@assets/icons/ic_16_up.svg";
import { ReactComponent as ZeroSVG } from "@assets/icons/ic_16_zero.svg";

import { T4Bold, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface RankProps {
  now: number;
  last: number;
}

const Rank = ({ now, last }: RankProps) => {
  return (
    <Container>
      <T4Bold>{now}</T4Bold>
      <Info>
        {last === 0 ? (
          <Text color={colors.yellow} $noWidth>
            NEW
          </Text>
        ) : now === last ? (
          <ZeroSVG />
        ) : last > 100 ? (
          <BlowupSVG />
        ) : now < last ? (
          <>
            <UpSVG />
            <Text color={colors.up}>{last - now}</Text>
          </>
        ) : (
          <>
            <DownSVG />
            <Text color={colors.down}>{now - last}</Text>
          </>
        )}
      </Info>
    </Container>
  );
};

const Container = styled.div`
  width: 36px;
  height: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: 8px;
`;

const Info = styled.div`
  width: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled(T6Medium)<{ color: string; $noWidth?: boolean }>`
  text-align: center;

  ${({ color, $noWidth }) => css`
    width: ${$noWidth ? "auto" : "16px"};
    color: ${color};
  `}
`;

export default Rank;
