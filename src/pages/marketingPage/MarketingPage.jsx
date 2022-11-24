import React from "react";
import styled from "styled-components";

// Components
import BossCard from "../../components/bossCard/BossCard";

export default function MarketingPage() {
  return (
    <StyledMarketing>
      <div className="container">
        <BossCard title="Mahsulot sotish" id="sotish" navLink="/mahsulot-sotish" />
        <BossCard
          title="Mahsulot sotib olish"
          id="sotibOlish"
          navLink="/mahsulot-sotib-olish"
        />
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
