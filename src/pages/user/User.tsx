import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Header from "@components/user/Header";

import colors from "@constants/colors";

import Likes from "./Likes";
import Playlists from "./Playlists";

interface UserProps {}

const User = ({}: UserProps) => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/playlists" element={<Playlists />} />
        <Route path="/likes" element={<Likes />} />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  width: 754px;
  height: calc(100vh - 78px);

  margin: auto;

  padding-top: 16px;

  border: 1px solid ${colors.blueGray25};
  border-radius: 16px;

  background-color: ${colors.white}66;
  backdrop-filter: blur(62.5px);

  overflow-y: hidden;
`;

export default User;
