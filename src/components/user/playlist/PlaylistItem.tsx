import styled from "styled-components";

import { ReactComponent as PlayAll } from "@assets/svgs/play_all.svg";

import { T6Medium, T7Light } from "@components/Typography";

import colors from "@constants/colors";

interface PlaylistItemProps {
  // api 작업후에 interface 작업하겠습니다
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const PlaylistItem = ({ item }: PlaylistItemProps) => {
  const song_volume = item.songs.length;

  return (
    <Container>
      <Icon
        src={`https://static.wakmusic.xyz/static/playlist/${item.image.version}.png`}
      />
      <InfoContainer>
        <Title>{item.title}</Title>
        <Volume>{song_volume}곡</Volume>
        <PlayAll />
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  width: 222px;
  height: 74px;

  margin: 0px 16px 16px 0px;
`;

const Icon = styled.img`
  width: 74px;
  height: 74px;

  border-radius: 9px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  height: 70px;

  margin-left: 8px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const Title = styled(T6Medium)`
  color: ${colors.gray700};
`;

const Volume = styled(T7Light)`
  color: ${colors.blueGray500};
`;

export default PlaylistItem;
