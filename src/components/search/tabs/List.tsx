import styled from "styled-components/macro";

import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";

import PageItemContainer from "@layouts/PageItemContainer";
import VirtualItem from "@layouts/VirtualItem";

import useVirtualizer from "@hooks/virtualizer";

import { SongsSearchResponse } from "@templates/search.ts";

interface ListProps {
  tab: "song" | "artist" | "remix";
  res: SongsSearchResponse;
}

const List = ({ tab, res }: ListProps) => {
  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(res[tab]);

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
        {virtualMap((virtualItem, item) => (
          <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
            <SongItem
              song={item}
              features={[
                SongItemFeature.date,
                SongItemFeature.views,
                SongItemFeature.like,
              ]}
            />
          </VirtualItem>
        ))}
      </PageItemContainer>
    </Container>
  );
};

const Container = styled.div`
  margin-left: -20px;
`;

export default List;
