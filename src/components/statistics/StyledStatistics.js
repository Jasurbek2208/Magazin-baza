import styled from "styled-components";

export const StyledStatistics = styled.main`
&.statistcs__wrapper {
  margin-top: 80px;

  .action__wrapper {
    padding: 14px 10px;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;

    &.openImg {
      display: none;
    }

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

  
  /* Image full size container */
.image-full-size {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
}

/* Full image navbar */
.full-img-navbar {
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 20px;
}

/* Full image navbar icons */
.full-img-navbar ul {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
}

.full-img-navbar li {
  margin: 0 10px;
}

.full-img-navbar i {
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}

/* Image wrapper */
.img__wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - 50px);
  padding: 20px;
}

/* Image full size */
.img-full {
  max-width: 100%;
  max-height: 100%;
  cursor: zoom-in;
  transition: transform 0.3s ease-in-out;
}

/* Zoom in image */
.zoomX {
  transform: scale(1.5);
}

/* Double zoom in image */
.zoomX2 {
  cursor: zoom-out;
  transform: scale(2);
}

/* Show or hide image full size */
.ON {
  opacity: 1;
}

.OFF {
  opacity: 0;
  pointer-events: none;
}


  @media (max-width: 600px) {  
    .image-full-size {
      .img__wrapper {
        .img-full {
          width: 100%;
          
          &.zoomX {
            width: 200%;
          }
          
          &.zoomX2 {
            width: 320%;
            cursor: zoom-out;
          }
        }
      }
    } 
  }
}
`;