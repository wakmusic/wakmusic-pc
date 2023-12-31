import { useMemo } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { queryClient } from "src/main";

import { fetchChartsUpdateTypes } from "@apis/charts";
import { NewSongsType, fetchAllSongs, fetchNewSongs } from "@apis/songs";

import FunctionSection from "@components/globals/FunctionSection";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem from "@components/globals/SongItem";
import Spinner from "@components/globals/Spinner";
import UpdatedText from "@components/globals/UpdatedText";
import MusicController from "@components/globals/musicControllers/MusicController";
import TabContent from "@components/globals/tab/TabContent";

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

import { Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

interface NewProps {}

const New = ({}: NewProps) => {
  const [searchParams] = useSearchParams();
  const tab = useMemo(
    () => (searchParams.get("group") ?? "all") as NewSongsType,
    [searchParams]
  );

  const playSongs = usePlaySongs();

  const {
    isFetching: songsIsLoading,
    error: songsError,
    data: songsData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<Song[]>({
    queryKey: ["new", tab],
    queryFn: async ({ pageParam = 0 }) => await fetchNewSongs(tab, pageParam),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;

      return allPages.flat().length;
    },
  });

  const songs = useMemo(() => {
    if (songsIsLoading && !isFetchingNextPage) return Array(50).fill(null);
    if (!songsData) return [];

    return songsData.pages.flat();
  }, [songsIsLoading, isFetchingNextPage, songsData]);

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

  const { selected, setSelected, selectCallback, selectedIncludes } =
    useSelectSongs(songs);

  useScrollToTop(tab, viewportRef, setSelected);
  useInfiniteScrollHandler({
    items: songs,
    hasNextPage,
    fetchNextPage,
    getVirtualItems,
    isFetchingNextPage,
  });

  // TODO
  if (songsError || updatedError) return <div>에러...</div>;

  return (
    <PageLayout>
      <PageContainer>
        <FunctionSection
          tabs={newTabs}
          play={(shuffle) => {
            queryClient
              .fetchQuery({
                queryKey: "allSongs",
                queryFn: fetchAllSongs,
              })
              .then((songs) => playSongs(songs, shuffle));
          }}
        />

        <TabContent>
          <UpdatedText
            updated={updated}
            marginTop={12}
            marginLeft={20}
            isLoading={updatedIsLoading}
          />

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
                      selected={selectedIncludes(item)}
                      features={[
                        SongItemFeature.last,
                        SongItemFeature.date,
                        SongItemFeature.views,
                      ]}
                      onClick={selectCallback}
                      isLoading={songsIsLoading && !isFetchingNextPage}
                    />
                  )}
                </VirtualItem>
              );
            })}
          </PageItemContainer>
        </TabContent>

        <MusicController
          songs={songs}
          selectedSongs={selected}
          setSelected={setSelected}
        />
      </PageContainer>
    </PageLayout>
  );
};

export default New;
