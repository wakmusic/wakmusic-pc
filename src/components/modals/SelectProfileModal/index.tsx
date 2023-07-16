import { useEffect, useState } from "react";
import styled from "styled-components";

import { T4Bold } from "@components/Typography";

import colors from "@constants/colors";
import { profileList } from "@constants/dummys";

import { useSelectProfileModalState } from "@hooks/profileModal";

import { isString } from "@utils/isTypes";

import TwoButton from "../globals/TwoButton";
import { ModalContainer, ModalOverlay } from "../globals/modalStyle";
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
    <ModalOverlay>
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
        <TwoButton
          ok={() => {
            setModalState({
              ...modalState,
              isOpen: false,
              profile,
            });
          }}
          cancel={() => {
            setModalState({
              ...modalState,
              isOpen: false,
            });
          }}
        />
      </Modal>
    </ModalOverlay>
  );
};

const Modal = styled(ModalContainer)`
  height: 316px;

  background: ${colors.blueGray100}CC; // 80% opacity
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

export default SelectProfileModal;
