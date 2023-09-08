import instance from "@apis/axios";

import { Notice } from "@templates/notice";

const NOTICE_BASE = "/notice";

export const fetchNotice = async (): Promise<Notice[]> => {
  const { data } = await instance.get(`${NOTICE_BASE}`);
  return data;
};

export const fetchAllNotice = async (): Promise<Notice[]> => {
  const { data } = await instance.get(`${NOTICE_BASE}/all`);
  return data;
};

export const fetchNoticeCategories = async (): Promise<string[]> => {
  const {
    data: { categories },
  } = await instance.get(`${NOTICE_BASE}/categories`);

  return categories;
};
