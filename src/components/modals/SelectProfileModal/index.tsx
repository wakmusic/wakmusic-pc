import { useEffect, useState } from "react";
import styled from "styled-components";

import { T4Bold } from "@components/Typography";
import ModalContainer from "@components/globals/ModalContainer";

import colors from "@constants/colors";
import { profileList } from "@constants/dummys";

import { useSelectProfileModalState } from "@hooks/profileModal";

import { isString } from "@utils/isTypes";

import ProfileButton from "./ProfileButton";

interface SelectProfileModalProps {}

const SelectProfileModal = ({}: SelectProfileModalProps) => {
  const [modalState, setModalState] = useSelectProfileModalState();
  const [profile, setProfile] = useState<string>("panchi");

  useEffect(() => {
    if (isString(modalState.profile)) setProfile(modalState.profile);
  }, [modalState.profile]);

  if (!modalState.isOpen) return null;

  return (
    <ModalContainer>
      <Modal>
        <Title>프로필을 선택해주세요</Title>
        <Profiles>
          {profileList.map((item, index) => (
            <ProfileButton
              key={index}
              profile={item}
              selected={item.type === profile}
              onClick={(type: string) => {
                setProfile(type);
              }}
            />
          ))}
        </Profiles>
        <Buttons>
          <Button
            color={colors.blueGray400}
            onClick={() => {
              setModalState({
                ...modalState,
                isOpen: false,
              });
            }}
          >
            <T4Bold color={colors.blueGray25}>취소</T4Bold>
          </Button>
          <Button
            color={colors.point}
            onClick={() => {
              setModalState({
                ...modalState,
                isOpen: false,
                profile,
              });
            }}
          >
            <T4Bold color={colors.blueGray25}>확인</T4Bold>
          </Button>
        </Buttons>
      </Modal>
    </ModalContainer>
  );
};

const Modal = styled.div`
  width: 440px;
  height: 316px;

  overflow: hidden;

  border-radius: 24px;
  background: ${colors.blueGray100}CC; // 80% opacity
  backdrop-filter: blur(12.5px);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled(T4Bold)`
  color: ${colors.gray700};
  margin-top: 20px;
`;

const Profiles = styled.div`
  margin-top: 14px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px 20px;
`;

const Buttons = styled.div`
  margin-top: auto;

  width: 440px;

  display: flex;
`;

const Button = styled.div<{ color: string }>`
  width: 50%;
  height: 56px;

  background: ${({ color }) => color};

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;
`;

export default SelectProfileModal;
