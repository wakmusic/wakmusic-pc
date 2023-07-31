import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import Section from "@components/faq/Section";
import DefaultScroll from "@components/globals/Scroll/DefaultScroll";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";

import PageLayout from "@layouts/PageLayout";

import colors from "@constants/colors";
import { faq } from "@constants/dummys";

interface FaqProps {}

const Faq = ({}: FaqProps) => {
  const [searchParams] = useSearchParams();
  const [tab, setTab] = useState("전체");

  useEffect(() => {
    const category = searchParams.get("tab");

    setTab(category ?? "전체");
  }, [searchParams]);

  return (
    <PageLayout>
      <Container>
        <TabContainer>
          <TabBar>
            {faq.category.map((item, index) => (
              <Tab to={{ tab: item.category }} key={index}>
                {item.category}
              </Tab>
            ))}
          </TabBar>
        </TabContainer>
        <ScrollContainer>
          <DefaultScroll>
            <Wrapper>
              {tab === "전체"
                ? faq.article.map((article, index) => (
                    <Section key={tab + index} article={article} />
                  ))
                : faq.article
                    .filter((article) => article.category.category === tab)
                    .map((article, index) => (
                      <Section key={tab + index} article={article} />
                    ))}
            </Wrapper>
          </DefaultScroll>
        </ScrollContainer>
      </Container>
    </PageLayout>
  );
};

const Container = styled.div`
  width: 754px;
  height: 636px;
  border-radius: 16px;

  margin-top: 20px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.whiteAlpha40};
  backdrop-filter: blur(62.5px);
`;

const TabContainer = styled.div`
  position: relative;

  top: 16px;
  left: 20px;
`;

const ScrollContainer = styled.div`
  margin-top: 15px;
`;

const Wrapper = styled.div`
  position: relative;
  top: -15px;
  height: 564px;
`;

export default Faq;
