import React from 'react';
import { styled } from 'styled-components';

const StyleTextCoverOver = styled.div`
  display: inline-block;
  position: relative;
  padding-bottom: 20px;
  span {
    font-family: var(--barlow);
    font-weight: var(--barlow-bold);
    font-size: ${(props) => props.$fontSize || '1.6rem'};
    letter-spacing: 2px;
  }
  .text {
    color: transparent;
    -webkit-text-stroke: ${(props) => props.$borderSize} var(--black-500);
  }
  .cover {
    position: absolute;
    left: 0px;
    height: 100%;
    top: 0;
    overflow: hidden;
    color: var(--black-200);
    animation: animate 0.6s linear forwards;
    white-space: nowrap;
  }

  @keyframes animate {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;

/**
 * 텍스트 입력받아 꾸며주는 컴포넌트입니다
 * @param {string} text - 표시할 텍스트입니다
 * @param {object} fontSize - font 사이즈 입니다
 * @param {string} borderSize - border사이즈 입니다
 * @returns {JSX.Element}
 */

export default function TextCoverOver({ text, fontSize, borderSize }) {
  return (
    <StyleTextCoverOver $fontSize={fontSize} $borderSize={borderSize}>
      <span className="text">{text}</span>
      <span className="cover">{text}</span>
    </StyleTextCoverOver>
  );
}
