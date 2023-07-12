import styled from "styled-components";

import { ReactComponent as DeleteSVG } from "@assets/icons/ic_16_close.svg";

import { T7Medium } from "@components/Typography";

import colors from "@constants/colors";

interface HistoryItemProps {
  children: string;
  focus: boolean;
  onClick: (text: string) => void;
  onDelete: (text: string) => void;
}

const HistoryItem = ({
  children,
  focus,
  onClick,
  onDelete,
}: HistoryItemProps) => {
  return (
    <Container
      tabIndex={0}
      $focus={focus}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClick(children);
        }
      }}
    >
      <Text>{children}</Text>
      <DeleteButton color={colors.gray500} onClick={() => onDelete(children)} />
    </Container>
  );
};

const Container = styled.div<{ $focus: boolean }>`
  height: 24px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 8px;

  cursor: pointer;
  outline: none;

  &:hover {
    background: ${colors.gray600};
  }

  background: ${({ $focus }) => ($focus ? colors.gray600 : "transparent")};
`;

const Text = styled(T7Medium)`
  max-width: 114px;

  color: ${colors.gray400};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const DeleteButton = styled(DeleteSVG)`
  cursor: pointer;
`;

export default HistoryItem;
