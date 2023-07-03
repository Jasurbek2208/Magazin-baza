import React, { useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";
import Loading from "../loading/Loading";

export default function Input({
  type = "text",
  require = false,
  placeholder,
  label,
  option = null,
  minLength,
  className = "",
  onChange,
  errName,
  errors,
  error = {},
  value,
  pattern,
  image,
  isLoading,
}) {
  return (
    <StyledInput>
      {label ? <label htmlFor={label}>{label}</label> : null}
      {type === "number" ? (
        <>
          <CurrencyInput
            className={
              className +
              " input form-control" +
              (errName === "narxi" ? " narxi" : "") +
              (error?.error ? " borderError" : "")
            }
            name={label}
            value={value}
            placeholder={placeholder}
            {...option}
            onValueChange={onChange || null}
          />
          {/* {errName === "narxi" ? <span className="sum">so'm</span> : null} */}
          {error?.error && (
            <span className={(errName === "narxi" ? " narxi " : "") + "error"}>
              {error?.errName}
            </span>
          )}
        </>
      ) : type === "number-2" ? (
        <input
          type="date"
          className={className + " input form-control"}
          name={label}
          value={value}
          required={require}
          placeholder={placeholder || '22.08.2004'}
          onChange={onChange}
        />
      ) : type === "number-3" ? (
        <input
          type="tel"
          className={className + " input form-control"}
          name={label}
          value={value}
          pattern={pattern}
          required={require}
          placeholder={placeholder}
          onChange={onChange}
        />
      ) : (
        <>
          {type === "file" ? (
            <div className="checkImage__wrapper">
              {image ? (
                <img src={image} alt="check" className="check-image" />
              ) : (
                <>
                  <i className="icon fa-solid fa-receipt"></i>
                  <p>Check yuklanmagan !</p>
                </>
              )}

              {isLoading ? (
                <div className="loading">
                  <Loading />
                </div>
              ) : null}
            </div>
          ) : null}
          {type === "file" ? (
            <input
              className={
                className +
                (type === "file" ? " custom-file-input input" : " input") +
                (error?.error ? " borderError" : "")
              }
              type={type}
              name={label}
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
              disabled={isLoading}
              value={value}
              placeholder={placeholder}
              onChange={onChange}
              {...option}
            />
          ) : (
            <input
              className={
                className + (error?.error ? " borderError input" : " input form-control")
              }
              type={type}
              pattern={pattern || null}
              required={require}
              minLength={minLength || 0}
              name={label}
              value={value}
              disabled={isLoading}
              placeholder={placeholder}
              onChange={onChange}
              {...option}
            />
          )}
          {error?.error && (
            <span className={(errName === "narxi" ? " narxi " : "") + "error"}>
              {error?.errName}
            </span>
          )}
        </>
      )}
      {errors?.[errName] && (
        <span className={(errName === "narxi" ? " narxi " : "") + "error"}>
          {errors?.[errName]?.message}
        </span>
      )}
    </StyledInput>
  );
}

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;

  .input {
    width: 100%;
    padding: 12px;
    margin: 1px;
    color: #000;
    border: 1px solid #005ed8;

    &:focus {
      margin: 0px;
      outline: none;
      border: 2px solid #005ed8;
    }

    &.borderError {
      border: 1px solid red;

      &:focus {
        margin: 0px;
        outline: none;
        border: 2px solid red;
      }
    }

    &.narxi {
      padding: 12px 50px 12px 12px;
    }
  }

  .sum {
    transform: translate(86%, -39px);
  }

  .error {
    margin-bottom: -26px;
    font-size: 13px;
    color: red;
    transform: translateY(-7px);

    &.narxi {
      /* transform: translateY(-33px); */
    }
  }

  /* /////////////////// */

  .checkImage__wrapper {
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    height: 200px;
    border: 1px solid #005ed8;
    border-radius: 6px;
    overflow: hidden;

    .loading {
      position: absolute;
      top: 0px;
      left: 0px;
      display: grid;
      place-items: center;
      width: 100%;
      height: 100%;
      border: 1px solid #1d1d1d18;
      background: rgba(255, 255, 255, 0.2);
      box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
    }

    .check-image {
      width: 100%;
      height: 100%;
      max-width: 100%;
      max-height: 100%;
    }

    .icon {
      margin-bottom: -30px;
      font-size: 100px;
      color: #1c78f0;
    }

    p {
      font-weight: 500;
      color: #1c78f0;
    }
  }

  .custom-file-input {
    position: relative;
    cursor: pointer;
    color: #fff;
    border-radius: 6px;

    &::before {
      content: "Checkni yuklash";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
      color: #000;
    }

    &::-webkit-file-upload-button {
      visibility: hidden;
    }
  }

  input {
    &::placeholder {
      opacity: .6;
    }
  }
`;
