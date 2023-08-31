import instance from "@apis/axios";

import { Notice } from "@templates/notice";

const NOTICE_URL = "/v2/notice";

export const fetchNotice = async (): Promise<Notice[]> => {
  const { data } = await instance.get(`${NOTICE_URL}`);
  return data;
};

export const fetchAllNotice = async (): Promise<Notice[]> => {
  const { data } = await instance.get(`${NOTICE_URL}/all`);
  return data;
};

export const fetchNoticeCategories = async (): Promise<string[]> => {
  const {
    data: { categories },
  } = await instance.get(`${NOTICE_URL}/categories`);

  return categories;
};
