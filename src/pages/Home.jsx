import React from "react";
import { TabTitle } from "../utils/Utils";

// Components
import Boss from "./boss/Boss";

export default function Home() {
  TabTitle("Magazin Baza");

  return (
    <div className="container">
      <Boss />
    </div>
  );
}
