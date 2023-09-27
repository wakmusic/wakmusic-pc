import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";

import { fetchCharts, fetchChartsUpdateTypes } from "@apis/charts";

import FunctionSection from "@components/globals/FunctionSection";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem from "@components/globals/SongItem";
import UpdatedText from "@components/globals/UpdatedText";
import MusicController from "@components/globals/musicControllers/MusicController";
import TabContent from "@components/globals/tab/TabContent";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";
import VirtualItem from "@layouts/VirtualItem";

import { chartTabs } from "@constants/tabs";
import { lastTextMap } from "@constants/textMap";

import { usePlaySongs } from "@hooks/player";
import { useScrollToTop } from "@hooks/scrollToTop";
import { useSelectSongs } from "@hooks/selectSongs";
import useVirtualizer from "@hooks/virtualizer";

import { ChartType } from "@templates/song";
import { SongItemFeature } from "@templates/songItem";

interface ChartProps {}

const Chart = ({}: ChartProps) => {
  const [searchParams] = useSearchParams();
  const tab = useMemo(
    () => (searchParams.get("type") ?? "hourly") as ChartType,
    [searchParams]
  );

  const playSongs = usePlaySongs();

  const {
    isFetching: chartsIsLoading,
    error: chartsError,
    data: charts,
  } = useQuery({
    queryKey: ["charts", tab],
    queryFn: async () => await fetchCharts(tab, 100),
  });

  const {
    isFetching: chartUpdatedIsLoading,
    error: chartUpdatedError,
    data: chartUpdated,
  } = useQuery({
    queryKey: ["chartUpdated", tab],
    queryFn: async () => await fetchChartsUpdateTypes(tab),
  });

  const { viewportRef, getTotalSize, virtualMap } = useVirtualizer(
    chartsIsLoading ? Array(100).fill(null) : charts ?? []
  );

  const { selected, setSelected, selectCallback, selectedIncludes } =
    useSelectSongs(charts ?? []);

  useScrollToTop(tab, viewportRef, setSelected);

  // TODO
  if (chartsError || chartUpdatedError) return <div>에러...</div>;

  return (
    <PageLayout>
      <PageContainer>
        <FunctionSection
          tabs={chartTabs}
          play={(shuffle) => {
            charts?.every((s) => s) && playSongs(charts, shuffle);
          }}
        />

        <TabContent>
          <UpdatedText
            updated={chartUpdated}
            marginTop={12}
            marginLeft={20}
            isLoading={chartUpdatedIsLoading}
          />

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
                  selected={selectedIncludes(item)}
                  features={[
                    tab !== "total" ? SongItemFeature.last : undefined,
                    SongItemFeature.date,
                    SongItemFeature.views,
                  ]}
                  onClick={selectCallback}
                  useIncrease={tab !== "total"}
                  isLoading={chartsIsLoading}
                />
              </VirtualItem>
            ))}
          </PageItemContainer>
        </TabContent>

        <MusicController
          songs={charts ?? []}
          selectedSongs={selected}
          setSelected={setSelected}
        />
      </PageContainer>
    </PageLayout>
  );
};

export default Chart;
