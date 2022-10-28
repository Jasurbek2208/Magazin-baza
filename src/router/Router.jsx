import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

// Layouts
import PagesLayout from "../layout/PagesLayout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Kassa from "../pages/kassa/Kassa";
import StoragePage from "../pages/storagePage/StoragePage";
import SavdoForm from "../pages/marketingPage/SavdoForm";
import MarketingPage from "../pages/marketingPage/MarketingPage";

// Custom Hooks
import { getStoreHistory } from "../customHooks/useGetStoreHistory";

export default function Router() {
  let localNum = 0;
  const isAuth =
    useSelector((state) => state.isAuth) |
    JSON.parse(localStorage.getItem("ISAUTH"));

  useEffect(() => {
    localNum += 1;
    localStorage.removeItem("storeHistory");
    if (localNum === 1) getStoreHistory();
  }, []);

  if (isAuth) {
    return (
      <Routes>
        <Route element={<PagesLayout />}>
          <Route path="home" element={<Home />} />
          <Route path="ombor" element={<StoragePage />} />
          <Route path="savdo" element={<MarketingPage />} />
          <Route path="savdoForm" element={<SavdoForm />} />
          <Route path="kassa" element={<Kassa />} />
          <Route path="*" element={<Navigate to="home" />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Navigate to="login" />} />
      </Routes>
    );
  }
}
