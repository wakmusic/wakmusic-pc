import styled from "styled-components";

import colors from "@constants/colors";

import HistoryItem from "./HistoryItem";

interface SearchDropdownProps {
  items: string[];
  focus: number | null;
  onClick: (text: string) => void;
  onDelete: (text: string) => void;
}

const SearchDropdown = ({ items, focus, ...props }: SearchDropdownProps) => {
  return (
    <Container>
      {items.map((item, index) => (
        <HistoryItem key={index} focus={index === focus} {...props}>
          {item}
        </HistoryItem>
      ))}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  z-index: 10;

  top: 24px;

  width: 150px;
  border-radius: 8px;
  background: ${colors.gray700};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.44);

  padding: 8px 0;

  overflow: hidden;
`;

export default SearchDropdown;
