import styled from "styled-components";

export const StyledStatistics = styled.main`
&.statistcs__wrapper {
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

        .img {
          width: 200px;
          height: 130px;
          border: 1px solid #1e90ff;
        }
      }
    }
  }

  .image-full-size {
    position: fixed;
    top: 0px;
    left: 0px;
    display: grid;
    place-items: center;
    width: 100vw;
    height: 100vh;
    z-index: 100;
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);

    .full-img-navbar {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      padding: 30px 10%;
      background-color: #3b3b3b19;

      ul {
        margin: 0px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 30px;
        
        li {
          .icon {
            cursor: pointer;
            font-size: 24px;
            color: #004386;
          }
        }
      }
    }

    .img-full {
      position: absolute;
      width: 600px;
      transition: 300ms;

      &.zoomX {
        width: 150%;
        cursor: grab;
      }
      
      &.zoomX2 {
        width: 300%;
        cursor: grab;
      }
    }
  }

  @media (max-width: 700px) {  
    .image-full-size {
      .img-full {
        width: 90%;
      }
    } 
  }
}
`;