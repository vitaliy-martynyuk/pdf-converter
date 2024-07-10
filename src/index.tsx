import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { APP_PATHS } from "./consts";

import "./index.css";

const HomePage = React.lazy(async () => import("./pages/homePage"));

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Routes>
      <Route path={APP_PATHS.HOME_PAGE} element={<HomePage />} />
      <Route path="*" element={<Navigate to={APP_PATHS.HOME_PAGE} />} />
    </Routes>
  </BrowserRouter>
);
