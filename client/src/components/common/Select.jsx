import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
const Container = styled.div`
  width: ${(props) => props.$width || '300px'};
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : '1.5rem')};
  gap: 10px;
  position: relative;
  font-weight: bold;
`;

const StyleSelect = styled.div`
  width: 100%;
  height: ${(props) => props.$height || '3rem'};
  position: absolute;
  display: flex;
  align-items: center;
  border: 1px solid var(--black-100);
  border-radius: 5px;
  cursor: pointer;
  .arrow-icon {
    position: absolute;
    right: 10px;
    transform: ${(props) => (props.$isOn ? 'rotate(180deg)' : '')};
    transition: all 0.4s;
  }
`;

const StyleValue = styled.div`
  position: absolute;
  left: 10px;
`;

const StyleDropMenu = styled.div`
  position: absolute;
  top: ${(props) => (props.$height ? `calc(${props.$height} + 5px)` : '35px')};
  width: 100%;
  border: 1px solid var(--black-100);
  border-radius: 5px;
  overflow: auto;
  opacity: ${(props) => (props.$isOn ? '1' : '0')};
  max-height: ${(props) => (props.$isOn ? '120px' : '0')};
  transition: all 0.3s;
  backdrop-filter: blur(10px);
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* 스크롤바 전체 영역 */
  &::-webkit-scrollbar-track {
    background: var(--backgroundColor) !important;
    border-radius: 6px;
  }
`;

const StyleDropMenuItem = styled.div`
  width: 100%;
  padding: 1rem;
  transition: all 0.3s;
  background-color: var(--backgroundColor);
  cursor: pointer;
  &:hover {
    background-color: #7d6a6a;
  }
`;

/**
 * 공용 드롭다운
 * * @description
 * - const handleClickItem = (item) => {
    setCurItem(item);
  };
 * - props width="30" options={options} itemValue={curItem} onClickHandler={handleClickItem}
 * @param {string} width - 드롭다운 가로 길이
 * @param {string} height - 드롭다운 세로 길이
 * @param {object[]} options - 옵션으로 들어올 객체 배열 {defaultLabel:'옵션'}
 * @param {string} itemValue - 현재 표시할 요소 값 참조
 * @param {function} defaultLabel - 기본 라벨입니다
 * @param {string} fontSize - 전체 폰트 사이즈
 * @param {function} onClickHandler - 함수 전달시 매개변수가 전달됨 해당 매개변수를 세터 값을 변경하는 함수로 만들고 넣으세요
 * @returns {JSX.Element}
 */
export default function Select({ width, options, defaultLabel, onClickHandler, fontSize, height }) {
  const [isOn, setIsOn] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState(defaultLabel);

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

  useEffect(() => {
    setSelectedLabel(defaultLabel);
  }, [defaultLabel]);

  return (
    <Container className="select-container col" $width={width} $fontSize={fontSize}>
      <StyleSelect className="select" $height={height} $isOn={isOn} onClick={handleClick}>
        <StyleValue>{selectedLabel}</StyleValue>
        <IoIosArrowDown className="arrow-icon" size={20} />
      </StyleSelect>
      <StyleDropMenu $height={height} className="col" $isOn={isOn}>
        {options.map((el, i) => (
          <StyleDropMenuItem
            key={i}
            onClick={() => {
              onClickHandler(el.value);
              setSelectedLabel(el.label);
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
