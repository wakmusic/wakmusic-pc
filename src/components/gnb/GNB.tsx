import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";
import { SectionData } from "@constants/gnb";

import { useLoginModalOpener } from "@hooks/loginModal";

import Section from "./Section";

interface GNB {}

const GNB = ({}: GNB) => {
  const location = useLocation();

  const loginModalOpener = useLoginModalOpener();

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

      <Login onClick={() => loginModalOpener()}>
        <T6Medium
          style={{
            color: colors.blueGray600,
          }}
        >
          로그인 하기
        </T6Medium>
      </Login>
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

const Login = styled.div`
  margin-top: 12px;

  width: 150px;
  height: 52px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GNB;
