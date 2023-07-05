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
  width: 118px;
  height: 40px;

  margin-left: 16px;
  margin-right: 16px;

  flex-shrink: 0;

  cursor: pointer;
`;

const Text = styled(Pretendard)<{ $activated: boolean }>`
  position: relative;

  top: 50%;
  transform: translateY(-50%);

  margin-left: 6px;

  display: inline-block;

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

const IconContainer = styled.div`
  float: left;
  display: flex;
`;

export default Section;
