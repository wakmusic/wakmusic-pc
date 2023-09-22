import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";
import { SectionData } from "@constants/gnb";

import { isMyPage } from "@utils/utils";

import Section from "./Section";
import User from "./User";

interface GNB {}

const GNB = ({}: GNB) => {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/player") return null;

  return (
    <Container>
      <Navigator>
        {SectionData.map((item, index) => (
          <Section
            path={item.path}
            icon={item.icon}
            lottie={item.lottie}
            key={index}
          >
            {item.name}
          </Section>
        ))}
      </Navigator>

      <User />

      {isMyPage(location.pathname) && (
        <TeamContainer>
          <Team onClick={() => navigate("/teams")}>
            <T6Medium color={colors.blueGray400}>왁뮤 팀 소개</T6Medium>
          </Team>
        </TeamContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 16px;
`;

const Navigator = styled.div`
  width: 150px;
  height: 300px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);

  padding: 20px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TeamContainer = styled.div`
  width: 100%;

  display: flex;
  justify-content: center;
`;

const Team = styled.div`
  width: 104px;
  height: 36px;

  position: fixed;
  bottom: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${colors.blueGray200};
  border-radius: 99px;

  cursor: pointer;
`;

export default GNB;
