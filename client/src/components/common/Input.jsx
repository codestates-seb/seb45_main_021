import React, { useEffect, useRef } from 'react';
import { styled } from 'styled-components';

const StyleErrorInput = styled.div`
  position: relative;
  margin: 5px 0 5px 0;
  div {
    color: var(--error);
    padding: 5px;
  }
`;

const Label = styled.label`
  position: absolute;
  top: -11px;
  left: 10px;
  color: ${(props) => (props.$labelColor ? props.$labelColor : 'var(--black-100)')};
  font-size: 1.6rem;
  background-color: var(--backgroundColor);
  padding-left: 3px;
  padding-right: 3px;
`;

const StyleInput = styled.input`
  background: none;
  border: 1px solid;
  border-color: ${(props) => (props.$borderColor ? props.$borderColor : 'var(--black-100)')};
  border-radius: 3px;
  width: ${(props) => props.$width};
  height: ${(props) => props.$height};
  color: ${(props) => (props.$color ? props.$color : 'var(--black-100)')};
  padding: 13px;
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : '1.5rem')};
`;

const StyleError = styled.div`
  width: fit-content;
  height: 1rem;
  opacity: ${(props) => (props.error === '' ? 0 : 1)};
`;

const StyleTextArea = styled.textarea`
  background: none;
  border: 1px solid;
  border-color: ${(props) => (props.$borderColor ? props.$borderColor : 'var(--black-100)')};
  border-radius: 3px;
  width: ${(props) => props.$width};
  min-height: ${(props) => props.$height};
  color: ${(props) => (props.$color ? props.$color : 'var(--black-100)')};
  padding: 8px 6px;
  font-size: 1.5rem;
  font-family: var(--nanum);
`

/**
 * 공용 인풋 폼 입니다.
 * 사용시 필요한 정보와 나머지 옵션은 ...rest 스프레드 문법을 통해 전달됩니다.
 * @param {string} label - 라벨 텍스트 입니다.
 * @param {string} error - 에러시 띄우고싶은 메세지입니다.
 * @param {string} width - 인풋의 너비입니다.
 * @param {string} height - 인풋의 높이입니다.
 * @param {string} fontSize - 인풋의 폰트 사이즈입니다.
 * @param {string} color - 인풋의 컬러입니다. 기본 값 --black-100
 * @param {string} labelColor - 라벨 텍스트의 컬러입니다. 기본 값 --black-100
 * @param {string} borderColor -  인풋의 border 색상입니다. 기본 값 --black-100
 * @param {function} onChangeHandler -  인풋의 onChange이벤트에 넘어오는 함수입니다.
 * @param {string} type -  text,textarea 둘 중 하나로 넘기면 text또는 textarea를 만들어줍니다.
 * @param {any} rest - 기타 프로퍼티들은 인풋 요소에 스프레드 문법으로 전달됩니다.
 * @returns {JSX.Element}
 */
export default function Input({
  label,
  error,
  name,
  width,
  height,
  color,
  labelColor,
  borderColor,
  onChangeHandler,
  type = "text",
  ...rest
}) {
  return (
    <StyleErrorInput>
      <Label htmlFor={name} $labelColor={labelColor}>
        {label}
      </Label>
      {type === 'text'
      ? <StyleInput
          $width={width}
          $height={height}
          $color={color}
          $borderColor={borderColor}
          onChange={onChangeHandler}
          {...rest}
        />
      : type === 'textarea'
      ? <StyleTextArea
          rows={1}
          $width={width}
          $height={height}
          $color={color}
          $borderColor={borderColor}
          onChange={onChangeHandler}
          {...rest}
        />
      : undefined
      }
      {error && <div>{error}</div>}
    </StyleErrorInput>
  );
}
