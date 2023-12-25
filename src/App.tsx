import { Component, ErrorInfo, ReactNode, StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

import AddListModal from "@components/modals/AddListModal";
import AlertModal from "@components/modals/AlertModal";
import ConfirmModal from "@components/modals/ConfirmModal";
import CreateListModal from "@components/modals/CreateListModal";
import CreditModal from "@components/modals/CreditModal/CreditModal";
import ExitModal from "@components/modals/ExitModal";
import LoadListModal from "@components/modals/LoadListModal";
import LoginModal from "@components/modals/LoginModal";
import NoticeDetailModal from "@components/modals/NoticeDetailModal";
import NoticeModal from "@components/modals/NoticeModal";
import SelectProfileModal from "@components/modals/SelectProfileModal";
import SetUsernameModal from "@components/modals/SetUsernameModal";
import ShareListModal from "@components/modals/ShareListModal";
import Toast from "@components/modals/Toast";
import UpdateModal from "@components/modals/UpdateModal";
import ModalPortal from "@components/modals/globals/ModalPortal";

import ErrorLayout from "@layouts/ErrorLayout";
import Root from "@layouts/Root";

import { IPCRenderer } from "@constants/ipc";

import NotFound from "@pages/NotFound/NotFound";
import Artist from "@pages/artists/Artist";
import Artists from "@pages/artists/Artists";
import Chart from "@pages/chart/Chart";
import Dev from "@pages/dev/Dev";
import Faq from "@pages/faq/Faq";
import Index from "@pages/index/Index";
import MyWakmu from "@pages/mywakmu/MyWakmu";
import New from "@pages/new/New";
import Notice from "@pages/notice/Notice";
import PlayerPlaylist from "@pages/playerPlaylist/PlayerPlaylist";
import Search from "@pages/search/Search";
import Teams from "@pages/teams/Teams";
import Playlist from "@pages/user/Playlist";
import User from "@pages/user/User";

import { ipcRenderer } from "@utils/modules";
import SchemeHandler from "@utils/schemeHandler";
import makeShortcut from "@utils/shortcut";

interface AppProps {
  queryClient: QueryClient;
}

export class App extends Component<AppProps> {
  state: {
    hasError: boolean;
    noRender?: {
      title: string;
      description: string;
    };
  };

  constructor(props: AppProps) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidMount() {
    makeShortcut();

    fetch("https://wakmusic.xyz/api/app/check?os=android&version=9.9.9")
      .then((res) => res.json())
      .then((res) => {
        if (res.flag === 2) {
          return this.setState({
            noRender: {
              title: res.title,
              description: res.description,
            },
          });
        }
      });
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true });
    console.error(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.noRender) {
      return (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "100vh",
          }}
        >
          <h1>{this.state.noRender.title}</h1>
          <p
            style={{
              marginTop: "10px",
            }}
          >
            {this.state.noRender.description}
          </p>

          <button
            style={{
              marginTop: "10px",
              padding: "5px 10px",
            }}
            onClick={() => {
              ipcRenderer?.send(IPCRenderer.WINDOW_CLOSE);
            }}
          >
            닫기
          </button>
        </div>
      );
    }

    if (this.state.hasError) {
      return <ErrorLayout />;
    }

    return (
      <StrictMode>
        <RecoilRoot>
          <QueryClientProvider client={this.props.queryClient}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Root />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/chart" element={<Chart />} />
                  <Route path="/artists" element={<Artists />} />
                  <Route path="/artists/:artist" element={<Artist />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/new" element={<New />} />
                  <Route path="/user/*" element={<User />} />
                  <Route path="/playlist/:playlistid" element={<Playlist />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/notice" element={<Notice />} />

                  <Route path="/mywakmu" element={<MyWakmu />} />
                  <Route path="/support" element={<MyWakmu />} />
                  <Route path="/about" element={<MyWakmu />} />
                  <Route path="/teams" element={<Teams />} />

                  <Route path="/player" element={null} />

                  <Route path="/player/playlist" element={<PlayerPlaylist />} />

                  <Route path="/dev" element={<Dev />} />

                  <Route path="*" element={<NotFound />} />
                </Route>

                <Route path="/addList" element={<AddListModal popup />} />
                <Route path="/selectExit" element={<ExitModal popup />} />
              </Routes>
            </BrowserRouter>

            <SchemeHandler />

            <ModalPortal>
              <Toast />

              <LoginModal />
              <SelectProfileModal />
              <ConfirmModal />
              <CreateListModal />
              <LoadListModal />
              <ShareListModal />
              <AddListModal />
              <SetUsernameModal />
              <NoticeDetailModal />
              <NoticeModal />
              <ExitModal />
              <CreditModal />
              <AlertModal />
              <UpdateModal />
            </ModalPortal>
          </QueryClientProvider>
        </RecoilRoot>
      </StrictMode>
    );
  }
}
