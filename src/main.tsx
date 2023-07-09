import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import ModalPortal from "@components/globals/ModalPortal";
import RootOverlay from "@components/globals/RootOverlay";
import GNB from "@components/gnb/GNB";
import Header from "@components/header/Header";
import LoginModal from "@components/modals/LoginModal";
import Player from "@components/player/Player";

import firebaseConfig from "@constants/firebaseConfig";

import Artists from "@pages/artists/Artists";
import Index from "@pages/index/Index";
import Playground from "@pages/playground/Playground";

import "@utils/loadIpcRenderer";

import "./index.css";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

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
            <Route path="/artists" element={<Artists />} />
          </Routes>
          <Player />
        </RootOverlay>

        <ModalPortal>
          <LoginModal />
        </ModalPortal>
      </BrowserRouter>
    </RecoilRoot>
  </StrictMode>
);
