import { useLocation } from "react-router-dom";
import styled from "styled-components";

import { T6Medium } from "@components/Typography";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";

import colors from "@constants/colors";
import { userTabs } from "@constants/tabs";

interface NavProps {
  isEditMode: boolean;
}

const Header = ({}: NavProps) => {
  const location = useLocation();

  return (
    <Container>
      <TabBar>
        {userTabs.map((item, index) => (
          <Tab to={item.to} key={index}>
            {item.text}
          </Tab>
        ))}
      </TabBar>
      {location.pathname === "/user/playlists" ? (
        <Edit>
          <EditText>편집</EditText>
        </Edit>
      ) : null}
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

const Edit = styled.button`
  padding: 4px 14px;

  border: 1px solid ${colors.blueGray200};
  border-radius: 5px;

  background-color: rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
  }
`;

const EditText = styled(T6Medium)`
  color: ${colors.blueGray400};
`;

export default Header;
