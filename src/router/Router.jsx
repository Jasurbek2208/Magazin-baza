import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

// Layouts
import PagesLayout from "../layout/PagesLayout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Kassa from "../pages/kassa/Kassa";
import AddAdmin from "../pages/rol/AddAdmin";
import SavdoForm from "../pages/marketingPage/SavdoForm";
import TaminotForm from "../pages/taminotPage/TaminotForm";
import TaminotPage from "../pages/taminotPage/TaminotPage";
import StoragePage from "../pages/storagePage/StoragePage";
import MarketingPage from "../pages/marketingPage/MarketingPage";

// Custom Hooks
import { getStoreHistory } from "../customHooks/useGetStoreHistory";
import { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Router() {
  let localNum = 0;
  const isAuth =
    useSelector((state) => state.isAuth) |
    JSON.parse(localStorage.getItem("ISAUTH"));

  // Admins's rol state
  const [userPosit, setUserPosit] = useState([""]);

  useEffect(() => {
    localNum += 1;
    localStorage.removeItem("storeHistory");
    localStorage.removeItem("oziqOvqatChiqim");
    localStorage.removeItem("korxonaUchunChiqim");
    if (localNum === 1) getStoreHistory();
    userPosition();
  }, []);

  //
  function userPosition() {
    onSnapshot(doc(db, "users", "hjJzOpbuR3XqjX817DGvJMG3Xr82"), (doc) => {
      doc?.data()?.admins.map((currUser) => {
        if (localStorage.getItem("TOKEN") === currUser.accessToken) {
          setUserPosit(currUser.rol);
        }
      });
    });
  }

  if (isAuth) {
    return (
      <Routes>
        <Route element={<PagesLayout />}>
          <Route path="home" element={<Home />} />

          {userPosit.includes("Ombor kuzatuvchisi") ||
          userPosit.includes("Boss") ||
          userPosit.includes("Bosh menejer") ? (
            <Route path="ombor" element={<StoragePage />} />
          ) : null}

          {userPosit.includes("Boss") ? (
            <Route path="admin-qo'shish" element={<AddAdmin />} />
          ) : null}

          {userPosit.includes("Mahsulot sotish bo'limi ma'suli") ||
          userPosit.includes("Boss") ||
          userPosit.includes("Bosh menejer") ? (
            <>
              <Route path="savdo" element={<MarketingPage />} />
              <Route path="mahsulot-sotish" element={<SavdoForm />} />
            </>
          ) : null}

          {userPosit.includes("Mahsulot sotib olish bo'limi ma'suli") ||
          userPosit.includes("Boss") ||
          userPosit.includes("Bosh menejer") ? (
            <>
              <Route path="savdo" element={<MarketingPage />} />
              <Route path="mahsulot-sotib-olish" element={<SavdoForm />} />
            </>
          ) : null}

          {userPosit.includes("Korxona ta'minoti bo'limi ma'suli") ||
          userPosit.includes("Boss") ||
          userPosit.includes("Bosh menejer") ? (
            <>
              <Route path="taminot" element={<TaminotPage />} />
              <Route path="korxona-uchun-taminot" element={<TaminotForm />} />
            </>
          ) : null}

          {userPosit.includes("Oziq-ovqat taminoti bo'limi ma'suli") ||
          userPosit.includes("Boss") ||
          userPosit.includes("Bosh menejer") ? (
            <>
              <Route path="taminot" element={<TaminotPage />} />
              <Route path="oziq-ovqat-uchun-chiqim" element={<TaminotForm />} />
            </>
          ) : null}

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
