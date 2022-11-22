import React from "react";
import { useState } from "react";
import styled from "styled-components";

// Components
import BossCard from "../../components/bossCard/BossCard";
import Button from "../../components/button/Button";
import Statistics from "../../components/statistics/Statistics";
import TaminotStatistics from "../../components/statistics/TaminotStatistics";

export default function Boss() {
  const [isStatics, setIsStatics] = useState("");

  return (
    <StyledBossPage>
      <div className="bossCard__wrapper">
        <BossCard
          navLink="/ombor"
          id="ombor"
          title="Ombor"
          img="fa-warehouse"
        />
        <BossCard
          navLink="/savdo"
          id="savdo"
          title="Savdo"
          img="fa-money-bill-trend-up"
        />
        <BossCard
          navLink="/taminot"
          id="taminot"
          title="Ta'minot"
          img="fa-truck-droplet"
        />
        <BossCard
          navLink="/kassa"
          id="kassa"
          title="Kassa"
          img="fa-sack-dollar"
        />
      </div>
      <div className="statistics-type__wrapper">
        <h1>Statistika</h1>
        <div className="statistics-types">
          <div className="btn-wrapper">
            <Button
              onClick={() => setIsStatics("storeHistory")}
              content="Savdo-sotiq"
              width="100%"
            />
          </div>
          <div className="btn-wrapper">
            <Button
              onClick={() => setIsStatics("oziqOvqatChiqim")}
              content="Oziq-ovqat uchun chiqimlar"
              width="100%"
            />
          </div>
          <div className="btn-wrapper">
            <Button
              onClick={() => setIsStatics("korxonaUchunChiqim")}
              content="Korxona ta'minoti uchun chiqimlar"
              width="100%"
            />
          </div>
        </div>
      </div>
      {isStatics ? (
        isStatics === "storeHistory" ? (
          <Statistics />
        ) : isStatics === "oziqOvqatChiqim" ? (
          <TaminotStatistics staticsType="oziqOvqatChiqim" />
        ) : (
          <TaminotStatistics staticsType="korxonaUchunChiqim" />
        )
      ) : null}
    </StyledBossPage>
  );
}

const StyledBossPage = styled.div`
  .bossCard__wrapper {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }

  .statistics-type__wrapper {
    padding: 24px 0px;

    h1 {
      margin-top: 32px;
      text-align: center;
      font-size: 32px;
      font-weight: 600;
      color: #005ed8;
    }

    .statistics-types {
      display: flex;
      justify-content: center;
      align-items: center;

      .btn-wrapper {
        width: 290px;
      }
    }
  }
`;
