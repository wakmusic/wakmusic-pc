import instance from "@apis/axios";

import { AllFAQResponse, FAQCategoriesResponse } from "./dto";

const FAQ_BASE = "/faq";

export const fetchAllFAQ = async (): Promise<AllFAQResponse> => {
  const { data } = await instance.get(`${FAQ_BASE}`);
  return data;
};

export const fetchFAQCategories = async (): Promise<FAQCategoriesResponse> => {
  const { data } = await instance.get(`${FAQ_BASE}/categories`);
  return data;
};
