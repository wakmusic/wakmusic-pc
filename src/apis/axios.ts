import axios, { AxiosError } from "axios";

export const validateStatus = { validateStatus: () => true };

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Credentials": "*",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
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
