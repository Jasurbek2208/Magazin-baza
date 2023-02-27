import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Components
import Button from "../button/Button";

export default function Navbar() {
  const dispatch = useDispatch();
  return (
    <StyledNavbar>
      <div className="container">
        <div className="user_icon"></div>
        <Button
          content="Chiqish"
          onClick={() => dispatch({ type: "LOG_OUT" })}
        />
      </div>
    </StyledNavbar>
  );
}

const StyledNavbar = styled.nav`
  padding: 13px 0px;
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: #fff;
  z-index: 20;
  box-shadow: 0px 1px 8px 0px #ccc;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
