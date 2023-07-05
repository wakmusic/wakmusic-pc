import Lottie from "lottie-react";
import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { Pretendard } from "@components/Typography";

import colors from "@constants/colors";

interface Section {
  path: string;
  icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
    }
  >;
  lottie: object;
  children: string;
}

const Section = ({ path, icon: Icon, lottie, children }: Section) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container
      onClick={() => {
        navigate(path);
      }}
    >
      <IconContainer>
        {location.pathname === path ? (
          <Lottie
            animationData={lottie}
            loop={false}
            style={{
              width: 40,
              height: 40,
            }}
          />
        ) : (
          <Icon />
        )}
      </IconContainer>

      <Text $activated={location.pathname === path}>{children}</Text>
    </Container>
  );
};

const Container = styled.div`
  height: 40px;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const Text = styled(Pretendard)<{ $activated: boolean }>`
  margin-left: 8px;

  /* T5 */
  font-size: 16px;
  line-height: 22px;

  ${({ $activated }) =>
    $activated
      ? css`
          /* T5Bold */
          font-weight: 700;
          color: ${colors.blueGray600};
        `
      : css`
          /* T5Medium */
          font-weight: 500;
          color: ${colors.blueGray400};
        `}
`;

const IconContainer = styled.div``;

export default Section;
