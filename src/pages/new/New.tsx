import { useState } from "react";

import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";
import UpdatedText from "@components/globals/UpdatedText";
import FunctionSection from "@components/new/FunctionSection";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";
import VirtualItem from "@layouts/VirtualItem";

import { chartUpdated, hourlyChart } from "@constants/dummys";

import useVirtualizer from "@hooks/virtualizer";

import { Song } from "@templates/song";

interface NewProps {}

const New = ({}: NewProps) => {
  const [selected, setSelected] = useState<Song[]>([]);

  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(hourlyChart);

  return (
    <PageLayout>
      <PageContainer>
        <FunctionSection />
        <UpdatedText updated={chartUpdated} marginTop={12} marginLeft={20} />

        <GuideBar
          features={[
            GuideBarFeature.info,
            GuideBarFeature.last,
            GuideBarFeature.date,
            GuideBarFeature.views,
          ]}
        />

        <PageItemContainer
          height={209}
          ref={viewportRef}
          totalSize={getTotalSize()}
        >
          {virtualMap((virtualItem, item) => (
            <VirtualItem virtualItem={virtualItem} key={virtualItem.key}>
              <SongItem
                rank={virtualItem.index + 1}
                song={item}
                selected={selected.includes(item)}
                features={[
                  SongItemFeature.last,
                  SongItemFeature.date,
                  SongItemFeature.views,
                ]}
                onClick={(song) => {
                  if (selected.includes(song)) {
                    setSelected(selected.filter((item) => item !== song));
                  } else {
                    setSelected([...selected, song]);
                  }
                }}
              />
            </VirtualItem>
          ))}
        </PageItemContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default New;
