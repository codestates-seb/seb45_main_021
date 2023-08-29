import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';

const Container = styled.div`
  width: ${(props) => props.$width}rem;
  gap: 10px;
  position: relative;
`;

const StyleSelect = styled.div`
  width: 100%;
  height: 3rem;
  position: absolute;
  display: flex;
  align-items: center;
  border: 1px solid var(--black-100);
  border-radius: 5px;
  cursor: pointer;
`;

const StyleValue = styled.div`
  position: absolute;
  left: 10px;
`;

const StyleIcon = styled.div`
  position: absolute;
  right: 10px;
  font-size: 1rem;
  transform: ${(props) => (props.$isOn ? 'rotate(180deg)' : '')};
  transition: all 0.4s;
`;

const StyleDropMenu = styled.div`
  position: absolute;
  top: 35px;
  width: 100%;
  border: 1px solid var(--black-100);
  border-radius: 5px;
  overflow: auto;
  opacity: ${(props) => (props.$isOn ? '1' : '0')};
  height: ${(props) => (props.$isOn ? '92px' : '0')};
  transition: all 0.3s;
`;

const StyleDropMenuItem = styled.div`
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    background-color: #00000026;
  }
`;

/**
 * 공용 드롭다운
 * @param {string} width - 드롭다운 가로 길이
 * @param {object[]} options - 옵션으로 들어올 객체 배열 {value:'옵션'}
 * @param {string} itemValue - 현재 표시할 요소 값 참조
 * @param {function} onClickHandler - 함수 전달시 매개변수가 전달됨 해당 매개변수를 세터 값을 변경하는 함수로 만들고 넣으세요
 * const handleClickItem = (item) => {
    setCurItem(item);
  };
 * @returns {JSX.Element}
 */
export default function Select({ width, options, itemValue, onClickHandler }) {
  const [isOn, setIsOn] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOn((prev) => !prev);
  };

  const handleDropDownCloser = () => {
    setIsOn(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleDropDownCloser);
    return () => window.removeEventListener('click', handleDropDownCloser);
  }, []);

  return (
    <Container className="col" $width={width}>
      <StyleSelect onClick={handleClick}>
        <StyleValue>{itemValue}</StyleValue>
        <StyleIcon $isOn={isOn}>▼</StyleIcon>
      </StyleSelect>
      <StyleDropMenu className="col" $isOn={isOn}>
        {options.map((el, i) => (
          <StyleDropMenuItem
            key={i}
            onClick={() => {
              onClickHandler(el.label);
            }}
            $isOn={isOn}
          >
            {el.label}
          </StyleDropMenuItem>
        ))}
      </StyleDropMenu>
    </Container>
  );
}
