import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import Section from "./Section";

interface GNB {}

const GNB = ({}: GNB) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigatorToEndPoint = {
    home: "/",
    chart: "/chart",
    search: "/new",
    artist: "/artist",
    keep: "/user/playlists",
  };

  return (
    <Container>
      <Navigator>
        {["home", "chart", "search", "artist", "keep"].map((type, index) => (
          <Section
            type={type as "artist" | "chart" | "home" | "keep" | "search"}
            key={index}
            isActived={
              location.pathname ===
              navigatorToEndPoint[
                type as "artist" | "chart" | "home" | "keep" | "search"
              ]
            }
            onClick={() => {
              navigate(
                navigatorToEndPoint[
                  type as "artist" | "chart" | "home" | "keep" | "search"
                ]
              );
            }}
          />
        ))}
      </Navigator>
      <Login>
        <Text>로그인 하기</Text>
      </Login>
    </Container>
  );
};

const Container = styled.div`
  width: 186px;
  height: 676px;

  float: left;
`;

const Navigator = styled.div`
  width: 150px;
  height: 260px;

  margin-top: 19.5px;
  margin-left: 20px;
  margin-right: 16px;
  padding-top: 20px;
  padding-bottom: 20px;

  flex-shrink: 0;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: #ffffff66; //${colors.white}
  backdrop-filter: blur(62.5px);

  div {
    &:not(:last-child) {
      margin-bottom: 15px;
    }
  }
`;

const Login = styled.div`
  width: 150px;
  height: 52px;

  margin-top: 12px;
  margin-left: 20px;
  margin-right: 16px;

  flex-shrink: 0;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: #ffffff66; //${colors.white}
  backdrop-filter: blur(62.5px);

  cursor: pointer;
`;

const Text = styled(T6Medium)`
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  text-align: center;

  color: ${colors.blueGray600};
`;

export default GNB;
