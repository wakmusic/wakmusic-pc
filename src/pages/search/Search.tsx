import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

import PageContainer from "@components/globals/PageContainer";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";
import Result from "@components/search/Result";

import colors from "@constants/colors";
import { likeList, songList } from "@constants/dummys";
import { searchTabs } from "@constants/tabs";

import { isNull } from "@utils/isTypes";

type Song = {
  songId: string;
  title: string;
  artist: string;
  remix: string;
  reaction: string;
  date: number;
  start: number;
  end: number;
  total: {
    views: number | null;
    increase: number | null;
    last: number | null;
  };
};

interface SearchProps {}

const Search = ({}: SearchProps) => {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [responses, setResponses] = useState<{
    songs: Array<Song>;
    artists: Array<Song>;
    training: Array<Song>;
  }>();
  const [likes, setLikes] = useState<{
    [id: string]: number;
  }>({});
  const [tab, setTab] = useState<"all" | "songs" | "artists" | "training">(
    "all"
  );

  useEffect(() => {
    const search = searchParams.get("query");
    const tab = searchParams.get("tab") as
      | "all"
      | "songs"
      | "artists"
      | "training";

    if (!isNull(search)) {
      setQuery(search);
    }

    if (!isNull(tab)) {
      setTab(tab);
    }

    // TODO: 여기서 api 요청하면 됩니다.
    setResponses({
      songs: songList.filter((song) => song.title.includes(query)),
      artists: songList.filter((song) => song.artist.includes(query)),
      training: songList.filter((song) => song.remix.includes(query)),
    });

    // TODO: 여기선 좋아요 수 api
    setLikes(
      songList
        .filter(
          (song) =>
            song.title.includes(query) ||
            song.artist.includes(query) ||
            song.remix.includes(query)
        )
        .reduce((acc: { [id: string]: number }, song) => {
          const likeItem = likeList.find(
            (item) => item.song.songId === song.songId
          );
          if (likeItem) {
            acc[song.songId] = likeItem.likes;
          }
          return acc;
        }, {})
    );
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
        {responses && likes ? (
          <Result tab={tab} query={query} res={responses} likeList={likes} />
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
