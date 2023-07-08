import styled from "styled-components";

import { T7Medium } from "@components/Typography";

import colors from "@constants/colors";

interface MenuItemProps {
  menu: string;
  icon: React.FunctionComponent;
}

const MenuItem = ({ menu, icon: Icon }: MenuItemProps) => {
  return (
    <Container>
      <Icon />
      <T7Medium>{menu}</T7Medium>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;

  height: 40px;

  padding: 8px 20px;
  margin-right: 4px;

  border: 1px solid ${colors.blueGray100};
  border-radius: 10px;

  background-color: ${colors.white};
  color: ${colors.blueGray600};

  box-sizing: border-box;

  svg {
    width: 24px;
    margin-right: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`;

export default MenuItem;
