import { myListState } from "@state/user/atoms";
import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components";

import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";
import TextButton from "@components/globals/TextButton";

import colors from "@constants/colors";
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

const Edit = styled.button<{ $activated: boolean }>`
  padding: 4px 14px;

  border: 1px solid ${colors.blueGray200};
  border-radius: 5px;

  background-color: rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
  }

  ${({ $activated }) =>
    $activated
      ? css`
          border-color: ${colors.point};
        `
      : css`
          border-color: ${colors.blueGray200};
        `}
`;

export default Header;
