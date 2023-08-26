import React from 'react';
import { styled } from 'styled-components';

const StyleErrorInput = styled.div`
  label {
  }
  input {
  }
  div {
  }
`;

export default function Input({ label, onChange, error, value, type, name }) {
  return (
    <StyleErrorInput>
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} value={value} onChange={onChange} name={name} />
      {error && <div>{error}</div>}
    </StyleErrorInput>
  );
}
