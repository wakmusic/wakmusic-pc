import styled from "styled-components";

import { T4Medium } from "@components/Typography";
import PageContainer from "@components/globals/PageContainer";
import Background from "@components/index/Background";
import Chart from "@components/index/Chart";
import RecommandItem from "@components/index/RecommandItem";

import colors from "@constants/colors";
import { recommended } from "@constants/dummys";

interface IndexProps {}

const Index = ({}: IndexProps) => {
  return (
    <Container>
      <Background />

      <Chart />

      <RecommandContainer>
        <T4Medium color={colors.primary900}>왁뮤팀이 추천하는 리스트</T4Medium>
        <RecommandItems>
          {recommended.map((item, index) => (
            <RecommandItem key={index} item={item} />
          ))}
        </RecommandItems>
      </RecommandContainer>
    </Container>
  );
};

const Container = styled(PageContainer)`
  display: flex;

  flex-direction: column;
`;

const RecommandContainer = styled.div`
  margin-top: 24px;

  width: 750px;
  height: 186px;
`;

const RecommandItems = styled.div`
  margin-top: 12px;

  display: grid;
  grid-template-columns: repeat(4, 1fr);

  gap: 10px;
`;

export default Index;
