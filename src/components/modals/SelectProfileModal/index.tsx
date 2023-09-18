import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/macro";

import { fetchProfileImages } from "@apis/user";

import { T4Bold } from "@components/Typography";

import colors from "@constants/colors";

import { useIsSpaceDisabled } from "@hooks/player";
import { useSelectProfileModalState } from "@hooks/profileModal";

import { UserProfile } from "@templates/user";

import TwoButton from "../globals/TwoButton";
import { ModalContainer, ModalOverlay } from "../globals/modalStyle";
import ProfileButton from "./ProfileButton";

interface SelectProfileModalProps {}

const SelectProfileModal = ({}: SelectProfileModalProps) => {
  const {
    data: profileList,
    error: error,
    isLoading: isLoading,
  } = useQuery("profileImages", fetchProfileImages);

  const [modalState, setModalState] = useSelectProfileModalState();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [, setIsSpaceDisabled] = useIsSpaceDisabled();

  useEffect(() => {
    if (modalState.profile) setProfile(modalState.profile);
  }, [modalState.profile]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.code === "Escape") {
        setIsSpaceDisabled(false);
        setModalState({
          ...modalState,
          isOpen: false,
        });
      }
    }

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [setIsSpaceDisabled, setModalState, modalState]);

  if (!modalState.isOpen) return null;

  if (isLoading) return <div>loading</div>;
  if (error || !profileList) return <div>error</div>;

  return (
    <ModalOverlay
      onClick={() => {
        setIsSpaceDisabled(false);
        setModalState({
          ...modalState,
          isOpen: false,
        });
      }}
    >
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>프로필을 선택해주세요</Title>
        <Profiles>
          {profileList.map((item, index) => (
            <ProfileButton
              key={index}
              profile={item}
              selected={item.type === profile?.type}
              onClick={(p: UserProfile) => setProfile(p)}
            />
          ))}
        </Profiles>
        <TwoButton
          ok={() => {
            setIsSpaceDisabled(false);
            setModalState({
              ...modalState,
              isOpen: false,
              profile,
            });
          }}
          cancel={() => {
            setIsSpaceDisabled(false);
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
