import { useQuery } from "react-query";
import styled from "styled-components/macro";

import { fetchRecommendedPlaylist } from "@apis/playlist";

import { T4Medium } from "@components/Typography";
import Background from "@components/index/Background";
import Chart from "@components/index/Chart";
import RecommendItem from "@components/index/RecommendItem";

import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";

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

  // TODO
  if (recommendIsLoading || !recommendLists) return <div>loading...</div>;
  if (recommendError) return <div>error...</div>;

  return (
    <Container>
      <Background />

      <Chart />

      <RecommandContainer>
        <T4Medium color={colors.primary900}>왁뮤팀이 추천하는 리스트</T4Medium>
        <RecommendItems>
          {recommendLists.map((item, index) => (
            <RecommendItem key={index} item={item} />
          ))}
        </RecommendItems>
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

const RecommendItems = styled.div`
  margin-top: 12px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
`;

export default Index;
