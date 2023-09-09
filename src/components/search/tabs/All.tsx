import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import { ReactComponent as ArrowRightSVG } from "@assets/icons/ic_16_arrow_right.svg";

import { T5Medium, T7Medium } from "@components/Typography";
import Skeleton from "@components/globals/Skeleton";
import SongItem from "@components/globals/SongItem";
import MusicController from "@components/globals/musicControllers/MusicController";

import PageItemContainer from "@layouts/PageItemContainer";

import colors from "@constants/colors";

import { useSelectSongs } from "@hooks/selectSongs";

import { SearchAllResponse } from "@templates/search.ts";

import NotFound from "../NotFound";

enum Category {
  song = "노래",
  artist = "가수",
  remix = "조교",
}

interface AllProps {
  query: string;
  res?: SearchAllResponse;
  isFetching: boolean;
}

const All = ({ query, res, isFetching }: AllProps) => {
  const [, setSearchParams] = useSearchParams();

  const resKeys = useMemo(
    () =>
      res &&
      (Object.keys(res) as Array<"song" | "artist" | "remix">).filter(
        (key) => res[key].length !== 0
      ),
    [res]
  );
  const { selected, selectCallback, selectedIncludes } = useSelectSongs();

  if (res && !isFetching && Object.values(res).every((i) => i.length === 0)) {
    return <NotFound />;
  }

  if (isFetching || !res || !resKeys) {
    return (
      <PageItemContainer height={142}>
        <Wrapper>
          {[...Array(3)].map((_, index) => (
            <CategoryContainer key={`c${index}`}>
              <CategoryHeader>
                <Skeleton width={35} height={22} />
                <Skeleton width={15} height={22} />
              </CategoryHeader>

              {[...Array(3)].map((_, index) => (
                <SongItem key={index} forceWidth={650} isLoading={isFetching} />
              ))}
            </CategoryContainer>
          ))}
        </Wrapper>
      </PageItemContainer>
    );
  }

  return (
    <PageItemContainer height={142}>
      <Wrapper>
        {resKeys.map((key, index) => (
          <CategoryContainer key={index}>
            <CategoryHeader>
              <T5Medium color={colors.gray900}>{Category[key]}</T5Medium>
              <T5Medium color={colors.point}>{res[key].length}</T5Medium>

              {res[key].length > 3 && (
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
              )}
            </CategoryHeader>

            {res[key].slice(0, 3).map((song, index) => (
              <SongItem
                key={index}
                song={song}
                index={index}
                selected={selectedIncludes(song, index)}
                onClick={selectCallback}
                forceWidth={650}
              />
            ))}
          </CategoryContainer>
        ))}
      </Wrapper>

      <MusicController
        songs={resKeys.map((key) => res[key].slice(-3)).flat()}
        selectedSongs={selected}
        dispatchSelectedSongs={selectCallback}
      />
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

  padding-bottom: 9px;
  padding-left: 20px;
`;

const CategoryHeaderButton = styled.div`
  display: flex;

  margin-left: auto;
  margin-right: 30px;

  cursor: pointer;
`;

export default All;
