import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FunctionSection from "@components/chart/FunctionSection";
import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";
import UpdatedText from "@components/globals/UpdatedText";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";

import { chartUpdated, hourlyChart } from "@constants/dummys";

import { Song } from "@templates/song";

interface ChartProps {}

const Chart = ({}: ChartProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<Song[]>([]);

  useEffect(() => {
    // /chart로 접속하면 ?type=hourly로 이동
    if (searchParams.size === 0) {
      setSearchParams({ type: "hourly" });
    }
  }, [searchParams, setSearchParams]);

  return (
    <PageLayout>
      <PageContainer>
        <FunctionSection />
        <UpdatedText updated={chartUpdated} marginTop={12} marginLeft={20} />

        <GuideBar
          features={[
            GuideBarFeature.rank,
            GuideBarFeature.info,
            GuideBarFeature.last,
            GuideBarFeature.date,
            GuideBarFeature.views,
          ]}
        />

        <PageItemContainer height={209}>
          {hourlyChart.map((item, index) => (
            <SongItem
              key={index}
              rank={index + 1}
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
          ))}
        </PageItemContainer>
      </PageContainer>
    </PageLayout>
  );
};

export default Chart;
