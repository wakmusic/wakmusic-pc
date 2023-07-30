import { myListState } from "@state/user/atoms";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";

import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";
import TextButton from "@components/globals/TextButton";

import { userTabs } from "@constants/tabs";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const location = useLocation();
  const [isEditMode, setEditMode] = useRecoilState(myListState);

  const toggleEditMode = useCallback(() => {
    setEditMode(!isEditMode);
  }, [setEditMode, isEditMode]);

  return (
    <Container>
      <TabBar>
        {userTabs.map((item, index) => (
          <Tab to={item.to} key={index}>
            {item.text}
          </Tab>
        ))}
      </TabBar>
      {location.pathname === "/user/playlists" && (
        <TextButton
          text={{
            default: "편집",
            activated: "완료",
          }}
          activated={isEditMode}
          onClick={toggleEditMode}
        />
      )}
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
