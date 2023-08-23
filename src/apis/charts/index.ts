import instance from "@apis/axios";

import { ChartType, RawSong, Song } from "@templates/song";

import getChartData from "@utils/getChartData";

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

  const processedData: Song[] = [];

  data.forEach((item: RawSong) => {
    const chartData = getChartData(item);

    processedData.push({
      ...item,
      views: chartData.views,
      chart: {
        type: type,
        increase: chartData.increase,
        last: chartData.last,
      },
    });
  });

  return processedData;
};

export const fetchChartsUpdateTypes = async (
  chartType: ChartType
): Promise<string> => {
  const { data } = await instance.get(
    `${CHARTS_UPDATE_URL}/updated/${chartType}`
  );

  return data;
};
