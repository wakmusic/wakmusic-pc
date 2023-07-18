import { SongsSearchResponse, tabsTypes } from "@templates/search.ts";

import NotFound from "./NotFound";
import All from "./tabs/All";
import List from "./tabs/List";

interface ResultProps {
  tab: tabsTypes;
  query: string;
  res: SongsSearchResponse;
}

const Result = ({ tab, query, res }: ResultProps) => {
  if (
    tab === "all" &&
    Object.values(res)
      .map((i) => i.length)
      .some((i) => i !== 0)
  )
    return <All query={query} res={res} />;

  if (tab !== "all" && res[tab].length !== 0)
    return <List tab={tab} res={res} />;

  return <NotFound />;
};

export default Result;
