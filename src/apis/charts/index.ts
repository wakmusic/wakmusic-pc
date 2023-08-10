import instance from "@apis/axios";

import {
  SongDaily,
  SongHourly,
  SongMonthly,
  SongTotal,
  SongWeekly,
} from "@templates/song";

const CHARTS_UPDATE_URL = "/charts";

export type ChartsType = "monthly" | "weekly" | "daily" | "hourly" | "total";

export type SongByChartsType<T extends ChartsType> = T extends "monthly"
  ? SongMonthly
  : T extends "weekly"
  ? SongWeekly
  : T extends "daily"
  ? SongDaily
  : T extends "hourly"
  ? SongHourly
  : T extends "total"
  ? SongTotal
  : never;

export const fetchCharts = async <T extends ChartsType>(
  type: T,
  limit = 10
): Promise<SongByChartsType<T>[]> => {
  const { data } = await instance.get(`/v2/charts`, {
    params: {
      type,
      limit,
    },
  });

  return data;
};

export const fetchChartsUpdateTypes = async (
  chartType: ChartsType
): Promise<string> => {
  const { data } = await instance.get(
    `${CHARTS_UPDATE_URL}/updated/${chartType}`
  );

  return data;
};
