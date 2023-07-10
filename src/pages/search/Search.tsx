import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import { T4Bold } from "@components/Typography";
import PageContainer from "@components/globals/PageContainer";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";

import colors from "@constants/colors";

import { isNull } from "@utils/isTypes";

interface SearchProps {}

const Search = ({}: SearchProps) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState({ query: "" });

  useEffect(() => {
    const search = searchParams.get("query");

    if (!isNull(search)) {
      setQuery({ query: search });
    }
  }, [query, searchParams]);

  return (
    <PageContainer>
      <Container>
        <TabBar>
          <Tab to={{ tab: "all", ...query }}>전체</Tab>
          <Tab to={{ tab: "songs", ...query }}>노래</Tab>
          <Tab to={{ tab: "artists", ...query }}>가수</Tab>
          <Tab to={{ tab: "training", ...query }}>조교</Tab>
        </TabBar>
        <T4Bold>Query: {searchParams.get("query")}</T4Bold>
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
