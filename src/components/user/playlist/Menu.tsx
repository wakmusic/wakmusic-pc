import styled from "styled-components";

import { ReactComponent as Create } from "@assets/svgs/create.svg";
import { ReactComponent as Import } from "@assets/svgs/import.svg";

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
`;

export default Menu;
