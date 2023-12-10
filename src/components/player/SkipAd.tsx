import styled, { css } from "styled-components/macro";

import { ReactComponent as SkipSvg } from "@assets/icons/ic_20_next_on.svg";

import { T5Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useAdState } from "@hooks/player";

interface SkipAdProps {}

const SkipAd = ({}: SkipAdProps) => {
  const [ad, setAd] = useAdState();

  if (!ad.isAd) {
    return null;
  }

  return (
    <Container
      $canSkip={ad.canSkip}
      onClick={() => {
        setAd({ ...ad, skip: ad.skip + 1 });
      }}
    >
      <T5Medium>
        {ad.canSkip
          ? "광고 건너뛰기"
          : `${Math.round(ad.duration - ad.current)}초 후 건너뛰기`}
      </T5Medium>

      {ad.canSkip && <SkipIcon />}
    </Container>
  );
};

const Container = styled.div<{ $canSkip: boolean }>`
  position: absolute;
  right: 5px;
  bottom: 5px;

  padding: 4px 8px;

  --color: ${({ $canSkip }) => ($canSkip ? colors.gray400 : colors.gray500)};

  border-radius: 2px;
  border: 1px solid var(--color);
  background: ${colors.gray900};
  color: var(--color);

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  ${({ $canSkip }) =>
    $canSkip &&
    css`
      cursor: pointer;
    `}
`;

const SkipIcon = styled(SkipSvg)`
  margin-bottom: 2px;
`;

export default SkipAd;
