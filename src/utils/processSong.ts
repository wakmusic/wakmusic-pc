import { ChartType, RawSong, Song } from "@templates/song";

import getChartData from "./getChartData";

export default (type: ChartType, song: RawSong): Song => {
  const chartData = getChartData(song);

  return {
    ...song,
    views: chartData.views,
    chart: {
      type: type,
      increase: chartData.increase,
      last: chartData.last,
    },
  };
};
