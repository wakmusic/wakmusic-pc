import styled, { css } from "styled-components";

import { ReactComponent as BlowupSVG } from "@assets/icons/ic_16_blowup.svg";
import { ReactComponent as DownSVG } from "@assets/icons/ic_16_down.svg";
import { ReactComponent as UpSVG } from "@assets/icons/ic_16_up.svg";
import { ReactComponent as ZeroSVG } from "@assets/icons/ic_16_zero.svg";

import { T4Bold, T5Medium, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface ChartItemProps {
  rank: number;

  // TODO: Interface 작업 예정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const ChartItem = ({ rank, item }: ChartItemProps) => {
  return (
    <Container>
      <Rank>
        <RankText>{rank}</RankText>
        <RankInfo>
          {item.hourly.last === 0 ? (
            <RankInfoText color={colors.yellow} $noWidth>
              NEW
            </RankInfoText>
          ) : rank === item.hourly.last ? (
            <ZeroSVG />
          ) : item.hourly.last > 100 ? (
            <BlowupSVG />
          ) : rank < item.hourly.last ? (
            <>
              <UpSVG />
              <RankInfoText color={colors.up}>
                {item.hourly.last - rank}
              </RankInfoText>
            </>
          ) : (
            <>
              <DownSVG />
              <RankInfoText color={colors.down}>
                {rank - item.hourly.last}
              </RankInfoText>
            </>
          )}
        </RankInfo>
      </Rank>
      <Thumbnail src={`https://i.ytimg.com/vi/${item.songId}/hqdefault.jpg`} />
      <TrackInfo>
        <TrackTitle>{item.title}</TrackTitle>
        <TrackArtist>{item.artist}</TrackArtist>
      </TrackInfo>
    </Container>
  );
};

const Container = styled.div`
  width: 356px;
  height: 64px;

  display: flex;
  align-items: center;
`;

const Rank = styled.div`
  width: 36px;
  height: 50px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: 8px;
`;

const RankText = styled(T4Bold)``;

const RankInfo = styled.div`
  width: 36px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const RankInfoText = styled(T6Medium)<{ color: string; $noWidth?: boolean }>`
  text-align: center;

  ${({ color, $noWidth }) => css`
    width: ${$noWidth ? "auto" : "16px"};
    color: ${color};
  `}
`;

const Thumbnail = styled.img`
  margin-right: 8px;

  width: 78px;
  height: 44px;

  object-fit: cover;
  border-radius: 4px;
`;

const TrackInfo = styled.div``;

const TrackTitle = styled(T5Medium)`
  color: ${colors.gray700};
`;

const TrackArtist = styled(T6Medium)`
  color: ${colors.blueGray500};
`;

export default ChartItem;
