import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function Select({ content, list, sortData }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [selectValue, setSelectValue] = useState("");

  return (
    <StyledSelect>
      <button
        type="button"
        className="select-btn"
        onClick={() => setIsOpen(true)}
      >
        <p className={(isSelect ? "On " : "") + "select_title"}>Select by</p>
        <p>{selectValue}</p>
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
  .select-btn {
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
`;
