import { useState } from "react";
import styled from "styled-components";

import { ReactComponent as HeartOffSvg } from "@assets/icons/ic_20_heart_off.svg";
import { ReactComponent as HeartOnSvg } from "@assets/icons/ic_20_heart_on.svg";
import { ReactComponent as ViewsSvg } from "@assets/icons/ic_20_views.svg";

import { T4Medium, T5Light, T8Medium } from "@components/Typography";

import colors from "@constants/colors";

import { formatNumber } from "@utils/formatting";

import Controller from "./Controller";
import IconButton from "./IconButton";

interface SongProps {
  song: {
    title: string;
    artist: string;
    views: number;
  };
}

const Song = ({ song }: SongProps) => {
  const [isLiked, setIsLiked] = useState(false);

  function changeIsLikeState() {
    setIsLiked(!isLiked);
  }

  return (
    <Container>
      <UpperContainer>
        <IconButton
          icon={isLiked ? HeartOnSvg : HeartOffSvg}
          onClick={changeIsLikeState}
        />

        <TitleContainer>
          <T4Medium color={colors.blueGray25}>{song.title}</T4Medium>
          <ArtistText color={colors.blueGray100}>{song.artist}</ArtistText>
        </TitleContainer>

        <ViewContainer>
          <ViewsPopover>
            <ViewsText color={colors.blueGray25}>
              {formatNumber(song.views)}
            </ViewsText>
          </ViewsPopover>
          <IconButton icon={ViewsSvg} />
        </ViewContainer>
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

  margin: 0 8px;

  text-align: center;
`;

const ArtistText = styled(T5Light)`
  opacity: 0.6;
`;

const ViewsPopover = styled.div`
  height: 18px;

  padding: 0 4px;

  position: absolute;
  transform: translate(calc(-50% + 10px), calc(-100% - 2px));

  align-items: center;
  justify-content: center;

  display: none;

  border-radius: 4px;
  background-color: ${colors.gray700};
  opacity: 0.8;
`;

const ViewContainer = styled.div`
  &:hover ${ViewsPopover} {
    display: inherit;
  }
`;

const ViewsText = styled(T8Medium)`
  white-space: nowrap;
`;

export default Song;
