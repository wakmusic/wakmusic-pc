import styled from "styled-components";

import * as Typography from "@components/Typography";
import colors from "@constants/colors";

interface NavProps {
  isEditMode: boolean;
}

const Header = ({}: NavProps) => {
  return (
    <HeaderContainer>
      
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`

const NavTab = styled.div`
  
`

export default Header;
