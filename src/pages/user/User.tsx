import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import TabContent from "@components/globals/tab/TabContent";
import Header from "@components/user/Header";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import { useLoginModalOpener } from "@hooks/modal";
import { useUserState } from "@hooks/user";

import { isNull } from "@utils/isTypes";

import Likes from "./Likes";
import Mylist from "./Mylist";

interface UserProps {}

const User = ({}: UserProps) => {
  const [user] = useUserState();
  const loginModalOpener = useLoginModalOpener();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNull(user)) {
      loginModalOpener();
    }
  }, [user, loginModalOpener, navigate]);

  if (isNull(user)) {
    return (
      <PageLayout>
        <Container />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <Container>
        <Header />
        <TabContent>
          <Routes>
            <Route path="/playlists" element={<Mylist />} />
            <Route path="/likes" element={<Likes />} />
          </Routes>
        </TabContent>
      </Container>
    </PageLayout>
  );
};

const Container = styled(PageContainer)`
  padding-top: 16px;
`;

export default User;
