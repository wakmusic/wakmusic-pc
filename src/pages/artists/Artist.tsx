import { useAnimation } from "framer-motion";
import throttle from "lodash.throttle";
import { useEffect, useMemo, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useLocation, useSearchParams } from "react-router-dom";
import styled from "styled-components/macro";

import {
  ArtistAlbumsSortType,
  fetchArtistAlbums,
  fetchArtistList,
} from "@apis/artist";

import { ReactComponent as PlayAllSVG } from "@assets/icons/ic_24_play_all.svg";
import { ReactComponent as RandomSVG } from "@assets/icons/ic_24_random_900.svg";

import ArtistInfo from "@components/artists/ArtistInfo";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import IconButton from "@components/globals/IconButton";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";
import Tab from "@components/globals/Tab";
import TabBar from "@components/globals/TabBar";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";
import VirtualItem from "@layouts/VirtualItem";

import { artistDetailTabs } from "@constants/tabs";

import { usePlayingInfoState } from "@hooks/player";
import useVirtualizer from "@hooks/virtualizer";

import { Song, SongTotal } from "@templates/song";

import getChartData from "@utils/getChartData";

interface ArtistProps {}

const Artist = ({}: ArtistProps) => {
  const [selected, setSelected] = useState<Song[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = (searchParams.get("tab") as ArtistAlbumsSortType) ?? "new";

  const controls = useAnimation();

  const [scroll, setScroll] = useState(0);
  const [animationing, setAnimationing] = useState(false);

  const [, setPlayingInfo] = usePlayingInfoState();

  useEffect(() => {
    if (searchParams.size === 0) {
      setSearchParams({ tab: "new" });
    }
  }, [searchParams, setSearchParams]);

  const location = useLocation();
  const artistId = useMemo(
    () => decodeURI(location.pathname.split("/")[2]),
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
    useVirtualizer(albums ?? [], {
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

  useEffect(() => {
    viewportRef.current?.scrollTo(0, 0);
  }, [tab, viewportRef]);

  useEffect(() => {
    if (animationing) return;

    setAnimationing(true);

    (async () => {
      if (scroll > 0) {
        await controls.start("round");
      } else {
        await controls.start("square");
      }

      setAnimationing(false);
    })();
  }, [animationing, controls, scroll]);

  const play = (songs: Song[]) => {
    setPlayingInfo({
      playlist: songs.map((song) => ({
        songId: song.songId,
        title: song.title,
        artist: song.artist,
        views: getChartData(song).views,
        start: song.start,
        end: song.end,
      })),
      history: [],
      current: 0,
    });
  };

  const playAllHandler = () => {
    play(albums);
  };

  const playShuffleHandler = () => {
    play(albums.sort(() => Math.random() - 0.5));
  };

  // TODO: 스켈레톤, 오류
  if (artistsIsLoading) return <div>로딩중...</div>;
  if (artistsError || albumsError || !artists || !artist)
    return <div>에러 발생!</div>;

  return (
    <PageLayout>
      <PageContainer>
        <ArtistInfo artist={artist} controls={controls} small={scroll > 0} />

        <TabBarWrapper>
          <TabBar>
            {artistDetailTabs.map((item, index) => (
              <Tab to={item.to} key={index}>
                {item.text}
              </Tab>
            ))}
          </TabBar>

          <ButtonLayout>
            <IconButton icon={PlayAllSVG} onClick={playAllHandler}>
              전체재생
            </IconButton>
            <IconButton icon={RandomSVG} onClick={playShuffleHandler}>
              랜덤재생
            </IconButton>
          </ButtonLayout>
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
          height={273}
          ref={viewportRef}
          totalSize={getTotalSize()}
          onScroll={throttle((e) => {
            const { scrollTop } = e.target as HTMLDivElement;
            setScroll(scrollTop);
          })}
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
  margin: 16px 20px 0 20px;

  display: flex;
`;

const ButtonLayout = styled.div`
  margin-left: auto;

  display: flex;
  align-items: center;
  gap: 4px;
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
