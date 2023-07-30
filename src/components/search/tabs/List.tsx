import styled from "styled-components/macro";

import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";

import PageItemContainer from "@layouts/PageItemContainer";

import { SongsSearchResponse } from "@templates/search.ts";

interface ListProps {
  tab: "song" | "artist" | "remix";
  res: SongsSearchResponse;
}

const List = ({ tab, res }: ListProps) => {
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

      <PageItemContainer height={181}>
        {res[tab].map((item, index) => (
          <SongItem
            key={index}
            song={item}
            features={[
              SongItemFeature.date,
              SongItemFeature.views,
              SongItemFeature.like,
            ]}
          />
        ))}
      </PageItemContainer>
    </Container>
  );
};

const Container = styled.div``;

export default List;
