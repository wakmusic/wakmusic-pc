import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import { ChartsType, fetchCharts, fetchChartsUpdateTypes } from "@apis/charts";

import FunctionSection from "@components/globals/FunctionSection";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";
import UpdatedText from "@components/globals/UpdatedText";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";
import VirtualItem from "@layouts/VirtualItem";

import { chartTabs } from "@constants/tabs";
import { lastTextMap } from "@constants/textMap";

import { usePlaySongs } from "@hooks/player";
import useVirtualizer from "@hooks/virtualizer";

import { Song } from "@templates/song";

interface ChartProps {}

const Chart = ({}: ChartProps) => {
  const [searchParams] = useSearchParams();
  const [selected, setSelected] = useState<Song[]>([]);
  const tab = useMemo(
    () => (searchParams.get("type") ?? "hourly") as ChartsType,
    [searchParams]
  );

  const playSongs = usePlaySongs();

  const {
    isLoading: chartsIsLoading,
    error: chartsError,
    data: charts,
  } = useQuery({
    queryKey: ["charts", tab],
    queryFn: async () => await fetchCharts(tab, 100),
  });

  const {
    isLoading: chartUpdatedIsLoading,
    error: chartUpdatedError,
    data: chartUpdated,
  } = useQuery({
    queryKey: ["chartUpdated", tab],
    queryFn: async () => await fetchChartsUpdateTypes(tab),
  });

  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(
    charts ?? []
  );

  useEffect(() => {
    setSelected([]);
    viewportRef.current?.scrollTo(0, 0);
  }, [tab, viewportRef]);

  // TODO
  if (chartsIsLoading || chartUpdatedIsLoading || !charts || !chartUpdated)
    return <div>로딩중...</div>;
  if (chartsError || chartUpdatedError) return <div>에러...</div>;

  return (
    <PageLayout>
      <PageContainer>
        <FunctionSection
          tabs={chartTabs}
          play={(shuffle) => {
            playSongs(charts, shuffle);
          }}
        />

        <UpdatedText updated={chartUpdated} marginTop={12} marginLeft={20} />

        <GuideBar
          lastText={tab !== "total" ? lastTextMap[tab] : undefined}
          features={[
            GuideBarFeature.rank,
            GuideBarFeature.info,
            tab !== "total" ? GuideBarFeature.last : undefined,
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
                  tab !== "total" ? SongItemFeature.last : undefined,
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
                useIncrease={tab !== "total"}
              />
            </VirtualItem>
          ))}
        </PageItemContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default Chart;
