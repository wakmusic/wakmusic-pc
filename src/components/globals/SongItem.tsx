import { useMemo } from "react";
import styled, { css } from "styled-components/macro";

import { ReactComponent as MoveSVG } from "@assets/icons/ic_24_move.svg";

import { T7_1Light } from "@components/Typography";

import colors from "@constants/colors";

import { usePlaySong } from "@hooks/player";

import { Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

import { formatDate, formatNumber } from "@utils/formatting";
import { isNumber } from "@utils/isTypes";

import Rank from "./Rank";
import Track from "./Track";

interface SongItemProps {
  song?: Song;

  rank?: number;
  editMode?: boolean;
  features?: (SongItemFeature | undefined)[];
  selected?: boolean;

  onClick?: (song: Song, shift: boolean) => void;
  onEdit?: (event: React.MouseEvent) => void;

  useIncrease?: boolean;
  forceWidth?: number;

  isLoading?: boolean;
}

const featureBuilder = (
  song: Song | undefined,
  feature: SongItemFeature | undefined,
  useIncrease?: boolean
) => {
  if (!song) return null;

  switch (feature) {
    case SongItemFeature.last:
      return song.chart.last ? `${song.chart.last}위` : "-";
    case SongItemFeature.date:
      return formatDate(song.date);
    case SongItemFeature.views:
      return `${formatNumber(
        useIncrease ? song.chart.increase : song.views
      )}회`;
    case SongItemFeature.like:
      return formatNumber(song.like);
    default:
      return null;
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
  useIncrease,
  forceWidth,
  isLoading,
}: SongItemProps) => {
  const playSong = usePlaySong();

  const featureTexts = useMemo(
    () =>
      features?.map((feature) => featureBuilder(song, feature, useIncrease)) ??
      [],
    [song, features, useIncrease]
  );

  const width = useMemo(() => {
    if (forceWidth) return forceWidth;

    if (rank) return 436;
    if (editMode) return 440;

    return 480;
  }, [rank, editMode, forceWidth]);

  return (
    <Container
      onClick={(e) =>
        e.detail === 1 && onClick && song && onClick(song, e.shiftKey)
      }
      onDoubleClick={() => song && playSong(song)}
      $selected={selected}
    >
      <Info>
        {rank && (
          <Rank now={rank} last={song?.chart?.last} isLoading={isLoading} />
        )}
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
            isLoading={isLoading}
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

const Container = styled.div<{ $selected?: boolean }>`
  height: 64px;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0px 20px;

  cursor: pointer;

  ${({ $selected }) =>
    $selected
      ? css`
          background-color: ${colors.blueGray200};
        `
      : css`
          &:hover {
            background-color: ${colors.blueGray100};
          }
        `}
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
