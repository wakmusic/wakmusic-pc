import styled from "styled-components";

import { T7_1Light } from "@components/Typography";
import Rank from "@components/globals/Rank";
import Track from "@components/globals/Track";

import colors from "@constants/colors";

interface MusicListProps {}

const MusicList = ({}: MusicListProps) => {
  return (
    <Wrapper select={false}>
      <RankLayout>
        <Rank now={1} last={4} />
        <Track
          item={{
            songId: "Yn2rnQsv8bE",
            title: "울산왕감자 #Shorts",
            artist: "징버거",
            remix: "",
            reaction: "",
            date: 230706,
            start: 0,
            end: 0,
            hourly: {
              views: 18229,
              increase: 18229,
              last: 0,
            },
          }}
        />
      </RankLayout>
      <TextLayout>
        <Text>1위</Text>
        <Text>2022.05.11</Text>
        <Text>19,300회</Text>
      </TextLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ select: boolean }>`
  padding: 0px 20px;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${(props) =>
    props.select ? colors.blueGray200 : "rgb(0,0,0,0)"};
`;

const RankLayout = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled(T7_1Light)`
  text-align: center;
  width: 70px;
  color: ${colors.gray700};
`;

const TextLayout = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default MusicList;