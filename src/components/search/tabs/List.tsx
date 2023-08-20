import { useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components/macro";

import { fetchSearchTab } from "@apis/songs";

import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem from "@components/globals/SongItem";
import Spinner from "@components/globals/Spinner";
import MusicController from "@components/globals/musicControllers/MusicController";

import PageItemContainer from "@layouts/PageItemContainer";
import VirtualItem from "@layouts/VirtualItem";

import { useInfiniteScrollHandler } from "@hooks/infiniteScrollHandler";
import { useScrollToTop } from "@hooks/scrollToTop";
import { useSelectSongs } from "@hooks/selectSongs";
import useVirtualizer from "@hooks/virtualizer";

import { SearchTabType } from "@templates/search";
import { SongTotal } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

import NotFound from "../NotFound";

interface ListProps {
  tab: SearchTabType;
  query: string;
}

const List = ({ tab, query }: ListProps) => {
  const { selected, setSelected, selectCallback, selectedIncludes } =
    useSelectSongs();

  const {
    data: songsData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    isLoading,
    error,
  } = useInfiniteQuery<SongTotal[]>({
    queryKey: ["searchTab", tab, query],
    queryFn: async ({ pageParam = 0 }) =>
      tab !== "all"
        ? await fetchSearchTab(query, tab, {
            start: pageParam,
          })
        : [],
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;

      return allPages.flat().length;
    },
  });

  const songs = useMemo(() => {
    if (!songsData) return [];

    return songsData.pages.flat();
  }, [songsData]);

  const { viewportRef, getTotalSize, virtualMap, getVirtualItems } =
    useVirtualizer(songs, {
      hasNextPage,
    });

  useScrollToTop(tab, viewportRef, setSelected);
  useInfiniteScrollHandler({
    items: songs,
    hasNextPage,
    fetchNextPage,
    getVirtualItems,
    isFetchingNextPage,
  });

  if (error) return <div>오류</div>;
  if (!isLoading && songs.length === 0) return <NotFound />;

  return (
    <Container>
      <GuideBar
        features={[
          GuideBarFeature.info,
          GuideBarFeature.last,
          GuideBarFeature.date,
          GuideBarFeature.views,
        ]}
      />

      <PageItemContainer
        height={181}
        ref={viewportRef}
        totalSize={getTotalSize()}
      >
        {virtualMap((virtualItem, item) => {
          const isLoader = virtualItem.index > songs.length - 1;

          return (
            <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
              {isLoader ? (
                <Spinner />
              ) : (
                <SongItem
                  song={item}
                  index={virtualItem.index}
                  selected={selectedIncludes(item, virtualItem.index)}
                  features={[
                    SongItemFeature.date,
                    SongItemFeature.views,
                    SongItemFeature.like,
                  ]}
                  onClick={selectCallback}
                />
              )}
            </VirtualItem>
          );
        })}
      </PageItemContainer>

      <MusicController
        songs={songs}
        selectedSongs={selected}
        dispatchSelectedSongs={selectCallback}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-left: -20px;
`;

export default List;
