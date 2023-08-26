import instance from "@apis/axios";

import { AllFAQResponse, FAQCategoriesResponse } from "./dto";

const FAQ_URL = "/v2/faq";

export const fetchAllFAQ = async (): Promise<AllFAQResponse> => {
  const { data } = await instance.get(FAQ_URL);
  return data;
};

export const fetchFAQCategories = async (): Promise<FAQCategoriesResponse> => {
  const { data } = await instance.get(`${FAQ_URL}/categories`);
  return data;
};
