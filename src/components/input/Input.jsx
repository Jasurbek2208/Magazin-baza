import React from "react";
import CurrencyInput from "react-currency-input-field";
import styled from "styled-components";

export default function Input({
  type = "text",
  placeholder,
  label,
  option,
  className,
  onChange,
  errName,
  errors,
  error,
  value,
}) {
  return (
    <StyledInput>
      {label ? <label htmlFor={label}>{label}</label> : null}
      {type === "number" ? (
        <>
          <CurrencyInput
            className={
              className +
              " input" +
              (errName === "narxi" ? " narxi" : "") +
              (error.error ? " borderError" : "")
            }
            name={label}
            placeholder={placeholder}
            onValueChange={onChange}
            {...option}
          />
          {errName === "narxi" ? <span className="sum">so'm</span> : null}
          {error.error && (
            <span className={(errName === "narxi" ? " narxi " : "") + "error"}>
              {error.errName}
            </span>
          )}
        </>
      ) : (
        <>
          <input
            className={
              className + " input" + (error?.error ? " borderError" : "")
            }
            type={type}
            name={label}
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            {...option}
          />
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
      transform: translateY(-33px);
    }
  }
`;
