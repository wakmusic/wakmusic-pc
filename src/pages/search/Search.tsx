import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import { fetchSearchAll } from "@apis/songs";

import Tab from "@components/globals/tab/Tab";
import TabBar from "@components/globals/tab/TabBar";
import TabContent from "@components/globals/tab/TabContent";
import Result from "@components/search/Result";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import { searchTabs } from "@constants/tabs";

import { SearchTabType } from "@templates/search";
import { Query } from "@templates/tabType";

interface SearchProps {}

function isTabsTypes(arg: unknown): arg is SearchTabType {
  return arg === "all" || arg === "song" || arg === "artist" || arg === "remix";
}

const Search = ({}: SearchProps) => {
  const [searchParams] = useSearchParams();
  const tab = useMemo(() => {
    return isTabsTypes(searchParams.get("tab"))
      ? (searchParams.get("tab") as SearchTabType)
      : "all";
  }, [searchParams]);

  const query = useMemo(() => searchParams.get("query") ?? "", [searchParams]);

  const { isFetching, error, data } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => await fetchSearchAll(query),
  });

  // TODO
  if (error) return <div>에러...</div>;

  return (
    <PageLayout>
      <Container>
        <TabBarWrapper>
          <TabBar>
            {searchTabs.map((item, index) => (
              <Tab
                to={{ query: query, tab: (item.to as Query).tab }}
                key={index}
              >
                {item.text}
              </Tab>
            ))}
          </TabBar>
        </TabBarWrapper>

        <TabContent>
          <Result tab={tab} query={query} all={data} isFetching={isFetching} />
        </TabContent>
      </Container>
    </PageLayout>
  );
};

const Container = styled(PageContainer)`
  padding-top: 16px;
`;

const TabBarWrapper = styled.div`
  padding-left: 20px;
`;

export default Search;
