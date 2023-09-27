import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import { fetchAllFAQ, fetchFAQCategories } from "@apis/faq";

import Section from "@components/faq/Section";
import Skeleton from "@components/globals/Skeleton";
import Tab from "@components/globals/tab/Tab";
import TabBar from "@components/globals/tab/TabBar";
import TabContent from "@components/globals/tab/TabContent";

import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";

interface FaqProps {}

const Faq = ({}: FaqProps) => {
  const [searchParams] = useSearchParams();
  const tab = useMemo(() => searchParams.get("tab") ?? "전체", [searchParams]);

  const { data: category, error: categoryError } = useQuery({
    queryKey: "faqCategory",
    queryFn: fetchFAQCategories,
  });

  const { data: faq, error: faqError } = useQuery({
    queryKey: "faq",
    queryFn: fetchAllFAQ,
  });

  if (categoryError || faqError) return <div>오류</div>;

  return (
    <PageLayout>
      <Container>
        <TabContainer>
          <TabBar>
            {[
              "전체",
              ...(category?.categories || Array(3).fill(undefined)),
            ].map((item, index) => (
              <Tab to={item === "전체" ? null : { tab: item }} key={index}>
                {item || <Skeleton width={35} height={20} />}
              </Tab>
            ))}
          </TabBar>
        </TabContainer>

        <TabContent>
          <ScrollContainer>
            <PageItemContainer>
              {(faq || Array(20).fill(null))
                .filter((article) => tab === "전체" || article.category === tab)
                .reverse()
                .map((article, index) => (
                  <Section key={tab + index} article={article} />
                ))}
            </PageItemContainer>
          </ScrollContainer>
        </TabContent>
      </Container>
    </PageLayout>
  );
};

const Container = styled.div`
  width: 754px;
  border-radius: 16px;

  margin-top: 20px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);

  overflow: hidden;
`;

const TabContainer = styled.div`
  position: relative;

  top: 16px;
  left: 20px;
`;

const ScrollContainer = styled.div`
  margin-top: 15px;
`;

export default Faq;
