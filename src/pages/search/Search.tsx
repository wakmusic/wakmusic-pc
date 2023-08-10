import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import { fetchSearchSongs } from "@apis/songs";

import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";
import Result from "@components/search/Result";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import { searchTabs } from "@constants/tabs";

import { tabsTypes } from "@templates/search";
import { Query } from "@templates/tabType";

interface SearchProps {}

function isTabsTypes(arg: unknown): arg is tabsTypes {
  return arg === "all" || arg === "song" || arg === "artist" || arg === "remix";
}

const Search = ({}: SearchProps) => {
  const [searchParams] = useSearchParams();
  const tab = useMemo(() => {
    return isTabsTypes(searchParams.get("tab"))
      ? (searchParams.get("tab") as tabsTypes)
      : "all";
  }, [searchParams]);

  const query = useMemo(() => searchParams.get("query") ?? "", [searchParams]);

  const { isLoading, error, data } = useQuery({
    queryKey: ["search", query],
    queryFn: async () => await fetchSearchSongs(query),
  });

  // TODO
  if (isLoading || !data) return <div>로딩중...</div>;
  if (error) return <div>에러...</div>;

  return (
    <PageLayout>
      <Container>
        <TabBar>
          {searchTabs.map((item, index) => (
            <Tab to={{ query: query, tab: (item.to as Query).tab }} key={index}>
              {item.text}
            </Tab>
          ))}
        </TabBar>

        <Result tab={tab} query={query} res={data} />
      </Container>
    </PageLayout>
  );
};

const Container = styled(PageContainer)`
  padding-top: 16px;
  padding-left: 20px;
`;

export default Search;
