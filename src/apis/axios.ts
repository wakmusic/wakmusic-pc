import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

export default instance;
