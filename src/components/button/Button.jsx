import React from "react";
import styled from "styled-components";

export default function Button({
  type = "button",
  onClick,
  content,
  disbl,
  customize,
  width,
  className,
  isLoading,
  statistics = false,
  isActive,
  isDownloadble,
}) {
  return (
    <StyledButton
      // className={
      //   (className ? className : "") +
      //   (customize ? " customize" : "") +
      //   (statistics ? " statistics" : "") +
      //   (isActive ? " active" : "")
      // }
      className={
        (className ? className : "") +
        (customize ? " customize" : "") +
        " btn btn-primary "
      }
      disabled={disbl || isLoading}
      style={{ width: width, cursor: isLoading ? "not-allowed" : "pointer" }}
      type={type}
      onClick={onClick}
    >
      {isDownloadble && <i className="fas fa-download" />}{" "}{content}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
  padding: 14px 22px;
  position: relative;
  color: #000;
  font-size: 0.9rem;
  font-weight: 600;
  border: 1px solid #005ed8;
  background-color: #fff0;
  overflow: hidden;
  transition: all 400ms, border 0ms;
  z-index: 2;

  &.zIdx {
    z-index: 10;
  }

  &::before {
    z-index: -1;
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: #005ed8;
    transition: 200ms;
  }

  &:not(.statistics):hover,
  &:not(.statistics):focus {
    outline: none;
    color: #fff;

    &::before {
      background-color: #005ed8;
      width: 100%;
    }
  }

  &.customize {
    padding: 10px 22px;
    color: #fff;
    border: 2px solid #005ed8;
    background-color: #005ed8;
    transition: all 100ms;

    &:focus,
    &:hover {
      border: 2px solid #0067ee;
      background-color: #0067ee;

      &::before {
        background-color: #fff0;
        width: 0%;
      }
    }

    &:active {
      transform: scale(96%);
    }
  }

  &.statistics {
    background-color: #fff;

    &:not(.active):hover,
    &:not(.active):focus {
      outline: none;
      transform: scale(1.1);
      z-index: 20;
    }

    &:active {
      transform: scale(1);
    }

    &.active {
      color: #fff;

      &::before {
        background-color: #005ed8;
        width: 100%;
      }
    }
  }
`;
