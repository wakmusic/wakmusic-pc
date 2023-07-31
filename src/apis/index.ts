import axios, { AxiosError } from "axios";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

instance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<AxiosError>) => {
    if (axios.isAxiosError(error) && error.response) {
      /* empty */
    }
  }
);
