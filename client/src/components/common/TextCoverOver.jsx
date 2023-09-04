import React from 'react';
import { styled } from 'styled-components';

const StyleTextCoverOver = styled.div`
  display: inline-block;
  position: relative;
  span {
    font-size: ${(props) => props.$fontSize || '1.6rem'};
    font-family: var(--barlow);
    font-weight: var(--barlow-bold);
    letter-spacing: 2px;
  }
  .text {
    color: transparent;
    -webkit-text-stroke: ${(props) => props.$borderSize} var(--black-500);
  }

  .cover {
    position: absolute;
    left: 0px;
    top: 0;
    width: 0;
    overflow: hidden;
    height: 100%;
    color: var(--black-200);
    font-size: ${(props) => props.$fontSize};
    animation: animate 4s linear forwards;
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

export default function TextCoverOver({ text, fontSize, borderSize }) {
  return (
    <StyleTextCoverOver $fontSize={fontSize} $borderSize={borderSize}>
      <span className="text">{text}</span>
      <span className="cover">{text}</span>
    </StyleTextCoverOver>
  );
}
