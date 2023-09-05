import React from 'react';
import { styled } from 'styled-components';
import { BsCheckLg } from 'react-icons/bs';
const StyleCheckBox = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  div {
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    border: 1px solid var(--black-100);
    width: ${(props) => props.$boxSize};
    height: ${(props) => props.$boxSize};
    transition: 0.2s;
    text-align: center;
    line-height: ${(props) => props.$boxSize};
    font-weight: bold;
    padding-right: 2px;
    padding-bottom: 2px;
    &.active {
      background-color: var(--backgroundColor);
    }
    svg,
    path {
      cursor: pointer;
      font-size: ${(props) => `calc(${props.$boxSize} - 5px)`};
    }
  }
  span {
    font-size: ${(props) => props.$fontSize};
    font-family: var(--barlow);
    font-weight: var(--barlow-semi-bold);
  }
`;

export default function CheckBox({ boxSize = '30px', fontSize = '15px', value, label, onChange }) {
  return (
    <StyleCheckBox onClick={() => onChange(!value)} $boxSize={boxSize} $fontSize={fontSize}>
      <div className={value ? 'active' : ''}>{value && <BsCheckLg />}</div>
      <span>{label}</span>
    </StyleCheckBox>
  );
}
