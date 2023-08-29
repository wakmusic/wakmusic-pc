import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { ReactComponent as Logout } from "@assets/icons/ic_24_logout.svg";

import { T6Bold, T6Medium } from "@components/Typography";

import colors from "@constants/colors";
import { IPCRenderer } from "@constants/ipc";

import { useConfirmModal } from "@hooks/confirmModal";
import { useLoginModalOpener } from "@hooks/loginModal";
import { useUserState } from "@hooks/user";

import { ipcRenderer } from "@utils/modules";
import { getProfileImg } from "@utils/staticUtill";

interface UserProps {}

const User = ({}: UserProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const loginModalOpener = useLoginModalOpener();
  const [user, setUser] = useUserState();

  const confirmModal = useConfirmModal();

  const logout = async (e: React.MouseEvent<Element, MouseEvent>) => {
    e.stopPropagation();

    const res = await confirmModal("로그아웃 하시겠습니까?", null);

    if (!res) return;

    if (ipcRenderer) ipcRenderer.send(IPCRenderer.USER_LOGOUT);

    setUser(null);
    navigate("/");
  };

  const goMypage = () => {
    navigate("/mypage");
  };

  if (user && ["/mypage", "/about", "/support"].includes(location.pathname)) {
    return (
      <Container onClick={logout}>
        <Text>로그아웃</Text>
      </Container>
    );
  }

  if (user) {
    return (
      <Container onClick={goMypage}>
        <LogoutButton onClick={logout} />
        <Avatar src={getProfileImg(user.profile)} />
        <NameText>
          <Name>{user.name}</Name> 님
        </NameText>
      </Container>
    );
  }

  return (
    <Container onClick={() => loginModalOpener()}>
      <Text>로그인 하기</Text>
    </Container>
  );
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

const NameText = styled(T6Medium)`
  margin-top: 4px;

  color: ${colors.blueGray400};
`;

const Name = styled(T6Bold)`
  display: inline-block;
  margin-bottom: 19px;

  color: ${colors.gray900};
`;

export default User;
