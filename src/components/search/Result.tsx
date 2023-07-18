import { SongsSearchResponse } from "@templates/search.ts";
import styled from "styled-components";

import NotFound from "./NotFound";
import All from "./tabs/All";
import List from "./tabs/List";

interface ResultProps {
  tab: "all" | "song" | "artist" | "remix";
  query: string;
  res: SongsSearchResponse;
}

const Result = ({ tab, query, res }: ResultProps) => {
  return (
    <Container>
      {tab === "all" &&
      Object.values(res).filter((value) => value.length !== 0).length !== 0 ? (
        <All query={query} res={res} />
      ) : tab !== "all" && res[tab].length !== 0 ? (
        <List tab={tab} res={res} />
      ) : (
        <NotFound />
      )}
    </Container>
  );
};

const Container = styled.div``;

export default Result;
