import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import {
  ArtistAlbumsSortType,
  fetchArtistAlbums,
  fetchArtistList,
} from "@apis/artist";

import ArtistInfo from "@components/artists/ArtistInfo";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";
import VirtualItem from "@layouts/VirtualItem";

import { artistDetailTabs } from "@constants/tabs";

import useVirtualizer from "@hooks/virtualizer";

import { Song, SongTotal } from "@templates/song";

interface ArtistProps {}

const Artist = ({}: ArtistProps) => {
  const [selected, setSelected] = useState<Song[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = (searchParams.get("tab") as ArtistAlbumsSortType) ?? "new";

  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams({ tab: "new" });
    }
  }, [searchParams, setSearchParams]);

  const location = useLocation();
  const artistId = useMemo(
    () => location.pathname.split("/")[2],
    [location.pathname]
  );

  const {
    isLoading: artistsIsLoading,
    error: artistsError,
    data: artists,
  } = useQuery({
    queryKey: "artists",
    queryFn: async () => {
      return await fetchArtistList();
    },
  });

  const {
    isLoading: albumsIsLoading,
    error: albumsError,
    data: albumsData,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<SongTotal[]>({
    queryKey: ["artistsAlbums", tab, artistId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!artistId || !tab) return [];

      return await fetchArtistAlbums(artistId, tab, pageParam);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;

      return allPages.flat().length;
    },
  });

  const artist = useMemo(
    () => artists?.find((artist) => artist.artistId === artistId),
    [artists, artistId]
  );

  const albums = useMemo(() => {
    if (!albumsData) return [];

    return albumsData.pages.flat();
  }, [albumsData]);

  const { viewportRef, getTotalSize, virtualMap, getVirtualItems } =
    useVirtualizer(albums, {
      hasNextPage,
    });

  useEffect(() => {
    if (!albums) return;

    const [lastItem] = [...getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= albums.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [albums, fetchNextPage, getVirtualItems, hasNextPage, isFetchingNextPage]);

  if (artistsIsLoading || albumsIsLoading) return <div>로딩중...</div>;
  if (artistsError || albumsError || !artists || !artist || !albums)
    return <div>에러 발생!</div>;

  return (
    <PageLayout>
      <PageContainer>
        <ArtistInfo artist={artist} />

        <TabBarWrapper>
          <TabBar>
            {artistDetailTabs.map((item, index) => (
              <Tab to={item.to} key={index}>
                {item.text}
              </Tab>
            ))}
          </TabBar>
        </TabBarWrapper>

        <GuideBar
          features={[
            GuideBarFeature.info,
            GuideBarFeature.date,
            GuideBarFeature.views,
            GuideBarFeature.like,
          ]}
        />

        <PageItemContainer
          height={381}
          ref={viewportRef}
          totalSize={getTotalSize()}
        >
          {virtualMap((virtualItem, item) => {
            const isLoader = virtualItem.index > albums.length - 1;

            return (
              <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
                {isLoader ? (
                  <SpinnerWrapper>
                    <Spinner />
                  </SpinnerWrapper>
                ) : (
                  <SongItem
                    song={item}
                    selected={selected.includes(item)}
                    features={[
                      SongItemFeature.date,
                      SongItemFeature.views,
                      SongItemFeature.like,
                    ]}
                    onClick={(song) => {
                      if (selected.includes(song)) {
                        setSelected(selected.filter((item) => item !== song));
                      } else {
                        setSelected([...selected, song]);
                      }
                    }}
                  />
                )}
              </VirtualItem>
            );
          })}
        </PageItemContainer>
      </PageContainer>
    </PageLayout>
  );
};

const TabBarWrapper = styled.div`
  margin: 16px 0 0 20px;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding-top: 20px;
`;

const Spinner = styled.div`
  display: inline-block;

  width: 20px;
  height: 20px;

  border: 2px solid black;
  border-bottom-color: transparent;
  border-radius: 50%;

  animation: rotation 1s linear infinite;

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Artist;
