import { SearchAllResponse, SearchTabType } from "@templates/search.ts";

import All from "./tabs/All";
import List from "./tabs/List";

interface ResultProps {
  tab: SearchTabType;
  query: string;

  all?: SearchAllResponse;
  isFetching: boolean;
}

const Result = ({ tab, query, all, isFetching }: ResultProps) => {
  if (tab === "all") {
    return <All query={query} res={all} isFetching={isFetching} />;
  }

  return <List query={query} tab={tab} />;
};

export default Result;
