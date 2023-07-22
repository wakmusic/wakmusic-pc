import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import "overlayscrollbars/overlayscrollbars.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import RootOverlay from "@components/globals/RootOverlay";
import GNB from "@components/gnb/GNB";
import Header from "@components/header/Header";
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
const analytics = getAnalytics(app);
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
              <Route path="/user/*" element={<User />}></Route>
            </Routes>
            <Player />
          </RootOverlay>
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  </StrictMode>
);
