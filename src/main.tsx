import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import "overlayscrollbars/overlayscrollbars.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import GNB from "@components/gnb/GNB";
import Header from "@components/header/Header";
import AlertModal from "@components/modals/AlertModal";
import ConfirmModal from "@components/modals/ConfirmModal";
import CreateListModal from "@components/modals/CreateListModal";
import LoadListModal from "@components/modals/LoadListModal";
import LoginModal from "@components/modals/LoginModal";
import SelectProfileModal from "@components/modals/SelectProfileModal";
import ShareListModal from "@components/modals/ShareListModal";
import ModalPortal from "@components/modals/globals/ModalPortal";
import Player from "@components/player/Default/Player";
import PlayerFallback from "@components/player/PlayerFallback";
import Visual from "@components/player/Visual/Visual";

import RootOverlay from "@layouts/RootOverlay";

import firebaseConfig from "@constants/firebaseConfig";

import Artists from "@pages/artists/Artists";
import Chart from "@pages/chart/Chart";
import Index from "@pages/index/Index";
import MyPage from "@pages/mypage/MyPage";
import New from "@pages/new/New";
import Playground from "@pages/playground/Playground";
import Search from "@pages/search/Search";
import User from "@pages/user/User";

import "@utils/loadIpcRenderer";

import "./index.css";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 5000,
    },
  },
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
          <Header />
          <RootOverlay>
            <GNB />

            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/chart" element={<Chart />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/search" element={<Search />} />
              <Route path="/new" element={<New />} />
              <Route path="/user/*" element={<User />} />
              <Route path="/mypage" element={<MyPage />} />

              <Route path="/player" element={<PlayerFallback />} />
            </Routes>

            <Player />
            <Visual />
          </RootOverlay>
        </BrowserRouter>

        <ModalPortal>
          <LoginModal />
          <SelectProfileModal />
          <AlertModal />
          <ConfirmModal />
          <CreateListModal />
          <LoadListModal />
          <ShareListModal />
        </ModalPortal>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
