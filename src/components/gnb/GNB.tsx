import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";

import colors from "@constants/colors";
import { SectionData } from "@constants/gnb";

import Section from "./Section";
import User from "./User";

interface GNB {}

const GNB = ({}: GNB) => {
  const location = useLocation();

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

export default GNB;
