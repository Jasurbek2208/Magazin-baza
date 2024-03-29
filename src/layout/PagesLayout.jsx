import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

// Components
import Navbar from "../components/navbar/Navbar";
import Button from "../components/button/Button";

export default function PagesLayout({ currentuser, admins }) {
  const navigate = useNavigate();
  const location = useLocation().pathname;

  // 
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div style={{ padding: "100px 0px 50px", maxHeight: isProfileOpen ? "100vh" : "100%", overflowY: isProfileOpen ? "hidden" : "auto" }}>

      <Navbar currentuser={currentuser} admins={admins} isProfileOpen={isProfileOpen} setIsProfileOpen={setIsProfileOpen} />

      {location === "/home" ? null : (

        <Button
          content="&#8592; Orqaga"
          className="zIdx"
          onClick={() => navigate(-1)}
        />

      )}

      <Outlet />

    </div>
  );
}
