import React from "react";
import styled from "styled-components";

// Components
import BossCard from "../../components/bossCard/BossCard";

export default function CompanyPage() {
  return (
    <StyledCompanyPage>
      <div className="container">
        <BossCard
          title="Xaridor qo'shish"
          id="kompaniyaQo'shish"
          navLink="/kompaniya-qoshish"
        />
        <BossCard
          title="Xaridorlar ro'yxati"
          id="kompaniyalarRo'yxati"
          navLink="/kompaniyalar-royxati"
        />
      </div>
    </StyledCompanyPage>
  );
}

const StyledCompanyPage = styled.div`
  padding: 50px 0px 0px;

  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
