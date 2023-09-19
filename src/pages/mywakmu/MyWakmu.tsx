import { useLocation } from "react-router-dom";
import styled from "styled-components/macro";

import { fetchSong } from "@apis/songs";

import { ReactComponent as DotSVG } from "@assets/icons/ic_16_dot.svg";

import { T7Medium } from "@components/Typography";
import ContactModal from "@components/modals/ContactModal";
import ServiceInfoModal from "@components/modals/ServiceInfoModal";
import Block from "@components/mywakmu/Block";
import ProfileBlock from "@components/mywakmu/ProfileBlock";

import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";
import { blocks } from "@constants/myPage";

import { usePlaySong } from "@hooks/player";

interface MyWakmuProps {}

const MyWakmu = ({}: MyWakmuProps) => {
  const location = useLocation();
  const playSong = usePlaySong();

  return (
    <PageLayout>
      {location.pathname === "/about" && <ServiceInfoModal />}
      {location.pathname === "/support" && <ContactModal />}

      <Container>
        <ProfileBlock />

        {blocks.map((block, index) => (
          <Block
            key={index}
            title={block.title}
            description={block.description}
            endPoint={block.endPoint}
            svg={<block.svg />}
          />
        ))}
      </Container>
      <Buanebi
        onClick={async () => {
          fetchSong("crVqRMDNpuY").then(playSong);
        }}
      >
        <DotSVG />
        <T7Medium>
          왁타버스 뮤직 팀에 속한 모든 팀원들은 부아내비 (부려먹는 게 아니라
          내가 비빈 거다)라는 모토를 가슴에 새기고 일하고 있습니다.
        </T7Medium>
      </Buanebi>
    </PageLayout>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 220px 220px 282px;
  grid-template-rows: 180px 180px;
  gap: 16px;

  width: 754px;
  height: 376px;

  margin-top: 20px;
`;

const Buanebi = styled.div`
  color: ${colors.blueGray400};

  display: flex;
  align-items: center;

  margin-top: 16px;

  & svg {
    float: left;
  }
`;

export default MyWakmu;
