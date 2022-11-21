import React from "react";
import styled from "styled-components";

// Components
import BossCard from "../../components/bossCard/BossCard";

export default function TaminotPage() {
  return (
    <StyledTaminotPage>
      <div className="container">
        <BossCard
          title="Korxona uchun ta'minot"
          id="korxonaUchunTaminot"
          navLink="/korxona-uchun-taminot"
        />
        <BossCard
          title="Oziq-ovqat uchun chiqim"
          id="oziqOvqatUchunChiqim"
          navLink="/oziq-ovqat-uchun-chiqim"
        />
      </div>
    </StyledTaminotPage>
  );
}

const StyledTaminotPage = styled.div`
  padding: 50px 0px 0px;

  .container {
    display: flex;
    flex-wrap: wrap;
  }
`;
