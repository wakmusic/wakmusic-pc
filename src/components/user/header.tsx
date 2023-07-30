import { myListState } from "@state/user/atoms";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled, { css } from "styled-components/macro";

import { T6Medium } from "@components/Typography";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";

import colors from "@constants/colors";
import { userTabs } from "@constants/tabs";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  const location = useLocation();
  const [isEditMode, setEditMode] = useRecoilState(myListState);

  const toggleEditMode = () => {
    setEditMode(!isEditMode);
  };

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
        <Edit $activated={isEditMode} onClick={toggleEditMode}>
          <T6Medium
            style={{ color: isEditMode ? colors.point : colors.blueGray400 }}
          >
            {isEditMode ? "완료" : "편집"}
          </T6Medium>
        </Edit>
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
