import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import { fetchAllNotice, fetchNoticeCategories } from "@apis/notice";

import Skeleton from "@components/globals/Skeleton";
import Tab from "@components/globals/tab/Tab";
import TabBar from "@components/globals/tab/TabBar";
import TabContent from "@components/globals/tab/TabContent";
import NoticeGuideBar from "@components/notice/NoticeGuideBar";
import NoticeItem from "@components/notice/NoticeItem";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";

interface NoticeProps {}

const Notice = ({}: NoticeProps) => {
  const [searchParams] = useSearchParams();
  const tab = useMemo(() => searchParams.get("tab") ?? "전체", [searchParams]);

  const { data: category, error: categoryError } = useQuery({
    queryKey: "noticeCategory",
    queryFn: fetchNoticeCategories,
  });

  const { data: notice, error: noticeError } = useQuery({
    queryKey: "noticeAll",
    queryFn: fetchAllNotice,
  });

  if (categoryError || noticeError) return <div>오류</div>;

  return (
    <PageLayout>
      <PageContainer>
        <TabContainer>
          <TabBar>
            {["전체", ...(category || Array(3).fill(undefined))].map(
              (item, index) => (
                <Tab to={item === "전체" ? null : { tab: item }} key={index}>
                  {item || <Skeleton width={35} height={20} />}
                </Tab>
              )
            )}
          </TabBar>
        </TabContainer>

        <TabContent>
          <NoticeGuideBar />

          <PageItemContainer height={171}>
            {(notice || Array(3).fill(null))
              .filter((notice) => tab === "전체" || notice.category === tab)
              .map((notice, index) => (
                <NoticeItem key={index} notice={notice} />
              ))}
          </PageItemContainer>
        </TabContent>
      </PageContainer>
    </PageLayout>
  );
};

const TabContainer = styled.div`
  position: relative;

  top: 16px;
  left: 20px;
`;

export default Notice;
