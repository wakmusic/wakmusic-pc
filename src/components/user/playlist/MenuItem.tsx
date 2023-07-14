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
      <Text>{menu}</Text>
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

  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(62.5px);

  svg {
    width: 24px;
    margin-right: 4px;
  }

  &:hover {
    cursor: pointer;
  }
`;

const Text = styled(T7Medium)`
  color: ${colors.blueGray600};
`;

export default MenuItem;
