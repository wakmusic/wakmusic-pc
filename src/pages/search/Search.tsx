import { SongsSearchResponse } from "@templates/search";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import PageContainer from "@components/globals/PageContainer";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";
import Result from "@components/search/Result";

import colors from "@constants/colors";
import { songList } from "@constants/dummys";
import { searchTabs } from "@constants/tabs";

import { isNull } from "@utils/isTypes";

interface SearchProps {}

type tabsTypes = "all" | "song" | "artist" | "remix";

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
    <PageContainer>
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
    </PageContainer>
  );
};

const Container = styled.div`
  width: 754px;
  height: calc(100% - 40px);
  margin: 20px 0;
  padding: 16px 20px;

  border-radius: 15px;
  border: 1px solid ${colors.blueGray25};
  background: ${colors.white}66; // 40%
  backdrop-filter: blur(62.5px);
`;

export default Search;
