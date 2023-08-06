import instance from "@apis/axios";

const NOTICE_URL = "/notice";

export const fetchNotice = async () => {
  const { data } = await instance.get(`${NOTICE_URL}`);
  return data;
};

export const fetchAllNotice = async () => {
  const { data } = await instance.get(`${NOTICE_URL}/all`);
  return data;
};

export const fetchNoticeCategories = async () => {
  const { data } = await instance.post(`${NOTICE_URL}/categories`);
  return data;
};
