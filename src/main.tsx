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
import SelectProfileModal from "@components/modals/SelectProfileModal";
import SetUsernameModal from "@components/modals/SetUsernameModal";
import ShareListModal from "@components/modals/ShareListModal";
import ModalPortal from "@components/modals/globals/ModalPortal";
import Player from "@components/player/Default/Player";
import Visual from "@components/player/Visual/Visual";
import Youtube from "@components/youtube/Youtube";

import RootOverlay from "@layouts/RootOverlay";

import firebaseConfig from "@constants/firebaseConfig";

import Artist from "@pages/artists/Artist";
import Artists from "@pages/artists/Artists";
import Chart from "@pages/chart/Chart";
import Faq from "@pages/faq/Faq";
import Index from "@pages/index/Index";
import MyPage from "@pages/mypage/MyPage";
import New from "@pages/new/New";
import PlayerPlaylist from "@pages/playerPlaylist/PlayerPlaylist";
import Playground from "@pages/playground/Playground";
import Search from "@pages/search/Search";
import Playlist from "@pages/user/Playlist";
import User from "@pages/user/User";

import CheckPlayerMode from "@utils/checkPlayerMode";
import SchemeHandler from "@utils/schemeHandler";

import "./index.css";

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
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/about" element={<MyPage />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/player" element={null} />
              <Route path="/player/playlist" element={<PlayerPlaylist />} />
            </Routes>

            <Player />
            <Visual />
          </RootOverlay>

          <CheckPlayerMode />
        </HashRouter>

        <Youtube />

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
        </ModalPortal>

        <SchemeHandler />
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
