import { useState } from "react";

import GuideBar, { GuideBarFeature } from "@components/globals/GuideBar";
import SongItem, { SongItemFeature } from "@components/globals/SongItem";
import UpdatedText from "@components/globals/UpdatedText";
import FunctionSection from "@components/new/FunctionSection";

import PageContainer from "@layouts/PageContainer";
import PageItemContainer from "@layouts/PageItemContainer";
import PageLayout from "@layouts/PageLayout";

import { chartUpdated, hourlyChart } from "@constants/dummys";

import { Song } from "@templates/song";

interface NewProps {}

const New = ({}: NewProps) => {
  const [selected, setSelected] = useState<Song[]>([]);

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

        <PageItemContainer height={225}>
          {hourlyChart.map((item, index) => (
            <SongItem
              key={index}
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

export default New;
