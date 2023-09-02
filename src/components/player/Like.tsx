import styled from "styled-components/macro";

import { ReactComponent as HeartOffSvg } from "@assets/icons/ic_20_heart_off.svg";
import { ReactComponent as HeartOffBrightSvg } from "@assets/icons/ic_20_heart_off_bright.svg";
import { ReactComponent as HeartOnSvg } from "@assets/icons/ic_20_heart_on.svg";

import { T8Medium } from "@components/Typography";
import SimpleIconButton from "@components/globals/SimpleIconButton";

import colors from "@constants/colors";

import { useLikes } from "@hooks/likes";
import { useCurrentSongState } from "@hooks/player";

import { formatNumber } from "@utils/formatting";

interface LikeProps {
  isBright?: boolean;
}

const Like = ({ isBright }: LikeProps) => {
  const song = useCurrentSongState();

  const { liked, toggleLikes } = useLikes(song);

  function getIcon() {
    if (liked) {
      return HeartOnSvg;
    }

    return isBright ? HeartOffBrightSvg : HeartOffSvg;
  }

  return (
    <Container>
      <LikesPopover>
        <LikesText color={colors.blueGray25}>
          {formatNumber(song?.like)}
        </LikesText>
      </LikesPopover>
      <SimpleIconButton icon={getIcon()} onClick={toggleLikes} />
    </Container>
  );
};

const LikesPopover = styled.div`
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

const Container = styled.div`
  &:hover ${LikesPopover} {
    display: inherit;
  }
`;

const LikesText = styled(T8Medium)`
  white-space: nowrap;
`;

export default Like;
