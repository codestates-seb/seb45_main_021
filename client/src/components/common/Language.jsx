import React from 'react';
import { styled } from 'styled-components';

const JAVASCRIPT_COLOR = '#F7DF1E';
const PYTHON_COLOR = '#3776AB';
const JAVA_COLOR = '#007396';
const C_SHARP_COLOR = '#239120';
const RUBY_COLOR = '#CC342D';
const PHP_COLOR = '#777BB4';
const SWIFT_COLOR = '#FFAC45';
const KOTLIN_COLOR = '#7F52FF';
const TYPESCRIPT_COLOR = '#007ACC';
const GO_COLOR = '#00ADD8';
const RUST_COLOR = '#DEA584';
const DART_COLOR = '#0175C2';
const CPP_COLOR = '#00599C';

const StyleLanguage = styled.span`
  background-color: ${(props) => props.$background};
  padding: 3px 6px;
  position: absolute;
  left: -40px;
  color: ${(props) => props.$color};
  top: 22px;
  right: 0;
  font-weight: bold;
  font-family: var(--barlow);
  font-size: 2rem;
  letter-spacing: 1px;
  width: 15rem;
  text-align: center;
  transform: rotate(-45deg);
`;

/**
 * 언어를 입력받아, 해당 언어의 대표 색상으로 바꿔주는 컴포넌트 입니다
 * @param {string} language - 사용 언어 입니다.
 * @param {string} size - font size입니다

 * @returns {JSX.Element}
 */

export default function Language({ language }) {
  let background = '';
  let color = '';

  switch (language) {
    case 'JavaScript':
      background = JAVASCRIPT_COLOR;
      color = '#2f2f2f';
      break;
    case 'Python':
      background = PYTHON_COLOR;
      break;
    case 'Java':
      background = JAVA_COLOR;
      break;
    case 'C#':
      background = C_SHARP_COLOR;
      break;
    case 'Ruby':
      background = RUBY_COLOR;
      break;
    case 'PHP':
      background = PHP_COLOR;
      break;
    case 'Swift':
      background = SWIFT_COLOR;
      color = '#2f2f2f';
      break;
    case 'Kotlin':
      background = KOTLIN_COLOR;
      break;
    case 'TypeScript':
      background = TYPESCRIPT_COLOR;
      break;
    case 'Go':
      background = GO_COLOR;
      break;
    case 'Rust':
      background = RUST_COLOR;
      color = '#2f2f2f';
      break;
    case 'Dart':
      background = DART_COLOR;
      break;
    case 'C++':
      background = CPP_COLOR;
      break;
    default:
      background = '';
      break;
  }

  return (
    <StyleLanguage $background={background} $color={color}>
      {language}
    </StyleLanguage>
  );
}
