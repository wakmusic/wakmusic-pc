import { T4Bold } from "@components/Typography";

import colors from "@constants/colors";

import { Button, ButtonContainer } from "./buttonStyle";

interface TwoButtonProps {
  ok: () => void;
  cancel: () => void;
  disabled?: boolean;

  okText?: string;
  cancelText?: string;
  noRadius?: boolean;
}

const TwoButton = ({
  ok,
  cancel,
  disabled,
  okText = "확인",
  cancelText = "취소",
  noRadius,
}: TwoButtonProps) => {
  return (
    <ButtonContainer>
      <Button
        color={colors.blueGray400}
        onClick={cancel}
        style={
          noRadius
            ? undefined
            : {
                borderEndStartRadius: "24px",
              }
        }
      >
        <T4Bold color={colors.blueGray25}>{cancelText}</T4Bold>
      </Button>
      <Button
        color={colors.point}
        onClick={disabled ? undefined : ok}
        disabled={disabled}
        style={
          noRadius
            ? undefined
            : {
                borderEndEndRadius: "24px",
              }
        }
      >
        <T4Bold color={colors.blueGray25}>{okText}</T4Bold>
      </Button>
    </ButtonContainer>
  );
};

export default TwoButton;
