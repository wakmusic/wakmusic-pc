import styled, { css } from "styled-components/macro";

import { ReactComponent as PlaySVG } from "@assets/icons/ic_30_play_point.svg";

import { T5Medium, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface TrackProps {
  // TODO: Interface 작업 예정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (item: any) => void;

  maxWidth?: number;
}

const Track = ({ item, onClick, maxWidth }: TrackProps) => {
  const onClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    onClick && onClick(item);
  };

  return (
    <Container onClick={onClickHandler}>
      <PlayIcon />

      <Thumbnail src={`https://i.ytimg.com/vi/${item.songId}/default.jpg`} />

      <TrackInfo>
        <TrackTitle $maxWidth={maxWidth}>{item.title}</TrackTitle>
        <TrackArtist $maxWidth={maxWidth}>{item.artist}</TrackArtist>
      </TrackInfo>
    </Container>
  );
};

const PlayIcon = styled(PlaySVG)`
  display: none;

  z-index: 1;
`;

const Thumbnail = styled.img`
  margin-right: 8px;

  width: 78px;
  height: 44px;

  object-fit: cover;
  border-radius: 4px;
`;

const Container = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  cursor: pointer;

  &:hover ${Thumbnail} {
    filter: brightness(0.4);
  }

  &:hover ${PlayIcon} {
    display: block;

    position: absolute;
    left: 18px;
    top: 7px;
  }
`;

const TrackInfo = styled.div``;

const TrackStyle = css<{ $maxWidth?: number }>`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;

  max-width: ${({ $maxWidth }) => $maxWidth ?? 206}px;
`;

const TrackTitle = styled(T5Medium)<{ $maxWidth?: number }>`
  ${TrackStyle};
  color: ${colors.gray700};
`;

const TrackArtist = styled(T6Medium)<{ $maxWidth?: number }>`
  ${TrackStyle};
  color: ${colors.blueGray500};
`;

export default Track;
