import styled from "styled-components/macro";

import { ReactComponent as Create } from "@assets/icons/ic_24_playadd_600.svg";
import { ReactComponent as Import } from "@assets/icons/ic_24_share.svg";

import MenuItem from "./MenuItem";

interface MenuProps {}

const Menu = ({}: MenuProps) => {
  return (
    <Container>
      <MenuItem menu="리스트 만들기" icon={Create} />
      <MenuItem menu="리스트 가져오기" icon={Import} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

export default Menu;
