import React, { useState } from "react";
import styled from "styled-components";

export default function Select({
  label,
  list,
  selected = null,
  sortData,
  isFormSelect = false,
  outlineStyle = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelect, setIsSelect] = useState(false);
  const [selectValue, setSelectValue] = useState(
    isFormSelect && selected
      ? selected
      : isFormSelect && !outlineStyle
      ? list[0]
      : ""
  );

  return (
    <>
      {label ? <StyledLabel htmlFor={label}>{label}</StyledLabel> : null}
      <select
        className="form-select"
        style={{ padding: "12px", border: "1px solid rgb(0, 94, 216)" }}
        onChange={(e) => {
          sortData(e.target.value);
          setSelectValue(e.target.value);
        }}
      >
        {list
          ? list?.map((i) => (
              <option key={i} type="button">
                {i}
              </option>
            ))
          : null}
      </select>
    </>
  );
}

const StyledLabel = styled.label`
  margin-bottom: 8px;
  font-family: "Poppins", sans-serif;
`;
