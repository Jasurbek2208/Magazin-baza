import React from "react";
import styled from "styled-components";

// Components
import BossCard from "../../components/bossCard/BossCard";
import Statistics from "../../components/statistics/Statistics";

export default function Boss() {
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

      <Statistics />
    </StyledBossPage>
  );
}

const StyledBossPage = styled.div`
  .bossCard__wrapper {
    display: flex;
    justify-content: center;
    /* flex-wrap: wrap; */
  }
`;
