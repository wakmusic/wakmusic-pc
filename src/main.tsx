import "overlayscrollbars/overlayscrollbars.css";
import { createRoot } from "react-dom/client";
import { QueryClient } from "react-query";

import "@utils/consoleApi";
import "@utils/youtube";

import { App } from "./App";
import "./index.css";

localStorage.removeItem("shortcut");

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000, // 1분
    },
  },
});

createRoot(document.getElementById("root") as HTMLElement).render(
  <App queryClient={queryClient} />
);
