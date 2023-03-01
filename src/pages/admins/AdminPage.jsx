import React from "react";
import { TabTitle } from "../../utils/Utils";
import styled from "styled-components";

// Components
import BossCard from "../../components/bossCard/BossCard";

export default function AdminsPage() {
  TabTitle("Adminlar | Magazin Baza");

  return (
    <StyledAdminsPage>
      <div className="container">
        <BossCard
          navLink="/admin-qo'shish"
          id="admin"
          title="Admin qo'shish"
          img="fa-user"
        />
        <BossCard
          title="Adminlar ro'yxati"
          id="adminlarRo'yxati"
          navLink="/adminlar-royxati"
        />
      </div>
    </StyledAdminsPage>
  );
}

const StyledAdminsPage = styled.div`
  padding: 50px 0px 0px;

  .container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;
