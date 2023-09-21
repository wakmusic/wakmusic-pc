import styled from "styled-components/macro";

import { ReactComponent as ViewsSvg } from "@assets/icons/ic_20_views.svg";
import { ReactComponent as ViewsBrightSvg } from "@assets/icons/ic_20_views_bright.svg";

import { T8Medium } from "@components/Typography";
import SimpleIconButton from "@components/globals/SimpleIconButton";

import colors from "@constants/colors";

import { useCurrentSongState } from "@hooks/player";

import { formatNumber } from "@utils/formatting";
import { openExternal } from "@utils/modules";

interface ViewProps {
  isBright?: boolean;
}

const View = ({ isBright }: ViewProps) => {
  const song = useCurrentSongState();

  const openYoutube = () => {
    const openFn = openExternal || ((url: string) => open(url, "_blank"));

    openFn(`https://youtu.be/${song?.songId}`);
  };

  return (
    <Container>
      <ViewsPopover>
        <ViewsText color={colors.blueGray25}>
          {formatNumber(song?.views)}
        </ViewsText>
      </ViewsPopover>
      <SimpleIconButton
        icon={isBright ? ViewsBrightSvg : ViewsSvg}
        onClick={openYoutube}
      />
    </Container>
  );
};

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

const Container = styled.div`
  &:hover ${ViewsPopover} {
    display: inherit;
  }
`;

const ViewsText = styled(T8Medium)`
  white-space: nowrap;
`;

export default View;
