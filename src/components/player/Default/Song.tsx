import { useNavigate } from "react-router-dom";
import { queryClient } from "src/main";
import styled from "styled-components/macro";

import { fetchArtistList } from "@apis/artist";

import { T4Medium, T5Light } from "@components/Typography";
import Marquee from "@components/globals/Marquee";

import colors from "@constants/colors";

import { useCurrentSongState } from "@hooks/player";

import Controller from "../Controller";
import Like from "../Like";
import View from "../View";

interface SongProps {}

const Song = ({}: SongProps) => {
  const song = useCurrentSongState();
  const navigate = useNavigate();

  const artistClick = async () => {
    const artists = await queryClient.fetchQuery({
      queryKey: "artists",
      queryFn: fetchArtistList,
    });

    const artist = artists.find((artist) => artist.name === song?.artist);

    if (artist) {
      navigate(`/artists/${artist.artistId}`);
    }
  };

  return (
    <Container>
      <UpperContainer>
        <Like />

        <TitleContainer>
          <Marquee width={200}>
            <TitleText>{song?.title || "왁뮤차트 TOP100"} </TitleText>
          </Marquee>

          <Marquee width={200}>
            <ArtistText onClick={artistClick}>
              {song?.artist || "재생 버튼을 클릭해보세요."}
            </ArtistText>
          </Marquee>
        </TitleContainer>

        <View />
      </UpperContainer>

      <Controller />
    </Container>
  );
};

const Container = styled.div`
  height: 136px;

  padding-top: 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UpperContainer = styled.div`
  padding-bottom: 16px;

  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  width: 200px;
  height: 52px;

  margin: 0 8px;

  text-align: center;
`;

const TitleText = styled(T4Medium)`
  color: ${colors.blueGray25};
`;

const ArtistText = styled(T5Light)`
  color: ${colors.blueGray100};
  opacity: 0.6;
`;

export default Song;
