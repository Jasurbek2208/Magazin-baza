import React from "react";
import styled from "styled-components";

// Components
import BossCard from "../../components/bossCard/BossCard";

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

      <main className="statistcs__wrapper">
        {JSON.parse(localStorage.getItem("storeHistory"))?.map((i, idx) => (
          <div key={i.mahsulotNomi + idx} className="action__wrapper">
            <div className="top">
              <p>{i.qachonSotildi}</p>
              <p>{i.kimTomonidan}</p>
            </div>
            <div className="body">
              <div className="left">
                <h3 className="title">{i.mahsulotNomi.toUpperCase() + " "}</h3>
                <h4 className={i.qanchaSotildi ? "sotildi" : ""}>
                  {i.qanchaSotildi + " "}
                  <span>ta</span>
                </h4>
                <div className="current-cash">
                  <p>
                    Narxi: <span>{" " + i.narxi}</span>
                  </p>
                  <p>
                    Jami narxi:
                    <span>
                      {" " +
                        Number(i.narxi) *
                          (i.qanchaSotildi
                            ? Number(i.qanchaSotildi)
                            : i.qanchaSotibOlindi)}
                    </span>
                  </p>
                </div>
              </div>
              <div className="right">
                <h4 className={i.qanchaSotildi ? "sotildi" : ""}>
                  {i.qanchaSotildi ? "Sotildi" : "Sotib olindi"}
                </h4>
                <i
                  className={
                    "icon icon-arrow-up-down" + (!i.qanchaSotildi ? " red" : "")
                  }
                ></i>
              </div>
            </div>
          </div>
        ))}
      </main>
    </StyledBossPage>
  );
}

const StyledBossPage = styled.div`
  .bossCard__wrapper {
    display: flex;
    justify-content: center;
    /* flex-wrap: wrap; */
  }

  .statistcs__wrapper {
    margin-top: 80px;

    .action__wrapper {
      padding: 14px 10px;
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

      .top {
        display: flex;
        align-items: center;
        gap: 20px;
        margin-bottom: 10px;

        p {
          font-size: 13px;
          color: #004386;
        }
      }

      .body {
        padding: 8px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
        flex-wrap: wrap;

        .left,
        .right {
          display: flex;
          align-items: center;
          gap: 20px;
          flex-wrap: wrap;

          h3.title {
            color: #1e90ff;
          }

          h4 {
            color: red;

            &.sotildi {
              color: green;
            }

            span {
              color: #303030;
            }
          }

          .current-cash {
            padding-left: 30px;
            display: flex;
            flex-direction: column;
            row-gap: 10px;

            p {
              color: #303030;

              span {
                font-weight: 600;
              }
            }
          }

          .icon-arrow-up-down {
            background-color: green;

            &.red {
              background-color: red;
            }
          }
        }
      }
    }
  }
`;
