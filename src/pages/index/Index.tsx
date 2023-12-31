import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components/macro";

import { fetchRecommendedPlaylist } from "@apis/playlist";

import 히죽두 from "@assets/imgs/테헹.webp";

import { T4Medium } from "@components/Typography";
import Arrow from "@components/icons/Arrow";
import Background from "@components/index/Background";
import Chart from "@components/index/Chart";
import RecommendItem from "@components/index/RecommendItem";

import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";

import listChunk from "@utils/listChunk";

interface IndexProps {}

const Index = ({}: IndexProps) => {
  const { error: recommendError, data: recommendLists } = useQuery({
    queryKey: "recommendLists",
    queryFn: fetchRecommendedPlaylist,
    staleTime: Infinity,
  });

  const [page, setPage] = useState<number>(0);

  // TODO
  if (recommendError) return <div>error...</div>;

  function changePage(condition: boolean, change: number) {
    if (condition) {
      setPage(page + change);
    }
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
              $disabled={
                recommendLists &&
                page >= Math.ceil(recommendLists.length / 8) - 1
              }
              onClick={() =>
                recommendLists &&
                changePage(page < Math.ceil(recommendLists.length / 8) - 1, 1)
              }
            />
          </NavigatorContainer>
        </HeaderContainer>

        <RecommentItemContainer>
          {listChunk(recommendLists ?? Array(8).fill(null), 8).map(
            (item, index) => (
              <RecommendItems key={index} $page={page}>
                {item.map((item, index) => (
                  <RecommendItem key={index} item={item} />
                ))}
              </RecommendItems>
            )
          )}
        </RecommentItemContainer>
      </RecommandContainer>

      <테헹 src={히죽두} />
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

const 테헹 = styled.img`
  position: fixed;

  left: 4000px;
  top: 2000px;

  opacity: 0.2;

  transform: rotate(-20deg);
`;

export default Index;
