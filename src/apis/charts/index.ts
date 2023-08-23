import instance from "@apis/axios";

import { ChartType, RawSong, Song } from "@templates/song";

import processSong from "@utils/processSong";

const CHARTS_UPDATE_URL = "/charts";

export const fetchCharts = async <T extends ChartType>(
  type: T,
  limit = 10
): Promise<Song[]> => {
  const { data } = await instance.get(`/v2/charts`, {
    params: {
      type,
      limit,
    },
  });

  return data.map((item: RawSong) => processSong(type, item));
};

export const fetchChartsUpdateTypes = async (
  chartType: ChartType
): Promise<string> => {
  const { data } = await instance.get(
    `${CHARTS_UPDATE_URL}/updated/${chartType}`
  );

  return data;
};
