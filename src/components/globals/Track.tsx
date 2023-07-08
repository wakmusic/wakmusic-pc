import styled from "styled-components";

import { T5Medium, T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface TrackProps {
  // TODO: Interface 작업 예정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const Track = ({ item }: TrackProps) => {
  return (
    <Container>
      <Thumbnail src={`https://i.ytimg.com/vi/${item.songId}/hqdefault.jpg`} />

      <TrackInfo>
        <TrackTitle>{item.title}</TrackTitle>
        <TrackArtist>{item.artist}</TrackArtist>
      </TrackInfo>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const Thumbnail = styled.img`
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

export default Track;
