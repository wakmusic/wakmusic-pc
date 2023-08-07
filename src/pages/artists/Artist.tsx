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

import { artistDetailTabs } from "@constants/tabs";

import { Song, SongTotal } from "@templates/song";

interface ArtistProps {}

const Artist = ({}: ArtistProps) => {
  const [selected, setSelected] = useState<Song[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") as ArtistAlbumsSortType;

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
  } = useInfiniteQuery<SongTotal[]>({
    queryKey: ["artistsAlbums", tab, artistId],
    queryFn: async ({ pageParam = 0 }) => {
      if (!artistId || !tab) return [];

      return await fetchArtistAlbums(artistId, tab, pageParam);
    },
    getNextPageParam: (_, allPages) => {
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

        <PageItemContainer height={381}>
          {albums.map((item, index) => (
            <SongItem
              key={index}
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
          ))}
        </PageItemContainer>
      </PageContainer>
    </PageLayout>
  );
};

const TabBarWrapper = styled.div`
  margin: 16px 0 0 20px;
`;

export default Artist;
