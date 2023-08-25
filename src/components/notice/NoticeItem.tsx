import { useMemo } from "react";
import styled from "styled-components/macro";

import { T6Medium, T7_1Light } from "@components/Typography";
import Skeleton from "@components/globals/Skeleton";

import colors from "@constants/colors";

import { useNoticeDetailModal } from "@hooks/noticeDetailModal";

import { Notice } from "@templates/notice";

interface NoticeItemProps {
  notice?: Notice;
}

const NoticeItem = ({ notice }: NoticeItemProps) => {
  const date = useMemo(() => notice && new Date(notice.createdAt), [notice]);
  const openNoticeDetailModal = useNoticeDetailModal();

  if (!notice || !date) {
    return (
      <Container>
        <Content>
          <CategoryText>
            <Skeleton width={50} height={20} />
          </CategoryText>
          <TitleText>
            <Skeleton width={400} height={20} />
          </TitleText>
          <DateText>
            <Skeleton width={60} height={20} />
          </DateText>
        </Content>
      </Container>
    );
  }

  return (
    <Container onClick={() => openNoticeDetailModal(notice)}>
      <Content>
        <CategoryText>{notice.category}</CategoryText>
        <TitleText>{notice.title}</TitleText>
        <DateText>
          {date.getFullYear()}.{String(date.getMonth() + 1).padStart(2, "0")}.
          {String(date.getDay()).padStart(2, "0")}
        </DateText>
      </Content>

      <Line />
    </Container>
  );
};

const Container = styled.div`
  margin: 0 10px;

  height: 48px;

  cursor: pointer;

  &:hover {
    background-color: ${colors.blueGray100};
  }
`;

const Content = styled.div`
  margin: 0 10px;

  height: 100%;

  display: flex;
  align-items: center;
`;

const CategoryText = styled(T6Medium)`
  color: ${colors.blueGray400};

  width: 50px;
  text-align: center;
`;

const TitleText = styled(T6Medium)`
  color: ${colors.blueGray600};

  margin-left: 16px;
`;

const DateText = styled(T7_1Light)`
  color: ${colors.blueGray600};

  margin-left: auto;
  margin-right: 20px;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;

  border-radius: 99px;
  background: #e4e7ec;
`;

export default NoticeItem;
