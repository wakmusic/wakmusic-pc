import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GNB from "@components/gnb/GNB";
import Header from "@components/header/Header";

import firebaseConfig from "@constants/firebaseConfig";

import Index from "@pages/index/Index";
import Playground from "@pages/playground/Playground";

import "@utils/loadIpcRenderer";

import "./index.css";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <GNB />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/playground" element={<Playground />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
