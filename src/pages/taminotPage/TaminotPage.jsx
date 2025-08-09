import { useState } from "react";
import { TabTitle } from "utils";
import styled from "styled-components";
import { doc, onSnapshot } from "firebase/firestore";

// Components
import BossCard from "../../components/bossCard/BossCard";
import { db } from "../../firebase";

export default function TaminotPage() {
  TabTitle("Ta'minot | Magazin Baza");

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
    <StyledTaminotPage>
      <div className="container">
        {userPosit.includes("Korxona ta'minoti bo'limi ma'suli") ||
        userPosit.includes("Boss") ||
        userPosit.includes("Bosh menejer") ? (
          <BossCard
            title="Korxona uchun ta'minot"
            id="korxonaUchunTaminot"
            navLink="/korxona-uchun-taminot"
          />
        ) : null}

        {userPosit.includes("Oziq-ovqat taminoti bo'limi ma'suli") ||
        userPosit.includes("Boss") ||
        userPosit.includes("Bosh menejer") ? (
          <BossCard
            title="Oziq-ovqat uchun chiqim"
            id="oziqOvqatUchunChiqim"
            navLink="/oziq-ovqat-uchun-chiqim"
          />
        ) : null}
      </div>
    </StyledTaminotPage>
  );
}

const StyledTaminotPage = styled.div`
  padding: 50px 0px 0px;

  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
