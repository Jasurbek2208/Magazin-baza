import React from "react";
import styled from "styled-components";

// Components
import BossCard from "../../components/bossCard/BossCard";

export default function MarketingPage() {
  return (
    <StyledMarketing>
      <div className="container">
        <BossCard title="Mahsulot sotish" id="marketing" navLink="/savdoForm" />
      </div>
    </StyledMarketing>
  );
}

const StyledMarketing = styled.div`
  padding: 50px 0px 0px;
`;
