import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/macro";

import { fetchRecommendedPlaylist } from "@apis/playlist";

import { T4Medium } from "@components/Typography";
import Arrow from "@components/icons/Arrow";
import Background from "@components/index/Background";
import Chart from "@components/index/Chart";
import RecommendItem from "@components/index/RecommendItem";

import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";

import { RecommendListMetaType } from "@templates/playlist";

interface IndexProps {}

const Index = ({}: IndexProps) => {
  const {
    isLoading: recommendIsLoading,
    error: recommendError,
    data: recommendLists,
  } = useQuery({
    queryKey: "recommendLists",
    queryFn: fetchRecommendedPlaylist,
    staleTime: Infinity,
  });

  const [page, setPage] = useState<number>(0);

  // TODO
  if (recommendIsLoading || !recommendLists) return <div>loading...</div>;
  if (recommendError) return <div>error...</div>;

  function changePage(condition: boolean, change: number) {
    if (condition) {
      setPage(page + change);
    }
  }

  function listChunk(list: RecommendListMetaType[], divisor: number) {
    return list.reduce((acc: RecommendListMetaType[][], _, index) => {
      if (index % divisor === 0) acc.push(list.slice(index, index + divisor));

      return acc;
    }, []);
  }

  return (
    <Container>
      <Background />

      <Chart />

      <RecommandContainer>
        <HeaderContainer>
          <T4Medium color={colors.primary900}>
            왁뮤팀이 추천하는 리스트
          </T4Medium>
          <NavigatorContainer>
            <NavigatorArrow
              direction="left"
              $disabled={page <= 0}
              onClick={() => changePage(page > 0, -1)}
            />
            <NavigatorArrow
              direction="right"
              $disabled={page >= Math.ceil(recommendLists.length / 8) - 1}
              onClick={() =>
                changePage(page < Math.ceil(recommendLists.length / 8) - 1, 1)
              }
            />
          </NavigatorContainer>
        </HeaderContainer>

        <RecommentItemContainer>
          {listChunk(recommendLists, 8).map((item, index) => (
            <RecommendItems key={index} $page={page}>
              {item.map((item, index) => (
                <RecommendItem key={index} item={item} />
              ))}
            </RecommendItems>
          ))}
        </RecommentItemContainer>
      </RecommandContainer>
    </Container>
  );
};

const Container = styled(PageLayout)`
  display: flex;

  flex-direction: column;
`;

const RecommandContainer = styled.div`
  margin-top: 24px;

  width: 750px;
  height: 186px;
`;

const HeaderContainer = styled.div`
  height: 30px;

  display: flex;
  align-items: center;
`;

const NavigatorContainer = styled.div`
  display: flex;
  gap: 4px;

  margin-left: auto;

  width: 44px;
  height: 20px;
`;

const NavigatorArrow = styled(Arrow)<{
  $disabled?: boolean;
}>`
  color: ${({ $disabled }) => ($disabled ? colors.gray400 : colors.gray500)};

  cursor: ${({ $disabled }) => ($disabled ? "auto" : "pointer")};
`;

const RecommentItemContainer = styled.div`
  margin-top: 12px;

  display: flex;
  gap: 10px;
  overflow: hidden;

  height: 186px;
`;

const RecommendItems = styled.div<{
  $page: number;
}>`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;

  transform: translateX(${({ $page }) => $page * -760}px);
  transition: transform ease 300ms;
`;

export default Index;
