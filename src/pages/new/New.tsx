import { useMemo } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import { fetchChartsUpdateTypes } from "@apis/charts";
import { NewSongsType, fetchNewSongs } from "@apis/songs";

import FunctionSection from "@components/globals/FunctionSection";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem from "@components/globals/SongItem";
import Spinner from "@components/globals/Spinner";
import UpdatedText from "@components/globals/UpdatedText";
import MusicController from "@components/globals/musicControllers/MusicController";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";
import VirtualItem from "@layouts/VirtualItem";

import { newTabs } from "@constants/tabs";

import { useInfiniteScrollHandler } from "@hooks/infiniteScrollHandler";
import { usePlaySongs } from "@hooks/player";
import { useScrollToTop } from "@hooks/scrollToTop";
import { useSelectSongs } from "@hooks/selectSongs";
import useVirtualizer from "@hooks/virtualizer";

import { SongTotal } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

interface NewProps {}

const New = ({}: NewProps) => {
  const [searchParams] = useSearchParams();
  const tab = useMemo(
    () => (searchParams.get("group") ?? "all") as NewSongsType,
    [searchParams]
  );

  const { selected, setSelected, selectCallback } = useSelectSongs();
  const playSongs = usePlaySongs();

  const {
    isLoading: songsIsLoading,
    error: songsError,
    data: songsData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<SongTotal[]>({
    queryKey: ["new", tab],
    queryFn: async ({ pageParam = 0 }) => await fetchNewSongs(tab, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;

      return allPages.flat().length;
    },
  });

  const songs = useMemo(() => {
    if (!songsData) return [];

    return songsData.pages.flat();
  }, [songsData]);

  const {
    isLoading: updatedIsLoading,
    error: updatedError,
    data: updated,
  } = useQuery({
    queryKey: ["chartUpdated", "hourly"],
    queryFn: async () => await fetchChartsUpdateTypes("hourly"),
  });

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

  // TODO
  if (songsIsLoading || updatedIsLoading || !songs || !updated)
    return <div>로딩중...</div>;
  if (songsError || updatedError) return <div>에러...</div>;

  return (
    <PageLayout>
      <PageContainer>
        <FunctionSection
          tabs={newTabs}
          play={(shuffle) => {
            playSongs(songs, shuffle);
          }}
        />

        <UpdatedText updated={updated} marginTop={12} marginLeft={20} />

        <GuideBar
          features={[
            GuideBarFeature.info,
            GuideBarFeature.last,
            GuideBarFeature.date,
            GuideBarFeature.views,
          ]}
          lastText="누적 순위"
        />

        <PageItemContainer
          height={209}
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
                    selected={selected.includes(item)}
                    features={[
                      SongItemFeature.last,
                      SongItemFeature.date,
                      SongItemFeature.views,
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
      </PageContainer>
    </PageLayout>
  );
};

export default New;
