import axios, { AxiosError } from "axios";

export const instance = axios.create({
  baseURL: "https://dev.wakmusic.xyz/api",
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
