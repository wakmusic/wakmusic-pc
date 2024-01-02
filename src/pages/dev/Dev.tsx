import {
  showYoutubePlayerState,
  youtubePlayerTempState,
} from "@state/player/atoms";
import { useState } from "react";
import { ReactQueryDevtools } from "react-query/devtools";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components/macro";

import { fetchSong } from "@apis/songs";

import 히죽두 from "@assets/imgs/테헹.webp";

import { T3Bold } from "@components/Typography";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";

import { usePlaySong } from "@hooks/player";

import makeShortcut from "@utils/shortcut";

interface DevProps {}

const Dev = ({}: DevProps) => {
  const setYoutubeTemp = useSetRecoilState(youtubePlayerTempState);
  const [showYoutube, setShowYoutube] = useRecoilState(showYoutubePlayerState);
  const [error, setError] = useState<string>("");
  const playSong = usePlaySong();

  return (
    <PageLayout>
      <Container>
        <T3Bold>개발자 모드</T3Bold>

        <테헹
          src={히죽두}
          onClick={() => {
            fetchSong("06al4daDPQ8").then(playSong);
          }}
        />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />

        <Button
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setError(undefined);
          }}
        >
          펑~!{error.includes("")}
        </Button>

        <Button
          onClick={() => {
            setYoutubeTemp((prev) => prev + 1);
          }}
        >
          유튜브 재장전
        </Button>

        <Button
          onClick={() => {
            setShowYoutube(!showYoutube);
          }}
        >
          유튜브를 {showYoutube ? "숨겨주세요" : "보여주세요"}
        </Button>

        <Button
          onClick={() => {
            makeShortcut();
          }}
        >
          숏컷 생성
        </Button>
      </Container>
    </PageLayout>
  );
};

const Container = styled(PageContainer)`
  padding: 10px;
`;

const 테헹 = styled.img`
  position: absolute;
  bottom: -20px;
  right: -20px;

  width: 200px;

  opacity: 0.2;

  transform: rotate(-20deg);

  cursor: pointer;
`;

const Button = styled.div`
  margin-top: 20px;

  padding: 10px 20px;
  height: 40px;

  border-radius: 10px;
  border: 1px solid ${colors.blueGray300};
  background-color: ${colors.blueGray100};

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${colors.blueGray600};

  cursor: pointer;
`;

export default Dev;
