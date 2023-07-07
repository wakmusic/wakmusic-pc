import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { T6Medium } from "@components/Typography";

import colors from "@constants/colors";

interface RecommandItemProps {
  // TODO: Interface 작업 예정
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  item: any;
}

const RecommandItem = ({ item }: RecommandItemProps) => {
  const navigate = useNavigate();

  return (
    <Container onClick={() => navigate(`/recommand/${item.key}`)}>
      <Title>{item.title}</Title>
      <Icon
        src={`https://static.wakmusic.xyz/static/playlist/icon/round/${item.key}.png?v=${item.image.round}`}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 180px;
  height: 88px;

  border-radius: 16px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66; // 40%
  backdrop-filter: blur(62.5px);

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 22px 0 16px;

  cursor: pointer;
`;

const Title = styled(T6Medium)`
  color: ${colors.blueGray600};
`;

const Icon = styled.img`
  width: 48px;
  height: 48px;
`;

export default RecommandItem;
