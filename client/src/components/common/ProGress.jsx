import React from 'react';
import { styled } from 'styled-components';

const StyleProGress = styled.div`
  position: absolute;
  right: 0rem;
  font-size: ${(props) => props.$fontSize};
  top: ${(props) => props.$top};
  font-weight: var(--nanum-bold);
`;

/**
 *
 * @param {string} width - ProGress컴포넌트가 차지할 너비
 * @param {string} height - ProGress컴포넌트가 차지할 높이
 * @param {string} fontSize - 표시될 글자의 크기 기본값 16px
 * @param {string} top - 표시될 글자와 프로그레스바의 갭 기본값 -1.4rem
 * @param {number} comPleteNum - 프로그레스 최고단계 수
 * @param {number} proGressNum - 프로그레스 진행 수
 * @param {any} error - 프로그레스 진행단계와 상관없이 에러표시하고싶을때
 * @returns
 */

export default function ProGress({
  width,
  height,
  fontSize = '20px',
  top = '',
  comPleteNum,
  proGressNum,
  error,
  ...rest
}) {
  return (
    <StyleProGress
      $width={width}
      $height={height}
      $fontSize={fontSize}
      $top={top}
      className="progress-bar"
      {...rest}
    >
      {`${proGressNum} / ${comPleteNum}`}
    </StyleProGress>
  );
}
