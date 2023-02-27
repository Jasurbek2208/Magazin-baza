import React, { useState } from "react";
import { TabTitle } from "../../utils/Utils";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

// Firebase
import { signInWithEmailAndPassword } from "firebase/auth";

// Components
import Button from "../../components/button/Button";
import Input from "../../components/input/Input";
import { auth } from "../../firebase";

export default function Login() {
  TabTitle("Login | Magazin Baza");

  const [isClicked, setIsClicked] = useState(false);
  const [disbl, setDisbl] = useState(false);
  const [error, setError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isAuth = useSelector((state) => state.isAuth);
  const dispatch = useDispatch();

  const userLogin = (data) => {
    setDisbl(true);

    try {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          localStorage.setItem("TOKEN", userCredential?.user?.uid);
          dispatch({ type: "LOG_IN" });
        })
        .catch(() => setError(true));
    } catch (error) {
      console.log(error);
    } finally {
      setDisbl(false);
    }
  };

  // helper click
  function helperClick(e) {
    if (e.target.className.includes("clicked")) {
      e.target.textContent = "G";
      e.target.classList.remove("clicked");
    } else if (e.target.type === "button") {
      e.target.innerHTML = `<span>G:</span> jasurbek@test.com <br /> <span>22Jasurbek08</span>`;
      e.target.classList.add("clicked");
    }
  }

  return (
    <StyledLogin>
      <main className="login__wrapper">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit(userLogin)} className="form__wrapper">
          <Input
            className={errors?.email?.message || error ? "borderError" : ""}
            label="Email"
            type="text"
            placeholder="Email"
            option={{
              ...register("email", {
                required: "email required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
                onChange: () => setError(false),
              }),
            }}
          />
          {errors.email && (
            <span className="error">{errors.email.message}</span>
          )}
          <Input
            onChange={() => setError(false)}
            className={errors?.password?.message || error ? "borderError" : ""}
            label="Password"
            type="text"
            placeholder="Password"
            option={{
              ...register("password", {
                required: "password required",
                onChange: () => setError(false),
                minLength: { value: 6, message: "minimum lenght 6" },
                maxLength: { value: 16, message: "maximum lenght 16" },
              }),
            }}
          />
          {errors.password && (
            <span className="error">{errors.password.message}</span>
          )}
          <Button disbl={disbl} type="submit" content="Login" />
          {error && (
            <span
              className="error"
              style={{ textAlign: "center", fontWeight: 600 }}
            >
              invalid login or password !
            </span>
          )}
        </form>

        {/* Boss account info */}
        <button type="button" className="account-helper " onClick={helperClick}>
          G
        </button>
      </main>
    </StyledLogin>
  );
}

const StyledLogin = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e7e7e7;

  .login__wrapper {
    position: relative;
    padding: 28px 22px;
    width: 300px;
    border-radius: 20px;
    background-color: #fff;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;

    h1 {
      margin-bottom: 20px;
      text-align: center;
      font-weight: 700;
      font-family: "Poppins", sans-serif;
    }

    .form__wrapper {
      display: flex;
      flex-direction: column;
      row-gap: 30px;

      .error {
        margin-bottom: -26px;
        font-size: 13px;
        color: red;
        transform: translateY(-24px);
      }
    }

    .account-helper {
      position: absolute;
      top: -80px;
      right: 10px;
      width: 40px;
      height: 40px;

      font-size: 26px;
      font-weight: 600;
      color: #005ed8;
      font-family: Poppins, sans-serif;

      border: none;
      border-radius: 100%;
      background-color: #fff;

      opacity: 0.4;
      transition: all 400ms ease, border-radius 0ms, font-size 0ms;

      &:focus,
      &:hover {
        outline: none;
        opacity: 1;
      }

      &.clicked {
        font-size: 16px;
        padding: 5px 10px;
        width: max-content;
        height: max-content;
        border-radius: 8px;

        span {
          margin-right: 10px;
          font-size: 15px;
          font-weight: 600;
          color: #005ed8;
          font-family: Poppins, sans-serif;

          &:last-of-type {
            font-size: 13px;
            margin-left: 100px;
          }
        }
      }
    }
  }
`;
