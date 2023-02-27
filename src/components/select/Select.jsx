import React, { useState } from "react";
import styled from "styled-components";

export default function Select({
  label,
  list,
  sortData,
  isFormSelect = false,
  outlineStyle = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [selectValue, setSelectValue] = useState(
    isFormSelect && !outlineStyle ? list[0] : ""
  );

  return (
    <StyledSelect>
      {label ? <label htmlFor={label}>{label}</label> : null}
      <button
        type="button"
        className={"select-btn" + (outlineStyle ? " outline" : "")}
        onClick={() => setIsOpen(true)}
      >
        {isFormSelect ? null : (
          <p className={(isSelect ? "On " : "") + "select_title"}>Tartiblash</p>
        )}
        {outlineStyle ? (
          <p className={(isSelect ? "On " : "") + "select_title"}>
            Jinsingizni tanlang
          </p>
        ) : null}
        {selectValue ? <p className="selectValue">{selectValue}</p> : null}
      </button>
      <div
        className={(isOpen ? "On " : "") + "select-modal__wrapper"}
        onClick={() => {
          setIsOpen(false);
        }}
      ></div>
      {isOpen ? (
        <div className="select-modal">
          <ul>
            {list?.map((i) => (
              <li key={i}>
                <button
                  type="button"
                  onClick={() => {
                    sortData(i);
                    setIsOpen(false);
                    setIsSelect(true);
                    setSelectValue(i);
                  }}
                >
                  {i}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </StyledSelect>
  );
}

const StyledSelect = styled.div`
  label {
    margin-bottom: 8px;
    font-family: "Poppins", sans-serif;
  }

  .select-btn {
    width: 100%;
    cursor: pointer;
    position: relative;
    padding: 10px 22px;
    position: relative;
    color: #fff;

    font-size: 0.9rem;
    font-weight: 600;
    border: 2px solid #005ed8;
    background-color: #005ed8;
    transition: 100ms;

    &:focus,
    &:hover {
      outline: none;
      border: 2px solid #0067ee;
      background-color: #0067ee;

      .select_title.On {
        background-color: #0067ee;
      }
    }

    .select_title {
      transition: 100ms;

      &.On {
        padding: 2px 10px 0px 4px;
        position: absolute;
        top: -13px;
        left: -2px;
        color: #fff;
        font-size: 12px;
        font-weight: 400;
        background-color: #005ed8;
      }
    }

    .select_title,
    .selectValue {
      margin: 0px;
    }

    &.outline {
      padding: 12px;
      margin: 1px !important;
      color: #000;
      border: 1px solid #005ed8;
      background-color: transparent;
      transition: none;

      &:focus {
        margin: 0px !important;
        outline: none;
        border: 2px solid #005ed8;
      }
    }
  }

  .select-modal__wrapper {
    &.On {
      position: fixed;
      bottom: 0px;
      left: 0px;
      width: 100%;
      height: 100vh;
      background-color: #fff0;
      z-index: 2;
    }
  }

  .select-modal {
    position: absolute;
    width: max-content;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px;
    z-index: 3;

    ul {
      padding: 0px;
      display: flex;
      flex-direction: column;
      row-gap: 0px !important;
      margin-bottom: 0 !important;

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

  @media (max-width: 648px) {
    .select-modal {
      width: max-content !important;

      ul {
        width: max-content !important;

        li {
          width: max-content !important;

          button {
            width: 200px;
          }
        }
      }
    }
  }

  @media (max-width: 545px) {
    position: relative;
    .select-modal {
      right: 0px;
    }
  }

  @media (max-width: 400px) {
    position: relative;
    .select-modal {
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;
