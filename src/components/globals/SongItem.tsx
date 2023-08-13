import { useMemo } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as MoveSVG } from "@assets/icons/ic_24_move.svg";

import { T7_1Light } from "@components/Typography";

import colors from "@constants/colors";

import { Song } from "@templates/song";

import { formatDate, formatNumber } from "@utils/formatting";
import getChartData from "@utils/getChartData";

import Rank from "./Rank";
import Track from "./Track";

interface SongItemProps {
  song: Song;

  rank?: number;
  editMode?: boolean;
  features?: SongItemFeature[];
  selected?: boolean;

  onClick?: (song: Song) => void;
  onEdit?: (event: React.MouseEvent) => void;

  noPadding?: boolean;
}

export enum SongItemFeature {
  last,
  date,
  views,
  like,
}

const featureBuilder = (
  song: Song,
  chartData: {
    views: number;
    increase: number;
    last: number;
  },
  feature: SongItemFeature
) => {
  switch (feature) {
    case SongItemFeature.last:
      return `${chartData.last}위`;
    case SongItemFeature.date:
      return formatDate(song.date);
    case SongItemFeature.views:
      return `${formatNumber(chartData.views)}회`;
    case SongItemFeature.like:
      return formatNumber(song.like);
  }
};

const SongItem = ({
  song,
  rank,
  editMode,
  features,
  selected,
  onClick,
  onEdit,
  noPadding,
}: SongItemProps) => {
  const chartData = useMemo(() => getChartData(song), [song]);
  const featureTexts = useMemo(
    () =>
      features?.map((feature) => featureBuilder(song, chartData, feature)) ??
      [],
    [song, chartData, features]
  );

  const width = useMemo(() => {
    if (rank) return 436;
    if (editMode) return 440;

    return 480;
  }, [rank, editMode]);

  return (
    <Container
      onClick={() => onClick && onClick(song)}
      $selected={selected}
      $noPadding={noPadding}
    >
      {rank && <Rank now={rank} last={chartData.last} />}
      {editMode && (
        <MoveButton
          onMouseDown={(e) => {
            onEdit && onEdit(e);
          }}
        />
      )}

      <TrackWrapper $width={width}>
        <Track item={song} maxWidth={width - 80} />
      </TrackWrapper>

      {featureTexts.map((text, index) => (
        <Feature key={index}>{text}</Feature>
      ))}
    </Container>
  );
};

const Container = styled.div<{ $selected?: boolean; $noPadding?: boolean }>`
  height: 64px;

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

const MoveButton = styled(MoveSVG)`
  margin-left: 8px;
  margin-right: 16px;
`;

const TrackWrapper = styled.div<{ $width: number }>`
  width: ${({ $width }) => $width}px;

  margin-left: -1px;

  display: flex;
`;

const Feature = styled(T7_1Light)`
  width: 70px;
  text-align: center;

  color: ${colors.gray700};
`;

export default SongItem;
