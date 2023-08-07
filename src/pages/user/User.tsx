import { Route, Routes } from "react-router-dom";
import styled from "styled-components/macro";

import Header from "@components/user/Header";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import Likes from "./Likes";
import Mylist from "./Mylist";

interface UserProps {}

const User = ({}: UserProps) => {
  return (
    <PageLayout>
      <Container>
        <Header />
        <Routes>
          <Route path="/playlists" element={<Mylist />} />
          <Route path="/likes" element={<Likes />} />
        </Routes>
      </Container>
    </PageLayout>
  );
};

const Container = styled(PageContainer)`
  padding-top: 16px;
`;

export default User;
