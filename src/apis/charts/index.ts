import instance from "@apis/axios";

const CHARTS_URL = "/charts";

type chartsType = "monthly" | "weekly" | "daily" | "hourly" | "total";

export const fetchCharts = async (type: chartsType, limit = 10) => {
  const { data } = await instance.get(`${CHARTS_URL}`, {
    params: {
      type,
      limit,
    },
  });
  return data;
};

export const fetchChartsUpdate = async () => {
  const { data } = await instance.get(`${CHARTS_URL}/update`);
  return data;
};

export const fetchChartsUpdateTypes = async (chartType: chartsType) => {
  const { data } = await instance.get(`${CHARTS_URL}/update/${chartType}`);
  return data;
};
