import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { styled } from "styled-components/macro";

import {
  editOrderOfPlaylist,
  editPlaylistName,
  fetchRecommendedPlaylist,
  fetchRecommendedPlaylistDetail,
  removeSongsFromPlaylist,
} from "@apis/playlist";
import { fetchPlaylists } from "@apis/user";

import CustomSongs from "@components/globals/CustomSongs";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import MusicController from "@components/globals/musicControllers/MusicController";
import Header from "@components/playlist/Header";

import colors from "@constants/colors";

import { useCreateListModal } from "@hooks/createListModal";
import { usePrevious } from "@hooks/previous";
import { useSelectSongs } from "@hooks/selectSongs";

import { BasePlaylist } from "@templates/playlist";
import { Song } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

import { isUndefined } from "@utils/isTypes";
import { isSameArray } from "@utils/utils";

interface PlaylistProps {}

const Playlist = ({}: PlaylistProps) => {
  const openEditPlaylistNameModal = useCreateListModal();

  const { data: playlists, refetch } = useQuery({
    queryKey: "playlists",
    queryFn: fetchPlaylists,
  });

  const { data: recommendLists } = useQuery({
    queryKey: "recommendLists",
    queryFn: fetchRecommendedPlaylist,
    staleTime: Infinity,
  });

  const [isEditmode, setEditmode] = useState(false);
  const [hideContoller, setHideContoller] = useState(false);
  const location = useLocation();
  const playlistId = useMemo(
    () => location.pathname.split("/")[2],
    [location.pathname]
  );

  const recommendKey: string | undefined = useMemo(
    () => recommendLists?.find((item) => item.key === playlistId)?.key,
    [recommendLists, playlistId]
  );

  const { data: recommendList } = useQuery({
    queryKey: ["recommendList", recommendKey],
    queryFn: async () => {
      if (!recommendKey) return null;

      return await fetchRecommendedPlaylistDetail(recommendKey);
    },
    staleTime: 24 * 60 * 60 * 1000,
  });

  const playlist: BasePlaylist | undefined = useMemo(() => {
    if (recommendList) return recommendList;
    return (playlists ?? []).find((item) => item.key === playlistId);
  }, [playlistId, playlists, recommendList]);

  const {
    selected,
    setSelected,
    selectCallback,
    selectManyCallback,
    selectedIncludes,
  } = useSelectSongs(isUndefined(playlist) ? [] : playlist.songs);

  const prevPlaylist = usePrevious(playlist);
  const [changePlaylist, setChangePlaylist] = useState<Song[]>([]);

  useEffect(() => {
    if (
      !playlist ||
      isEditmode ||
      changePlaylist.length === 0 ||
      !isSameArray(prevPlaylist?.songs ?? [], playlist?.songs ?? []) ||
      isSameArray(playlist?.songs ?? [], changePlaylist)
    ) {
      return;
    }

    (async () => {
      const success = await editOrderOfPlaylist(
        playlist.key,
        changePlaylist.map((song) => song.songId)
      );

      if (success) {
        refetch();
      }
    })();
  }, [changePlaylist, isEditmode, playlist, prevPlaylist?.songs, refetch]);

  const editPlaylistNameHandler = async () => {
    const name = await openEditPlaylistNameModal(playlist?.title);

    if (!name) return;

    const success = await editPlaylistName(playlist?.key ?? "", name);

    if (success) {
      refetch();
    }
  };

  const dispatchSongs = async (songs: Song[]) => {
    if (!playlist) return;

    const removedSongs = playlist.songs.filter(
      (plSong) => !songs.find((song) => song.songId === plSong.songId)
    );

    if (removedSongs.length > 0) {
      const success = await removeSongsFromPlaylist(
        playlist.key,
        removedSongs.map((song) => song.songId)
      );

      if (success) {
        refetch();
      }
    }

    setChangePlaylist(songs);
  };

  return (
    <Container>
      <Header
        recommendList={recommendList}
        playlist={playlist}
        isEditmode={isEditmode}
        editPlaylistNameHandler={editPlaylistNameHandler}
        setEditmode={setEditmode}
      />

      <GuideBar
        features={[
          GuideBarFeature.info,
          GuideBarFeature.date,
          GuideBarFeature.views,
          GuideBarFeature.like,
        ]}
        editMode={isEditmode}
      />

      <CustomSongs
        height={281}
        editMode={isEditmode}
        onEdit={dispatchSongs}
        onSongClick={selectCallback}
        selectedIncludes={selectedIncludes}
        setSelected={setSelected}
        hideController={setHideContoller}
        songFeatures={[
          SongItemFeature.date,
          SongItemFeature.views,
          SongItemFeature.like,
        ]}
      >
        {playlist?.songs ?? []}
      </CustomSongs>

      <MusicController
        displayDefault={false}
        hide={hideContoller}
        songs={playlist?.songs ?? []}
        selectedSongs={selected}
        dispatchSelectedSongs={selectManyCallback}
        onDelete={isEditmode ? dispatchSongs : undefined}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 754px;
  height: calc(100vh - 78px);

  margin: auto;
  margin-top: 20px;

  padding-top: 20px;

  border: 1px solid ${colors.blueGray25};
  border-radius: 16px;

  background-color: ${colors.white}66;
  backdrop-filter: blur(62.5px);

  overflow-y: hidden;
`;

export default Playlist;
