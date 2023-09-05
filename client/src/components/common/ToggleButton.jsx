import { useState } from 'react';
import styled from 'styled-components';

const StyleToggleContainer = styled.div`
    position: relative;
    width: ${props => props.$width};
    height: ${props => props.$height};
    cursor: pointer;
    * {
        transition: all 0.3s;
    }

    .toggle-container {
        width: 100%;
        height: 100%;
        border-radius: 30px;
        background-color:${props => props.$beforBackColor}
    }
    .toggle--checked {
        background-color:${props => props.$afterBackColor}
    }

    .toggle-circle {
        position: absolute;
        top: 2px;
        left: 2px;
        width: ${props => `calc(${props.$height} - 4px)`};
        height: ${props => `calc(${props.$height} - 4px)`};
        border-radius: 50%;
        background-color:${props => props.$circleColor};
    }
    .toggle--checked {
        left:${props => `calc(${props.$width} - ${props.$height} + 2px)`};
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

export default function ToggleButton ({
    width='100px',
    height='50px',
    beforBackColor='var(--black-500)',
    afterBackColor='green',
    circleColor='var(--black-100)',
    defaultValue=false,
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
        $beforBackColor={beforBackColor}
        $afterBackColor={afterBackColor}
        $circleColor={circleColor}
        {...rest}
        onClick={handleToggleClick}
      >
        <div className={`toggle-container ${isOn && "toggle--checked"}`}/>
        <div className={`toggle-circle ${isOn && "toggle--checked"}`}/>
      </StyleToggleContainer>
    </>
  );
};