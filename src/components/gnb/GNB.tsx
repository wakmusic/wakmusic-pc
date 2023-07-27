import styled from "styled-components";

import { ReactComponent as ArtistSVG } from "@assets/icons/ic_40_artist_disabled.svg";
import { ReactComponent as ChartSVG } from "@assets/icons/ic_40_chart_disabled.svg";
import { ReactComponent as HomeSVG } from "@assets/icons/ic_40_home_disabled.svg";
import { ReactComponent as KeepSVG } from "@assets/icons/ic_40_keep_disabled.svg";
import { ReactComponent as SearchSVG } from "@assets/icons/ic_40_search_disabled.svg";
import artistLottie from "@assets/lotties/ic_artist.json";
import chartLottie from "@assets/lotties/ic_chart.json";
import homeLottie from "@assets/lotties/ic_home.json";
import keepLottie from "@assets/lotties/ic_keep.json";
import searchLottie from "@assets/lotties/ic_search.json";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

import { useAlertModal } from "@hooks/alertModal";
import { useConfirmModal } from "@hooks/confirmModal";
import { useCreateListModal } from "@hooks/createListModal";
import { useLoadListModal } from "@hooks/loadListModal";
import { useLoginModalOpener } from "@hooks/loginModal";
import { useSelectProfileModal } from "@hooks/profileModal";
import { useShareListModal } from "@hooks/shareListModal";

import Section from "./Section";

interface GNB {}

const GNB = ({}: GNB) => {
  const loginModalOpener = useLoginModalOpener();
  const selectProfileModal = useSelectProfileModal();
  const alertModal = useAlertModal();
  const confirmModal = useConfirmModal();
  const createListModal = useCreateListModal();
  const loadListModal = useLoadListModal();
  const shareListModal = useShareListModal();

  return (
    <Container>
      <Navigator>
        <Section path="/" icon={HomeSVG} lottie={homeLottie}>
          홈
        </Section>

        <Section path="/chart" icon={ChartSVG} lottie={chartLottie}>
          왁뮤차트
        </Section>

        <Section path="/new" icon={SearchSVG} lottie={searchLottie}>
          최신음악
        </Section>

        <Section path="/artists" icon={ArtistSVG} lottie={artistLottie}>
          아티스트
        </Section>

        <Section path="/user/playlists" icon={KeepSVG} lottie={keepLottie}>
          보관함
        </Section>
      </Navigator>

      <Login onClick={() => loginModalOpener()}>
        <T6Medium
          style={{
            color: colors.blueGray600,
          }}
        >
          로그인 하기
        </T6Medium>
      </Login>

      <Login
        onClick={() => {
          selectProfileModal();
        }}
      >
        <T6Medium
          style={{
            color: colors.blueGray600,
          }}
        >
          (임시) 프로필 선택
        </T6Medium>
      </Login>

      <Login
        onClick={() => {
          alertModal("타이틀", "서브 타이틀 내용이 들어갑니다.");
        }}
      >
        <T6Medium
          style={{
            color: colors.blueGray600,
          }}
        >
          (임시) AlertModal
        </T6Medium>
      </Login>
      <Login
        onClick={() => {
          confirmModal("타이틀", "서브 타이틀 내용이 들어갑니다.");
        }}
      >
        <T6Medium
          style={{
            color: colors.blueGray600,
          }}
        >
          (임시) ConfirmModal
        </T6Medium>
      </Login>
      <Login
        onClick={() => {
          createListModal();
        }}
      >
        <T6Medium
          style={{
            color: colors.blueGray600,
          }}
        >
          (임시) CreateListModal
        </T6Medium>
      </Login>
      <Login
        onClick={() => {
          loadListModal();
        }}
      >
        <T6Medium
          style={{
            color: colors.blueGray600,
          }}
        >
          (임시) LoadListModal
        </T6Medium>
      </Login>
      <Login
        onClick={() => {
          shareListModal("WOOWAKGOOD");
        }}
      >
        <T6Medium
          style={{
            color: colors.blueGray600,
          }}
        >
          (임시) ShareListModal
        </T6Medium>
      </Login>
    </Container>
  );
};

const Container = styled.div`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 16px;
`;

const Navigator = styled.div`
  width: 150px;
  height: 300px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66; // 40% opacity
  backdrop-filter: blur(62.5px);

  padding: 20px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Login = styled.div`
  margin-top: 12px;

  width: 150px;
  height: 52px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66; // 40% opacity
  backdrop-filter: blur(62.5px);

  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GNB;
