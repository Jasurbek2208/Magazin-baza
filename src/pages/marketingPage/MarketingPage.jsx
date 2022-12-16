import React, { useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { TabTitle } from "../../utils/Utils";
import styled from "styled-components";

// Components
import BossCard from "../../components/bossCard/BossCard";
import { db } from "../../firebase";

export default function MarketingPage() {
  TabTitle("Savdo-Sotiq | Magazin Baza");

  // Admins's rol state
  const [userPosit, setUserPosit] = useState([""]);
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
  userPosition();

  return (
    <StyledMarketing>
      <div className="container">
        {userPosit.includes("Oziq-ovqat taminoti bo'limi ma'suli") ||
        userPosit.includes("Mahsulot sotish bo'limi ma'suli") ||
        userPosit.includes("Boss") ||
        userPosit.includes("Bosh menejer") ? (
          <BossCard
            title="Mahsulot sotish"
            id="sotish"
            navLink="/mahsulot-sotish"
          />
        ) : null}

        {userPosit.includes("Oziq-ovqat taminoti bo'limi ma'suli") ||
        userPosit.includes("Mahsulot sotib olish bo'limi ma'suli") ||
        userPosit.includes("Boss") ||
        userPosit.includes("Bosh menejer") ? (
          <BossCard
            title="Mahsulot sotib olish"
            id="sotibOlish"
            navLink="/mahsulot-sotib-olish"
          />
        ) : null}
      </div>
    </StyledMarketing>
  );
}

const StyledMarketing = styled.div`
  padding: 50px 0px 0px;

  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
