import { useLocation, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

import { Pretendard } from "@components/Typography";

import colors from "@constants/colors";

interface NavProps {}

const Locations = {
  myList: "/user/playlists",
  likes: "/user/likes",
};

const Nav = ({}: NavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const nav = (path: string) => {
    navigate(path);
  };

  return (
    <Container>
      <TabContainer>
        <Tab
          $activated={location.pathname === Locations.myList}
          onClick={() => {
            nav(Locations.myList);
          }}
          style={{ marginRight: "4px" }}
        >
          <Pretendard>내 리스트</Pretendard>
        </Tab>
        <Tab
          $activated={location.pathname === Locations.likes}
          onClick={() => {
            nav(Locations.likes);
          }}
        >
          <Pretendard>좋아요</Pretendard>
        </Tab>
      </TabContainer>
      <Indicater $indicate={location.pathname} />
    </Container>
  );
};

const Container = styled.div``;

const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Tab = styled.div<{ $activated: boolean }>`
  display: flex;
  align-items: center;

  width: 50px;
  height: 38px;

  font-size: 14px;

  ${({ $activated }) =>
    $activated
      ? css`
          font-weight: 700;
        `
      : css`
          font-weight: 500;
          color: ${colors.blueGray400};
        `}

  &:hover {
    cursor: pointer;
  }

  p {
    margin: auto;
  }
`;

const Indicater = styled.div<{ $indicate: string }>`
  width: 50px;
  height: 2px;

  border-radius: 1px;

  background-color: ${colors.point};

  transition: margin 0.3s ease-out;

  ${({ $indicate }) =>
    $indicate === Locations.myList
      ? css``
      : css`
          margin-left: 54px;
        `}
`;

export default Nav;
