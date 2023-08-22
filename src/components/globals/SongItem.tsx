import { useMemo } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as MoveSVG } from "@assets/icons/ic_24_move.svg";

import { T7_1Light } from "@components/Typography";

import colors from "@constants/colors";

import { Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

import { formatDate, formatNumber } from "@utils/formatting";
import getChartData from "@utils/getChartData";
import { isNumber } from "@utils/isTypes";

import Rank from "./Rank";
import Track from "./Track";

interface SongItemProps {
  song: Song;
  index?: number;

  rank?: number;
  editMode?: boolean;
  features?: (SongItemFeature | undefined)[];
  selected?: boolean;

  onClick?: (song: Song, index?: number) => void;
  onEdit?: (event: React.MouseEvent) => void;

  useIncrease?: boolean;
  noPadding?: boolean;
  forceWidth?: number;
}

const featureBuilder = (
  song: Song,
  chartData: {
    views: number;
    increase: number;
    last: number;
  },
  feature: SongItemFeature | undefined,
  useIncrease?: boolean
) => {
  switch (feature) {
    case SongItemFeature.last:
      return chartData.last ? `${chartData.last}위` : "-";
    case SongItemFeature.date:
      return formatDate(song.date);
    case SongItemFeature.views:
      return `${formatNumber(
        useIncrease ? chartData.increase : chartData.views
      )}회`;
    case SongItemFeature.like:
      return formatNumber(song.like);
    default:
      return null;
  }
};

const SongItem = ({
  song,
  index,
  rank,
  editMode,
  features,
  selected,
  onClick,
  onEdit,
  noPadding,
  useIncrease,
  forceWidth,
}: SongItemProps) => {
  const chartData = useMemo(() => getChartData(song), [song]);
  const featureTexts = useMemo(
    () =>
      features?.map((feature) =>
        featureBuilder(song, chartData, feature, useIncrease)
      ) ?? [],
    [song, chartData, features, useIncrease]
  );

  const width = useMemo(() => {
    if (forceWidth) return forceWidth;

    if (rank) return 436;
    if (editMode) return 440;

    return 480;
  }, [rank, editMode, forceWidth]);

  return (
    <Container
      onClick={() => onClick && onClick(song, index)}
      $selected={selected}
      $noPadding={noPadding}
    >
      <Info>
        {rank && <Rank now={rank} last={chartData.last} />}
        {editMode && (
          <MoveButton
            onMouseDown={(e) => {
              onEdit && onEdit(e);
            }}
          />
        )}

        <TrackWrapper>
          <Track
            item={song}
            maxWidth={isNumber(width) ? width - 80 : undefined}
          />
        </TrackWrapper>
      </Info>

      <Features>
        {featureTexts.map((text, index) => (
          <Feature key={index}>{text}</Feature>
        ))}
      </Features>
    </Container>
  );
};

const Container = styled.div<{ $selected?: boolean; $noPadding?: boolean }>`
  height: 64px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  ${({ $noPadding }) =>
    !$noPadding &&
    css`
      padding: 0px 20px;
    `}

  background-color: ${({ $selected }) =>
    $selected ? colors.blueGray200 : "transparent"};

  cursor: pointer;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const MoveButton = styled(MoveSVG)`
  margin-right: 8px;
`;

const TrackWrapper = styled.div`
  margin-left: -1px;
`;

const Features = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
`;

const Feature = styled(T7_1Light)`
  width: 70px;
  text-align: center;

  color: ${colors.gray700};
`;

export default SongItem;
