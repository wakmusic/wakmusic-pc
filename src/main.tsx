import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import "overlayscrollbars/overlayscrollbars.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HashRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import GNB from "@components/gnb/GNB";
import Header from "@components/header/Header";
import Splash from "@components/index/Splash";
import AddListModal from "@components/modals/AddListModal";
import AlertModal from "@components/modals/AlertModal";
import ConfirmModal from "@components/modals/ConfirmModal";
import CreateListModal from "@components/modals/CreateListModal";
import LoadListModal from "@components/modals/LoadListModal";
import LoginModal from "@components/modals/LoginModal";
import NoticeDetailModal from "@components/modals/NoticeDetailModal";
import NoticeModal from "@components/modals/NoticeModal";
import SelectProfileModal from "@components/modals/SelectProfileModal";
import SetUsernameModal from "@components/modals/SetUsernameModal";
import ShareListModal from "@components/modals/ShareListModal";
import ModalPortal from "@components/modals/globals/ModalPortal";
import Player from "@components/player/Default/Player";
import Visual from "@components/player/Visual/Visual";

import RootOverlay from "@layouts/RootOverlay";

import firebaseConfig from "@constants/firebaseConfig";

import Artist from "@pages/artists/Artist";
import Artists from "@pages/artists/Artists";
import Chart from "@pages/chart/Chart";
import Faq from "@pages/faq/Faq";
import Index from "@pages/index/Index";
import MyPage from "@pages/mypage/MyPage";
import New from "@pages/new/New";
import Notice from "@pages/notice/Notice";
import Playground from "@pages/playground/Playground";
import Search from "@pages/search/Search";
import Playlist from "@pages/user/Playlist";
import User from "@pages/user/User";

import CheckPlayerMode from "@utils/checkPlayerMode";
import SchemeHandler from "@utils/schemeHandler";

import "./index.css";
import PlayerService from "./player/PlayerService";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1분
    },
  },
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Splash />
        <HashRouter>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <Header />

          <RootOverlay>
            <GNB />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/artists/:artist" element={<Artist />} />
              <Route path="/search" element={<Search />} />
              <Route path="/new" element={<New />} />
              <Route path="/user/*" element={<User />} />
              <Route path="/playlist/:playlistid" element={<Playlist />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/notice" element={<Notice />} />

              <Route path="/mypage" element={<MyPage />} />
              <Route path="/support" element={<MyPage />} />
              <Route path="/about" element={<MyPage />} />

              <Route path="/player" element={null} />
            </Routes>

            <Player />
            <Visual />
          </RootOverlay>

          <CheckPlayerMode />
        </HashRouter>

        <PlayerService />
        <ModalPortal>
          <LoginModal />
          <SelectProfileModal />
          <AlertModal />
          <ConfirmModal />
          <CreateListModal />
          <LoadListModal />
          <ShareListModal />
          <AddListModal />
          <SetUsernameModal />
          <NoticeDetailModal />
          <NoticeModal />
        </ModalPortal>
        <SchemeHandler />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
