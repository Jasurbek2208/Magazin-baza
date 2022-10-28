import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// Components
import Navbar from "../components/navbar/Navbar";
import Button from "../components/button/Button";

export default function PagesLayout() {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  return (
    <div style={{ padding: "100px 0px" }}>
      <Navbar />
      {location === "/home" ? null : (
        <Button
          content="&#8592; Back"
          className="zIdx"
          onClick={() => navigate(-1)}
        />
      )}
      <Outlet />
    </div>
  );
}
