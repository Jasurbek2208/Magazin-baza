import React, { useState } from "react";
import styled from "styled-components";

// Components
import Button from "../../components/button/Button";
import Statistics from "../../components/statistics/Statistics";
import TaminotStatistics from "../../components/statistics/TaminotStatistics";

export default function Kassa() {
  const [isStatics, setIsStatics] = useState("");

  const staticsArr = [
    {
      history: "storeHistory",
      content: "Savdo-sotiq",
      isActive: false,
    },
    {
      history: "oziqOvqatChiqim",
      content: "Oziq-ovqat uchun chiqimlar",
      isActive: false,
    },
    {
      history: "korxonaUchunChiqim",
      content: "Korxona ta'minoti uchun chiqimlar",
      isActive: false,
    },
  ];

  return (
    <StyledKassa>
      <div className="statistics-type__wrapper">
        <h1>Harajatlar tarixi</h1>
        <div className="statistics-types">
          {staticsArr.map((currStatics) => (
            <div key={currStatics.history} className="btn-wrapper">
              <Button
                onClick={() => {
                  setIsStatics(currStatics.history);
                }}
                content={currStatics.content}
                width="100%"
                statistics
                isActive={isStatics === currStatics.history ? true : false}
              />
            </div>
          ))}
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
    </StyledKassa>
  );
}

const StyledKassa = styled.div`
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
      flex-wrap: wrap;

      .btn-wrapper {
        width: 290px;
      }
    }
  }
`;
