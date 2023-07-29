import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";
import Result from "@components/search/Result";

import PageContainer from "@layouts/PageContainer";
import PageLayout from "@layouts/PageLayout";

import { songList } from "@constants/dummys";
import { searchTabs } from "@constants/tabs";

import { SongsSearchResponse, tabsTypes } from "@templates/search";

import { isNull } from "@utils/isTypes";

interface SearchProps {}

function isTabsTypes(arg: unknown): arg is tabsTypes {
  return arg === "all" || arg === "song" || arg === "artist" || arg === "remix";
}

const Search = ({}: SearchProps) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<SongsSearchResponse>();
  const [tab, setTab] = useState<tabsTypes>("all");

  useEffect(() => {
    const search = searchParams.get("query");
    const tab = isTabsTypes(searchParams.get("tab"))
      ? (searchParams.get("tab") as tabsTypes)
      : "all";

    if (!isNull(search)) {
      setQuery(search);
    }

    if (!isNull(tab)) {
      setTab(tab);
    }

    // TODO: 여기서 api 요청
    setResponses(songList);
  }, [query, searchParams]);

  return (
    <PageLayout>
      <Container>
        <TabBar>
          {searchTabs.map((item, index) => (
            <Tab to={{ query: query, ...item.to }} key={index}>
              {item.text}
            </Tab>
          ))}
        </TabBar>
        {responses ? (
          <Result tab={tab} query={query} res={responses} />
        ) : (
          <div>로딩중이에용</div>
        )}
      </Container>
    </PageLayout>
  );
};

const Container = styled(PageContainer)`
  padding: 16px 20px;
`;

export default Search;
