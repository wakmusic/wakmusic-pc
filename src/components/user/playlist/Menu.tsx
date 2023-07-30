import styled from "styled-components/macro";

import { ReactComponent as Create } from "@assets/icons/ic_24_playadd_600.svg";
import { ReactComponent as Import } from "@assets/icons/ic_24_share.svg";

import IconButton from "@components/globals/IconButton";

interface MenuProps {}

const Menu = ({}: MenuProps) => {
  return (
    <Container>
      <IconButton icon={Create}>리스트 만들기</IconButton>
      <IconButton icon={Import}>리스트 가져오기</IconButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  gap: 4px;
`;

export default Menu;
