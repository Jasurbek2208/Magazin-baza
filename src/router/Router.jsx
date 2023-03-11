import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Layouts
import PagesLayout from "../layout/PagesLayout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Kassa from "../pages/kassa/Kassa";
import AddAdmin from "../pages/admins/AddAdmin";
import AdminsPage from "../pages/admins/AdminPage";
import AdminsList from "../pages/admins/AdminsList";
import AddCompany from "../pages/companyPage/AddCompany";
import SavdoForm from "../pages/marketingPage/SavdoForm";
import CompanyPage from "../pages/companyPage/CompanyPage";
import TaminotForm from "../pages/taminotPage/TaminotForm";
import TaminotPage from "../pages/taminotPage/TaminotPage";
import StoragePage from "../pages/storagePage/StoragePage";
import CompaniesList from "../pages/companyPage/CompaniesList";
import MarketingPage from "../pages/marketingPage/MarketingPage";
import AddProductList from "../pages/marketingPage/AddProductList";

// Custom Hooks
import { getStoreHistory } from "../customHooks/useGetStoreHistory";

// Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function Router() {
  const location = useLocation().pathname;

  let localNum = 0;
  const isAuth =
    useSelector((state) => state.isAuth) |
    JSON.parse(localStorage.getItem("ISAUTH"));

  // Admins's rol state
  const [userPosit, setUserPosit] = useState([""]);
  const [currentuser, setCurrentUser] = useState(null);
  const [admins, setAdmins] = useState(null);

  useEffect(() => {
    if (location !== "/home") {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    if (isAuth) {
      localNum += 1;
      localStorage.removeItem("storeHistory");
      localStorage.removeItem("oziqOvqatChiqim");
      localStorage.removeItem("korxonaUchunChiqim");
      if (localNum === 1) getStoreHistory();
      userPosition();
    }
  }, [isAuth]);

  //
  function userPosition() {
    onSnapshot(doc(db, "users", "hjJzOpbuR3XqjX817DGvJMG3Xr82"), (doc) => {
      setAdmins(doc?.data()?.admins);
      doc?.data()?.admins.map((currUser) => {
        if (localStorage.getItem("TOKEN") === currUser.accessToken) {
          setCurrentUser(currUser);
          setUserPosit(currUser.rol);
          localStorage.setItem(
            "lastRol",
            currUser.firstName + " " + currUser.lastName
          );
        }
      });
    });
  }

  if (isAuth) {
    return (
      <Routes>
        <Route element={<PagesLayout currentuser={currentuser} admins={admins} />}>
          <Route path="home" element={<Home />} />

          {userPosit.includes("Ombor kuzatuvchisi") ? (
            <Route path="ombor" element={<StoragePage />} />
          ) : null}

          {userPosit.includes("Mahsulot sotish bo'limi ma'suli") ? (
            <>
              <Route path="savdo" element={<MarketingPage />} />
              <Route path="mahsulot-sotish" element={<SavdoForm />} />
            </>
          ) : null}

          {userPosit.includes("Mahsulot sotib olish bo'limi ma'suli") ? (
            <>
              <Route path="savdo" element={<MarketingPage />} />
              <Route path="mahsulot-sotib-olish" element={<SavdoForm />} />
            </>
          ) : null}

          {userPosit.includes("Korxona ta'minoti bo'limi ma'suli") ? (
            <>
              <Route path="taminot" element={<TaminotPage />} />
              <Route path="korxona-uchun-taminot" element={<TaminotForm />} />
            </>
          ) : null}

          {userPosit.includes("Oziq-ovqat taminoti bo'limi ma'suli") ? (
            <>
              <Route path="taminot" element={<TaminotPage />} />
              <Route path="oziq-ovqat-uchun-chiqim" element={<TaminotForm />} />

              <Route path="company-page" element={<CompanyPage />} />
              <Route path="kompaniya-qoshish" element={<AddCompany />} />
              <Route path="kompaniyalar-royxati" element={<CompaniesList />} />
            </>
          ) : null}

          {userPosit.includes("Boss") || userPosit.includes("Bosh menejer") ? (
            <>
              <Route path="ombor" element={<StoragePage />} />

              <Route path="savdo" element={<MarketingPage />} />
              <Route path="mahsulot-sotish" element={<SavdoForm />} />
              <Route path="mahsulot-sotib-olish" element={<SavdoForm />} />
              <Route
                path="mahsulot-omborga-qoshish"
                element={<AddProductList />}
              />

              <Route path="taminot" element={<TaminotPage />} />
              <Route path="korxona-uchun-taminot" element={<TaminotForm />} />
              <Route path="oziq-ovqat-uchun-chiqim" element={<TaminotForm />} />

              <Route path="company-page" element={<CompanyPage />} />
              <Route path="kompaniya-qoshish" element={<AddCompany />} />
              <Route path="kompaniyalar-royxati" element={<CompaniesList />} />

              <Route path="admins-page" element={<AdminsPage />} />
              <Route path="admin-qo'shish" element={<AddAdmin />} />
              <Route path="adminlar-royxati" element={<AdminsList />} />
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
