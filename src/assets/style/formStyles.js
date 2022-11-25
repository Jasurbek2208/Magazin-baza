import styled from "styled-components";

export const StyledSavdoForm = styled.div`
padding: 10px 0px 0px;
margin: 0 auto;

.container {
  padding: 10px 16px;

  h1 {
    margin-bottom: 30px;
    text-align: center;
  }

  .form__wrapper {
    margin: 0 auto;
    max-width: 700px;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
    gap: 46px;
    row-gap: 43px;
    flex-wrap: wrap;

    .input__wrapper {
      position: relative;
      width: 100%;
      max-width: 320px;
      min-width: 260px;

      .currProduct {
        position: absolute;
        width: max-content;
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
          rgba(0, 0, 0, 0.23) 0px 6px 6px;
        z-index: 3;

        ul {
          display: flex;
          flex-direction: column;
          row-gap: 0px !important;

          li {
            width: 100%;

            button {
              cursor: pointer;
              padding: 10px 20px;
              width: 100%;
              color: #000;
              border: none;
              text-align: center;
              background-color: #fff;
              transition: 200ms;

              &:hover,
              &:focus {
                outline: none;
                background-color: silver;
              }
            }
          }
        }
      }

      span.select-lists-title {
        font-weight: 600;
      }
      
      .select-lists {
        padding: 0px;
        margin-top: 20px;
        background-color: #f0f0;
        
        .list-wrapper {
          cursor: pointer;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 20px;
          transition: 200ms;

            & > label, input {
              cursor: pointer;
              padding: 0px;
              margin: 0px;
            }

        &:hover,
        &:focus {
          background-color: #ccc;
        }
        }
      }
    }
  }
}
`;
