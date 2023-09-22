import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { ReactComponent as Logout } from "@assets/icons/ic_24_logout.svg";

import { T6Bold, T6Medium } from "@components/Typography";

import colors from "@constants/colors";
import { IPCRenderer } from "@constants/ipc";

import {
  useConfirmModal,
  useExitModal,
  useLoginModalOpener,
} from "@hooks/modal";
import { useUserState } from "@hooks/user";

import { isNull } from "@utils/isTypes";
import { ipcRenderer } from "@utils/modules";
import { getProfileImg } from "@utils/staticUtill";
import { isMyPage } from "@utils/utils";

interface UserProps {}

const User = ({}: UserProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const loginModalOpener = useLoginModalOpener();
  const [user, setUser] = useUserState();

  const confirmModal = useConfirmModal();
  const exitModal = useExitModal();

  const logout = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();

    const res = await confirmModal("로그아웃 하시겠습니까?", null);

    if (!res) return;

    if (ipcRenderer) ipcRenderer.send(IPCRenderer.USER_LOGOUT);

    setUser(null);
    navigate("/");
  };

  const goMypage = () => {
    navigate("/mywakmu");
  };

  const clickUserButton = (e: React.MouseEvent<Element, MouseEvent>) => {
    if (user) {
      logout(e);
    } else {
      loginModalOpener();
    }
  };

  if (isMyPage(location.pathname)) {
    return (
      <>
        <Container onClick={clickUserButton}>
          <Text>{user ? "로그아웃" : "로그인 하기"}</Text>
        </Container>

        <Container
          onClick={async () => {
            const result = await exitModal(false);

            if (!isNull(result)) {
              localStorage.setItem("exitMode", result);
            }
          }}
        >
          <Text>앱 설정</Text>
        </Container>
      </>
    );
  }

  if (user) {
    return (
      <Container onClick={goMypage}>
        <LogoutButton onClick={logout} />
        <Avatar src={getProfileImg(user.profile)} />
        <NameContainer>
          <Name>{user.name}</Name>
          <NameText>님</NameText>
        </NameContainer>
      </Container>
    );
  }

  if (!user)
    return (
      <Container onClick={() => navigate("/mywakmu")}>
        <Text>MY 왁뮤</Text>
      </Container>
    );

  return null;
};

const Container = styled.div`
  margin-top: 12px;

  width: 150px;
  min-height: 52px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

const Text = styled(T6Medium)`
  color: ${colors.blueGray600};
`;

const LogoutButton = styled(Logout)`
  position: absolute;

  top: 8px;
  right: 8px;
`;

const Avatar = styled.img`
  margin-top: 22px;

  width: 50px;
  height: 50px;

  border-radius: 50%;
`;

const NameContainer = styled.div`
  margin-top: 4px;
  margin-bottom: 19px;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
`;

const NameText = styled(T6Medium)`
  color: ${colors.blueGray400};
`;

const Name = styled(T6Bold)`
  color: ${colors.gray900};
`;

export default User;
