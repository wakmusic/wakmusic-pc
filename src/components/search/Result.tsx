import { SearchAllResponse, SearchTabType } from "@templates/search.ts";

import NotFound from "./NotFound";
import All from "./tabs/All";
import List from "./tabs/List";

interface ResultProps {
  tab: SearchTabType;
  query: string;

  all: SearchAllResponse;
}

const Result = ({ tab, query, all }: ResultProps) => {
  if (
    Object.values(all)
      .map((i) => i.length)
      .some((i) => i !== 0)
  ) {
    if (tab === "all") return <All query={query} res={all} />;
  } else {
    return <NotFound />;
  }

  return <List query={query} tab={tab} />;
};

export default Result;
