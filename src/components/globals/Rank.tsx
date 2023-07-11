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

const RankInfo = ({ now, last }: RankProps) => {
  // 새로 올라온 곡
  if (last === 0) {
    return (
      <Text color={colors.yellow} $noWidth>
        NEW
      </Text>
    );
  }

  // 변동이 없는 곡
  if (now === last) {
    return <ZeroSVG />;
  }

  // 순위가 100위 이상 올라간 곡
  if (last - now > 100) {
    return <BlowupSVG />;
  }

  // 순위가 올라간 곡
  if (now < last) {
    return (
      <>
        <UpSVG />
        <Text color={colors.up}>{last - now}</Text>
      </>
    );
  }

  // 순위가 내려간 곡
  return (
    <>
      <DownSVG />
      <Text color={colors.down}>{now - last}</Text>
    </>
  );
};

const Rank = ({ now, last }: RankProps) => {
  return (
    <Container>
      <T4Bold>{now}</T4Bold>
      <Info>
        <RankInfo now={now} last={last} />
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
