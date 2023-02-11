import React, { useState } from "react";
import styled from "styled-components";

// Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

// Components
import BossCard from "../../components/bossCard/BossCard";
import Loading from "../../components/loading/Loading";

export default function Boss() {
  // Admins's rol state
  const [userPosit, setUserPosit] = useState([""]);

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
    <StyledBossPage>
      {userPosit[0] === "" ? (
        <div className="loading__wrapper">
          <Loading />
        </div>
      ) : (
        <div className="bossCard__wrapper">
          {userPosit.includes("Ombor kuzatuvchisi") ||
          userPosit.includes("Boss") ||
          userPosit.includes("Bosh menejer") ? (
            <BossCard
              navLink="/ombor"
              id="ombor"
              title="Ombor"
              img="fa-warehouse"
            />
          ) : null}

          {userPosit.includes("Mahsulot sotib olish bo'limi ma'suli") ||
          userPosit.includes("Mahsulot sotish bo'limi ma'suli") ||
          userPosit.includes("Boss") ||
          userPosit.includes("Bosh menejer") ? (
            <BossCard
              navLink="/savdo"
              id="savdo"
              title="Savdo"
              img="fa-money-bill-trend-up"
            />
          ) : null}

          {userPosit.includes("Oziq-ovqat taminoti bo'limi ma'suli") ||
          userPosit.includes("Korxona ta'minoti bo'limi ma'suli") ||
          userPosit.includes("Boss") ||
          userPosit.includes("Bosh menejer") ? (
            <BossCard
              navLink="/taminot"
              id="taminot"
              title="Ta'minot"
              img="fa-truck-droplet"
            />
          ) : null}

          {userPosit.includes("Boss") ? (
            <>
              <BossCard
                navLink="/company-page"
                id="kompaniya"
                title="Xaridorlar"
                img="fa-tower"
              />
              <BossCard
                navLink="/admin-qo'shish"
                id="kassa"
                title="Admin qo'shish"
                img="fa-user"
              />
            </>
          ) : null}

          <BossCard
            navLink="/kassa"
            id="kassa"
            title="Kassa"
            img="fa-sack-dollar"
          />
        </div>
      )}
    </StyledBossPage>
  );
}

const StyledBossPage = styled.div`
  .loading__wrapper {
    width: 100%;
    height: calc(100vh - 200px);
    display: grid;
    place-items: center;
  }

  .bossCard__wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
