import instance from "@apis/axios";

const QNA_URL = "/qna";

export const fetchAllQnA = async () => {
  const { data } = await instance.get(`${QNA_URL}`);
  return data;
};

export const fetchQnACategories = async () => {
  const { data } = await instance.get(`${QNA_URL}/categories`);
  return data;
};
