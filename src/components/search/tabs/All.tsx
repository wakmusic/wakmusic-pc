import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import { ReactComponent as ArrowRightSVG } from "@assets/icons/ic_16_arrow_right.svg";

import { T5Medium, T7Medium } from "@components/Typography";

import PageItemContainer from "@layouts/PageItemContainer";

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
    <PageItemContainer height={142}>
      <Wrapper>
        {(Object.keys(res) as Array<"song" | "artist" | "remix">)
          .filter((key) => res[key].length !== 0)
          .map((key, index) => (
            <CategoryContainer key={index}>
              <CategoryHeader>
                <T5Medium color={colors.gray900}>{Category[key]}</T5Medium>
                <T5Medium color={colors.point}>{res[key].length}</T5Medium>

                <CategoryHeaderButton
                  onClick={() => {
                    setSearchParams({
                      query: query,
                      tab: key,
                    });
                  }}
                >
                  <T7Medium color={colors.gray500}>전체보기</T7Medium>
                  <ArrowRightSVG />
                </CategoryHeaderButton>
              </CategoryHeader>

              <SongCard songs={res[key]} />
            </CategoryContainer>
          ))}
      </Wrapper>
    </PageItemContainer>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 8px;
  padding-top: 8px;
`;

const CategoryContainer = styled.div``;

const CategoryHeader = styled.div`
  display: flex;
  align-items: center;

  gap: 4px;
`;

const CategoryHeaderButton = styled.div`
  display: flex;

  margin-left: auto;
  margin-right: 30px;

  cursor: pointer;
`;

export default All;
