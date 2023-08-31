import { useNavigate } from "react-router-dom";
import styled from "styled-components/macro";

import { T6Medium } from "@components/Typography";
import Skeleton from "@components/globals/Skeleton";

import colors from "@constants/colors";

import { RecommendListMetaType } from "@templates/playlist";

import { getRecommendRoundImage } from "@utils/staticUtill";

interface RecommendItemProps {
  item: RecommendListMetaType | null;
}

const RecommendItem = ({ item }: RecommendItemProps) => {
  const navigate = useNavigate();

  if (!item) {
    return (
      <Container>
        <Skeleton width={85} height={20} />
        <Skeleton width={48} height={48} borderRadius="50%" />
      </Container>
    );
  }

  return (
    <Container onClick={() => navigate(`/playlist/${item.key}`)}>
      <Title>{item.title}</Title>
      <Icon src={getRecommendRoundImage(item)} />
    </Container>
  );
};

const Container = styled.div`
  width: 180px;
  height: 88px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 22px 0 16px;

  cursor: pointer;
`;

const Title = styled(T6Medium)`
  color: ${colors.blueGray600};

  width: 85px;

  white-space: pre-wrap;
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

export default RecommendItem;
