import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import RootOverlay from "@components/globals/RootOverlay";
import GNB from "@components/gnb/GNB";
import Header from "@components/header/Header";
import AlertModal from "@components/modals/AlertModal";
import ConfirmModal from "@components/modals/ConfirmModal";
import CreateListModal from "@components/modals/CreateListModal";
import LoginModal from "@components/modals/LoginModal";
import SelectProfileModal from "@components/modals/SelectProfileModal";
import ModalPortal from "@components/modals/globals/ModalPortal";
import Player from "@components/player/Player";

import firebaseConfig from "@constants/firebaseConfig";

import Artists from "@pages/artists/Artists";
import Chart from "@pages/chart/Chart";
import Index from "@pages/index/Index";
import Playground from "@pages/playground/Playground";
import Search from "@pages/search/Search";
import User from "@pages/user/User";

import "@utils/loadIpcRenderer";

import "./index.css";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <RootOverlay>
          <GNB />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/artists" element={<Artists />} />
            <Route path="/search" element={<Search />} />
            <Route path="/user/*" element={<User />}></Route>
          </Routes>
          <Player />
        </RootOverlay>
      </BrowserRouter>

      <ModalPortal>
        <LoginModal />
        <SelectProfileModal />
        <AlertModal />
        <ConfirmModal />
        <CreateListModal />
      </ModalPortal>
    </RecoilRoot>
  </StrictMode>
);
