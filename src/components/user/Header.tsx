import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";

import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";
import TextButton from "@components/globals/TextButton";

import { userTabs } from "@constants/tabs";

import { useLikesState } from "@hooks/likes";
import { useMylistState } from "@hooks/mylist";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const location = useLocation();
  const [isMylistEditMode, setMylistEditMode] = useMylistState();
  const [isLikesEditMode, setLikesEditMode] = useLikesState();

  const toggleEditMode = () => {
    if (location.pathname === "/user/playlists") {
      setMylistEditMode(!isMylistEditMode);
    } else {
      setLikesEditMode(!isLikesEditMode);
    }
  };

  const isEditMode = useMemo(() => {
    if (location.pathname === "/user/playlists") {
      return isMylistEditMode;
    } else {
      return isLikesEditMode;
    }
  }, [location, isMylistEditMode, isLikesEditMode]);

  return (
    <Container>
      <TabBar>
        {userTabs.map((item, index) => (
          <Tab to={item.to} key={index}>
            {item.text}
          </Tab>
        ))}
      </TabBar>
      <TextButton
        text={{
          default: "편집",
          activated: "완료",
        }}
        activated={isEditMode}
        onClick={toggleEditMode}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 714px;

  margin: auto;
`;

export default Header;
