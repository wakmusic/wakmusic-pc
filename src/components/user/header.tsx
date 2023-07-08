import styled from "styled-components";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import Nav from "./Nav";

interface NavProps {
  isEditMode: boolean;
}

const Header = ({}: NavProps) => {
  return (
    <Container>
      <Nav />
      <Edit>
        <T6Medium>편집</T6Medium>
      </Edit>
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

  color: ${colors.blueGray400};
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
  }
`;

export default Header;
