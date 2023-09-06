import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { removeUser, setProfileImage, setUsername } from "@apis/user";

import { ReactComponent as EditSVG } from "@assets/icons/ic_24_edit.svg";
import { ReactComponent as SetSVG } from "@assets/icons/ic_30_set.svg";
import { ReactComponent as ErrorIcon } from "@assets/icons/ic_56_contents_info.svg";

import { T4Bold, T4Medium, T5Medium, T6Medium } from "@components/Typography";

import colors from "@constants/colors";
import { IPCRenderer } from "@constants/ipc";
import platforms from "@constants/platforms";

import { useConfirmModal } from "@hooks/confirmModal";
import { useLoginModalOpener } from "@hooks/loginModal";
import { useSelectProfileModal } from "@hooks/profileModal";
import { useSetUsernameModal } from "@hooks/setUsernameModal";
import { useUserState } from "@hooks/user";

import { isNil } from "@utils/isTypes";
import { ipcRenderer } from "@utils/modules";
import { getProfileImg } from "@utils/staticUtill";

interface ProfileBlockProps {}

const ProfileBlock = ({}: ProfileBlockProps) => {
  const navigate = useNavigate();

  const [user, setUser] = useUserState();
  const loginModalOpener = useLoginModalOpener();
  const selectProfileModal = useSelectProfileModal();
  const setUsernameModal = useSetUsernameModal();
  const confirmModal = useConfirmModal();

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

      if (ipcRenderer) {
        ipcRenderer.send(IPCRenderer.USER_LOGOUT);
      }

      navigate("/");
      setUser(undefined);
    }
  };

  if (isNil(user)) {
    return (
      <Container>
        <NoLoginContainer>
          <ErrorIcon />
          <T6Medium color={colors.gray900}>로그인을 해주세요.</T6Medium>
          <LoginButton onClick={() => loginModalOpener()}>
            <T6Medium color={colors.blueGray400}>로그인</T6Medium>
          </LoginButton>
        </NoLoginContainer>
      </Container>
    );
  }

  return (
    <Container>
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
    </Container>
  );
};

const Container = styled.div`
  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);

  grid-column: 1/3;

  padding: 20px 24px;
`;

const NoLoginContainer = styled.div`
  display: flex;

  align-items: center;

  flex-direction: column;
`;

const LoginButton = styled.div`
  margin-top: 16px;

  width: 75px;
  height: 28px;

  border-radius: 6px;
  border: 1px solid ${colors.blueGray200};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
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

export default ProfileBlock;
