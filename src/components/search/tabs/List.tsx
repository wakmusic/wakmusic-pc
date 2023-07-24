import { SongsSearchResponse } from "@templates/search.ts";
import styled from "styled-components";

import { T7Medium } from "@components/Typography";
import DefaultScroll from "@components/globals/Scroll/DefaultScroll";

import colors from "@constants/colors";

import SongSection from "../SongSection";

interface ListProps {
  tab: "song" | "artist" | "remix";
  res: SongsSearchResponse;
}

const List = ({ tab, res }: ListProps) => {
  return (
    <Container>
      <ListHeader>
        <TopLine />
        <ListHeaderText left={106}>곡 정보</ListHeaderText>
        <ListHeaderText left={508} fixed="true">
          발매일
        </ListHeaderText>
        <ListHeaderText left={586} fixed="true">
          조회수
        </ListHeaderText>
        <ListHeaderText left={664} fixed="true">
          좋아요
        </ListHeaderText>
        <BottomLine />
      </ListHeader>
      <SongContainer>
        <DefaultScroll>
          <SongWrapper>
            {res[tab].map((item, index) => (
              <SongSection item={item} key={index} />
            ))}
          </SongWrapper>
        </DefaultScroll>
      </SongContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 14px;
`;

const ListHeader = styled.div`
  position: fixed;

  width: 734px;
  height: 33px;

  flex-shrink: 0;
`;

const ListHeaderText = styled(T7Medium)<{
  left: number;
  fixed?: string;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: ${(p) => (p.fixed === "true" ? "70px" : "auto")};
  text-align: ${(p) => (p.fixed === "true" ? "center" : "auto")};

  display: inline-block;

  margin-left: ${(p) => p.left}px;
  color: ${colors.blueGray400};
`;

const SongWrapper = styled.div`
  height: calc(100vh - 181px);
`;

const SongContainer = styled.div`
  margin-top: 33px;
`;

const TopLine = styled.div`
  position: absolute;
  top: 0;

  width: 734px;
  height: 1px;

  border-radius: 1px;
  background: linear-gradient(
    117deg,
    ${colors.white}00 0%,
    ${colors.white} 4.69%,
    ${colors.white} 92.56%,
    ${colors.white}00 100%
  );
`;

const BottomLine = styled.div`
  position: absolute;
  top: calc(100% - 1px);

  width: 734px;
  height: 1px;

  border-radius: 1px;
  background: linear-gradient(
    117deg,
    ${colors.blueGray200}00 0%,
    ${colors.blueGray200} 4.69%,
    ${colors.blueGray200} 92.56%,
    ${colors.blueGray200}00 100%
  );
`;

export default List;
