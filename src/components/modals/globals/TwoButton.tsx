import { T4Bold } from "@components/Typography";

import colors from "@constants/colors";

import { Button, ButtonContainer } from "./buttonStyle";

interface TwoButtonProps {
  ok: () => void;
  cancel: () => void;
  disabled?: boolean;
}

const TwoButton = ({ ok, cancel, disabled }: TwoButtonProps) => {
  return (
    <ButtonContainer>
      <Button color={colors.blueGray400} onClick={cancel}>
        <T4Bold color={colors.blueGray25}>취소</T4Bold>
      </Button>
      <Button
        color={colors.point}
        onClick={disabled ? undefined : ok}
        disabled={disabled}
      >
        <T4Bold color={colors.blueGray25}>확인</T4Bold>
      </Button>
    </ButtonContainer>
  );
};

export default TwoButton;
