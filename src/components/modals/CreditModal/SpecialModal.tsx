import styled from "styled-components/macro";

import { ReactComponent as CloseIcon } from "@assets/icons/ic_30_close.svg";

import { T3Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useTeam } from "@hooks/credit";
import { useCreditModalState } from "@hooks/modal";
import { useIsSpaceDisabled } from "@hooks/player";
import { useToast } from "@hooks/toast";

import { ModalContainer, ModalOverlay } from "../globals/modalStyle";
import Special from "./Special";

interface SpecialModalProps {
  special: string;
}

const SpecialModal = ({ special: name }: SpecialModalProps) => {
  const [modalState, setModalState] = useCreditModalState();
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  const toast = useToast();
  const team = useTeam();

  const special = team?.specials.find((s) => s.name === name);

  if (!modalState.isOpen || !special) {
    return null;
  }

  const close = () => {
    setIsSpaceDisabled(false);
    setModalState({ isOpen: false });
  };

  return (
    <ModalOverlay>
      <Container onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>{name}</Title>
          <CloseButton onClick={close} />
        </Header>

        <Members>
          {special.members.map((member, i) => (
            <Special
              key={i}
              name={member}
              onClick={() => {
                navigator.clipboard.writeText(member);
                toast("클립보드에 복사되었습니다.");
              }}
            />
          ))}
        </Members>
      </Container>
    </ModalOverlay>
  );
};

const Container = styled(ModalContainer)`
  width: 540px;

  padding: 20px 30px 40px 30px;

  background: ${colors.blueGray25};

  justify-content: flex-start;
  align-items: flex-start;

  border-radius: 16px;
`;

const CloseButton = styled(CloseIcon)`
  position: absolute;
  top: 20px;
  right: 20px;

  cursor: pointer;
`;

const Header = styled.div`
  width: 100%;
`;

const Title = styled(T3Medium)`
  width: 100%;

  color: ${colors.gray900};
  text-align: center;
`;

const Members = styled.div`
  padding-top: 16px;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  gap: 4px;
`;

export default SpecialModal;
