import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import { ReactComponent as ArrowRightSVG } from "@assets/icons/ic_16_arrow_right.svg";

import { T4Medium, T6Medium } from "@components/Typography";
import DefaultScroll from "@components/globals/Scroll/DefaultScroll";

import colors from "@constants/colors";

import { SongsSearchResponse } from "@templates/search.ts";

import SongCard from "../SongCard";

enum Category {
  song = "노래",
  artist = "가수",
  remix = "조교",
}

interface AllProps {
  query: string;
  res: SongsSearchResponse;
}

const All = ({ query, res }: AllProps) => {
  const [, setSearchParams] = useSearchParams();

  return (
    <Container>
      <DefaultScroll>
        <SongWrapper>
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
        </SongWrapper>
      </DefaultScroll>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin-top: 16px;
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

const SongWrapper = styled.div`
  height: calc(100vh - 150px);
`;

export default All;
