import { Component, ErrorInfo, ReactNode, StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
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
import Toast from "@components/modals/Toast";
import ModalPortal from "@components/modals/globals/ModalPortal";
import Player from "@components/player/Default/Player";
import Visual from "@components/player/Visual/Visual";

import ErrorLayout from "@layouts/ErrorLayout";
import RootOverlay from "@layouts/RootOverlay";

import NotFound from "@pages/NotFound/NotFound";
import Artist from "@pages/artists/Artist";
import Artists from "@pages/artists/Artists";
import Chart from "@pages/chart/Chart";
import Faq from "@pages/faq/Faq";
import Index from "@pages/index/Index";
import MyPage from "@pages/mypage/MyPage";
import New from "@pages/new/New";
import Notice from "@pages/notice/Notice";
import PlayerPlaylist from "@pages/playerPlaylist/PlayerPlaylist";
import Search from "@pages/search/Search";
import Playlist from "@pages/user/Playlist";
import User from "@pages/user/User";

import CheckPlayerMode from "@utils/checkPlayerMode";
import SchemeHandler from "@utils/schemeHandler";

import PlayerService from "./player/PlayerService";

interface AppProps {
  queryClient: QueryClient;
}

export class App extends Component<AppProps> {
  state: {
    hasError: boolean;
  };

  constructor(props: AppProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true });
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return <ErrorLayout />;
    }

    return (
      <StrictMode>
        <RecoilRoot>
          <QueryClientProvider client={this.props.queryClient}>
            <Splash />
            <BrowserRouter>
              <Header />
              <RootOverlay>
                <GNB />

                <Routes>
                  <Route path="/" element={<Outlet />}>
                    <Route path="/" element={<Index />} />
                    <Route path="/chart" element={<Chart />} />
                    <Route path="/artists" element={<Artists />} />
                    <Route path="/artists/:artist" element={<Artist />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/user/*" element={<User />} />
                    <Route
                      path="/playlist/:playlistid"
                      element={<Playlist />}
                    />
                    <Route path="/faq" element={<Faq />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/mypage" element={<MyPage />} />
                    <Route path="/support" element={<MyPage />} />
                    <Route path="/about" element={<MyPage />} />
                    <Route path="/player" element={null} />
                    <Route
                      path="/player/playlist"
                      element={<PlayerPlaylist />}
                    />
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>

                <Player />
                <Visual />
              </RootOverlay>
              <CheckPlayerMode />
            </BrowserRouter>

            <PlayerService />

            <ModalPortal>
              <Toast />

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
  }
}
