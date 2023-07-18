import { Song } from "@templates/search.ts";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { ReactComponent as ArrowRightSVG } from "@assets/icons/ic_16_arrow_right.svg";

import { T4Medium, T6Medium, T7Medium } from "@components/Typography";
import DefaultScroll from "@components/globals/Scroll/DefaultScroll";

import colors from "@constants/colors";

import NotFound from "./NotFound";
import SongCard from "./SongCard";
import SongSection from "./SongSection";

enum Category {
  song = "노래",
  artist = "가수",
  remix = "조교",
}

interface ResultProps {
  tab: "all" | "song" | "artist" | "remix";
  query: string;
  res: {
    song: Song[];
    artist: Song[];
    remix: Song[];
  };
}

const Result = ({ tab, query, res }: ResultProps) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <Container>
      {tab === "all" &&
      Object.values(res).filter((value) => value.length !== 0).length !== 0 ? (
        <ListContainer top={16}>
          <DefaultScroll>
            <AllSongWrapper>
              {(Object.keys(res) as Array<"song" | "artist" | "remix">)
                .filter((key) => res[key].length !== 0)
                .map((key, index) => (
                  <CategoryContainer key={index}>
                    <CategoryHeader>
                      <CategoryHeaderText color={colors.gray900}>
                        {Category[key]}
                      </CategoryHeaderText>
                      <CategoryHeaderText color={colors.point} left={4}>
                        {res[key].length}
                      </CategoryHeaderText>
                      <CategoryHeaderButton
                        onClick={() => {
                          setSearchParams({
                            query: query,
                            tab: key,
                          });
                        }}
                      >
                        <T6Medium>전체보기</T6Medium>
                        <ArrowRightSVG />
                      </CategoryHeaderButton>
                    </CategoryHeader>
                    <SongCard songs={res[key]} />
                  </CategoryContainer>
                ))}
            </AllSongWrapper>
          </DefaultScroll>
        </ListContainer>
      ) : tab !== "all" && res[tab].length !== 0 ? (
        <ListContainer top={14}>
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
              <SpecificSongWrapper>
                {res[tab].map((item, index) => (
                  <SongSection item={item} key={index} />
                ))}
              </SpecificSongWrapper>
            </DefaultScroll>
          </SongContainer>
        </ListContainer>
      ) : (
        <NotFound />
      )}
    </Container>
  );
};

const Container = styled.div``;

const ListContainer = styled.div<{
  top?: number;
}>`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: ${(p) => p.top ?? 0}px;
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

const CategoryContainer = styled.div`
  &:nth-child(1) div {
    margin-top: 0px;
  }
`;

const CategoryHeader = styled.div`
  height: 30px;
  margin: 16px 20px 8px 20px;
`;

const CategoryHeaderText = styled(T4Medium)<{
  color: string;
  left?: number;
}>`
  color: ${(p) => p.color};
  margin-left: ${(p) => p.left ?? 0}px;
  float: left;
`;

const CategoryHeaderButton = styled.div`
  position: relative;
  top: 50%;
  transform: translateY(-50%);

  height: 20px;
  flex-shrink: 0;
  float: right;

  display: flex;
  cursor: pointer;

  & * {
    color: ${colors.gray500};
  }

  & svg {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const AllSongWrapper = styled.div`
  height: calc(100vh - 171px);
`;

const SpecificSongWrapper = styled.div`
  height: calc(100vh - 202px);
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

export default Result;
