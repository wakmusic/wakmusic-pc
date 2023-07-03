import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "@components/header/Header";

import firebaseConfig from "@constants/firebaseConfig";

import Index from "@pages/index/Index";

import "@utils/loadIpcRenderer";

import "./index.css";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
