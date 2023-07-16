import { T4Bold } from "@components/Typography";

import colors from "@constants/colors";

import { Button, ButtonContainer } from "./buttonStyle";

interface OkButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const OkButton = ({ onClick, disabled }: OkButtonProps) => {
  return (
    <ButtonContainer>
      <Button
        color={colors.point}
        onClick={disabled ? undefined : onClick}
        disabled={disabled}
        $big
      >
        <T4Bold color={colors.blueGray25}>확인</T4Bold>
      </Button>
    </ButtonContainer>
  );
};

export default OkButton;
