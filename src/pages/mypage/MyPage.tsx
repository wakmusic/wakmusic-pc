import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { removeUser, setProfileImage, setUsername } from "@apis/user";

import { ReactComponent as DotSVG } from "@assets/icons/ic_16_dot.svg";
import { ReactComponent as EditSVG } from "@assets/icons/ic_24_edit.svg";
import { ReactComponent as SetSVG } from "@assets/icons/ic_30_set.svg";

import {
  T4Bold,
  T4Medium,
  T5Medium,
  T6Medium,
  T7Medium,
} from "@components/Typography";
import ContactModal from "@components/modals/ContactModal";
import ServiceInfoModal from "@components/modals/ServiceInfoModal";
import Block from "@components/mypage/Block";

import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";
import { IPCRenderer } from "@constants/ipc";
import { blocks } from "@constants/myPage";
import platforms from "@constants/platforms";

import { useConfirmModal } from "@hooks/confirmModal";
import { useLoginModalOpener } from "@hooks/loginModal";
import { useSelectProfileModal } from "@hooks/profileModal";
import { useSetUsernameModal } from "@hooks/setUsernameModal";
import { useUserState } from "@hooks/user";

import { isNull } from "@utils/isTypes";
import { ipcRenderer } from "@utils/modules";
import { getProfileImg } from "@utils/staticUtill";

interface MyPageProps {}

const MyPage = ({}: MyPageProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useUserState();
  const loginModalOpener = useLoginModalOpener();
  const selectProfileModal = useSelectProfileModal();
  const setUsernameModal = useSetUsernameModal();
  const confirmModal = useConfirmModal();

  useEffect(() => {
    if (isNull(user)) loginModalOpener();
  }, [user, loginModalOpener]);

  const setProfileHandler = async () => {
    if (!user) return;

    const newProfile = await selectProfileModal(user.profile);

    if (newProfile) {
      await setProfileImage(newProfile);
      setUser({ ...user, profile: newProfile });
    }
  };

  const setUsernameHandler = async () => {
    if (!user) return;

    const newUsername = await setUsernameModal(user.name);

    if (newUsername) {
      await setUsername(newUsername);
      setUser({ ...user, name: newUsername });
    }
  };

  const quitHandler = async () => {
    const res = await confirmModal("정말로 회원탈퇴 하시겠습니까?", null);

    if (res) {
      await removeUser();

      if (ipcRenderer) ipcRenderer.send(IPCRenderer.USER_LOGOUT);

      navigate("/");
      setUser(undefined);
    }
  };

  if (!user) return <PageLayout />;

  return (
    <PageLayout>
      {location.pathname === "/about" && <ServiceInfoModal />}
      {location.pathname === "/support" && <ContactModal />}

      <Container>
        <ProfileBlock>
          <FlexDiv>
            <ImageContainer>
              <ProfileImage src={getProfileImg(user.profile)} />
              <Setting onClick={setProfileHandler} />
            </ImageContainer>
            <InfoContainer>
              <UserContainer>
                <Username>{user.name}</Username>
                <Designation>님</Designation>
                <IconCotainer onClick={setUsernameHandler}>
                  <EditSVG />
                </IconCotainer>
              </UserContainer>
              <Via>{platforms[user.platform]}로 로그인 중</Via>
            </InfoContainer>
          </FlexDiv>
          <QuitButton onClick={quitHandler}>
            <T6Medium>회원탈퇴</T6Medium>
          </QuitButton>
        </ProfileBlock>
        {blocks.map((block, index) => (
          <Block
            key={index}
            title={block.title}
            description={block.description}
            endPoint={block.endPoint}
            svg={<block.svg />}
          />
        ))}
      </Container>
      <Buanebi>
        <DotSVG />
        <T7Medium>
          왁타버스 뮤직 팀에 속한 모든 팀원들은 부아내비 (부려먹는 게 아니라
          내가 비빈 거다)라는 모토를 가슴에 새기고 일하고 있습니다.
        </T7Medium>
      </Buanebi>
    </PageLayout>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 220px 220px 282px;
  grid-template-rows: 180px 180px;
  gap: 16px;

  width: 754px;
  height: 376px;

  margin-top: 20px;
`;

const ProfileBlock = styled.div`
  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);

  grid-column: 1/3;

  padding: 20px 24px;
`;

const FlexDiv = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: end;
  justify-content: end;

  position: relative;
  margin-left: 6px;
`;

const ProfileImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 100%;
`;

const Setting = styled(SetSVG)`
  position: absolute;

  margin-bottom: -4px;
  margin-right: -4px;

  cursor: pointer;
`;

const InfoContainer = styled.div`
  margin-left: 16px;

  display: flex;
  flex-direction: column;
`;

const UserContainer = styled.div`
  display: flex;
`;

const Username = styled(T4Bold)`
  color: ${colors.gray900};

  display: flex;
`;

const Designation = styled(T4Medium)`
  margin-left: 2px;
  color: ${colors.blueGray400};
`;

const IconCotainer = styled.div`
  height: 30px;
  margin-left: 4px;

  display: flex;
  align-items: center;

  cursor: pointer;
`;

const Via = styled(T5Medium)`
  color: ${colors.blueGray400};

  margin-top: 8px;
`;

const QuitButton = styled.div`
  position: absolute;
  top: 20px;
  right: 24px;

  width: 75px;
  height: 28px;
  padding: 4px 0;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;

  border-radius: 5px;
  border: 1px solid ${colors.blueGray200};

  cursor: pointer;

  & ${T6Medium} {
    color: ${colors.blueGray400};
    text-align: center;
  }
`;

const Buanebi = styled.div`
  color: ${colors.blueGray400};

  display: flex;
  align-items: center;

  margin-top: 16px;

  & svg {
    float: left;
  }
`;

export default MyPage;
