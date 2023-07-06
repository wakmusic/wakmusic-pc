import styled from "styled-components";
import { Routes, Route } from "react-router-dom";

import PageContainer from "@components/PageContainer";

import * as Typography from "@components/Typography";
import colors from "@constants/colors";

import Header from "@components/user/header";
import Playlist from "./Playlist";

interface UserProps {}

const User = ({}: UserProps) => {
  return (
    <PageContainer>
      <UserContainer>
        <Header isEditMode={false} />
        <Routes>
          <Route path="/playlists" element={<Playlist />} />
        </Routes>
      </UserContainer>
    </PageContainer>
  )
}

const UserContainer = styled.div`
  margin: 20px;
  margin-left: 0px;

  padding: 16px 20px;

  border: 1px solid ${colors.blueGray25};
  border-radius: 16px;

  background-color: ${colors.white}66;
  backdrop-filter: blur(62.5px);
`;

export default User;
