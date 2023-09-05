import { useState } from 'react';
import styled from 'styled-components';

const StyleToggleContainer = styled.div`
  position: relative;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  cursor: pointer;
  border-radius: 50px;
  transition: 0.3s;
  border: 1px solid white;
  &.toggle--checked {
    background-color: var(--black-800);
  }

  .toggle-circle {
    cursor: pointer;
    transition: all 0.3s;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 2px;
    width: ${(props) => `calc(${props.$height} - 8px)`};
    height: ${(props) => `calc(${props.$height} - 8px)`};
    border-radius: 50%;
    background-color: var(--black-100);
  }
  .toggle--checked {
    left: ${(props) => `calc(${props.$width} - ${props.$height} + 3px)`};
  }
`;

/**
 *
 * @param {string} width 전체너비
 * @param {string} height 전체높이
 * @param {string} beforeBackColor 활성화 전 컬러
 * @param {string} afterBackColor 활성화 후 컬러
 * @param {string} circleColor 동그라미 컬러
 * @param {boolean} defaultValue 초기 상태 값
 * @param {function} onClickHandler 버튼 클릭시 작동되는 핸들러
 * @param {any} rest 나머지
 * @returns
 */

export default function ToggleButton({
  width = '70px',
  height = '35px',
  defaultValue = false,
  onClickHandler,
  rest,
}) {
  const [isOn, setisOn] = useState(defaultValue);
  const handleToggleClick = () => {
    setisOn(!isOn);
    onClickHandler && onClickHandler(!isOn);
  };
  return (
    <>
      <StyleToggleContainer
        $width={width}
        $height={height}
        {...rest}
        className={`toggle-container ${isOn && 'toggle--checked'}`}
        onClick={handleToggleClick}
      >
        <div className={`toggle-circle ${isOn && 'toggle--checked'}`} />
      </StyleToggleContainer>
    </>
  );
}
