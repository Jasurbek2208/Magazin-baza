import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

// Components
import Button from "../button/Button";

export default function Navbar({ currentuser }) {
  const dispatch = useDispatch();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isClosingTime, setIsClosingTime] = useState(false);

  function closingModal() {
    setTimeout(() => {
      setIsProfileOpen(false);
      setIsClosingTime(false);
    }, 500);
  }

  useEffect(() => {
    if (isClosingTime) {
      closingModal();
    }
  }, [isClosingTime]);

  return (
    <StyledNavbar>
      <div className="container">
        <div
          className="user_profile"
          onClick={() => setIsProfileOpen((p) => !p)}
        >
          <i className="icon fa-solid fa-user"></i>
        </div>
        <Button
          content="Chiqish"
          onClick={() => dispatch({ type: "LOG_OUT" })}
        />
      </div>

      {isProfileOpen && (
        <div
          className={"user-profile-modal" + (isClosingTime ? " closing" : "")}
        >
          <div className="modal-close-btn">
            <i
              className="icon fa-solid fa-close"
              onClick={() => setIsClosingTime(true)}
            ></i>
          </div>
          <div className="user-info__wrapper">
            <div className="user_profile">
              <i className="icon fa-solid fa-user"></i>
            </div>
            <h2 className="user-fullname">
              {currentuser?.firstName + " " + currentuser?.lastName}
            </h2>
            <h5>Shaxsiy ma'lumotlar:</h5>
            <ul>
              <li>
                <p>
                  Jinsi: <span>{currentuser?.genre}</span>
                </p>
              </li>
              <li>
                <p>
                  Telefon raqam: <span>{currentuser?.phoneNumber}</span>
                </p>
              </li>
              <li>
                <p>
                  Elektron pochta: <span>{currentuser?.email}</span>
                </p>
              </li>
              <li>
                <p>
                  Lavozimi: <span>{currentuser?.rol.join(", ")}</span>
                </p>
              </li>
            </ul>
          </div>

          <div
            className="close-modal"
            onClick={() => setIsClosingTime(true)}
          ></div>
        </div>
      )}
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

  .user_profile {
    cursor: pointer;
    display: grid;
    place-items: center;

    width: 56px;
    height: 56px;
    border-radius: 100%;
    border: 1px solid #1e90ff;
    overflow: hidden;

    & > .icon {
      margin-top: 10px;
      color: #ccc;
      font-size: 50px;
    }
  }

  .user-profile-modal {
    padding: 22px 12px;
    position: fixed;
    top: 0;
    left: 0;

    width: 400px;
    height: 100vh;

    background-color: #fff;
    border-right: 1px solid #1e90ff;
    box-shadow: rgba(56, 56, 56, 0.2) 0px 2px 8px 0px;

    z-index: 100;
    animation-name: modalOpening;
    animation-duration: 500ms;
    transition: 300ms ease-in-out;

    &.closing {
      animation-name: modalClosing;
      animation-duration: 500ms;
      animation-fill-mode: both;
    }

    .modal-close-btn {
      padding: 0px 20px;
      display: none;

      & > .icon {
        width: max-content;
        cursor: pointer;
        color: #ccc;
        font-size: 36px;
        min-width: max-content;
        min-height: max-content;
      }
    }

    .user-info__wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 20px;

      .user_profile {
        cursor: default;
        width: 106px;
        height: 106px;

        & > .icon {
          font-size: 95px;
        }
      }

      h5 {
        margin: 16px 0;
      }

      ul {
        padding: 0px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        gap: 22px;

        li {
          width: 270px;
          max-width: 270px;

          p {
            margin: 0px;
            font-weight: 700;
          }

          span {
            margin-left: 8px;
            font-weight: 400;
          }
        }
      }
    }

    .close-modal {
      position: fixed;
      top: 0;
      left: 400px;
      width: 100%;
      height: 100vh;
      background-color: transparent;
    }
  }

  @media (max-width: 460px) {
    .user-profile-modal {
      width: 100%;

      .modal-close-btn {
        display: flex;
        justify-content: flex-end;
      }

      .close-modal {
        display: none;
      }
    }
  }
`;
