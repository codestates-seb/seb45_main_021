import { styled } from 'styled-components';

/**
 * @description 테두리 버튼 입니다.
 * @param {string} width - 가로 길이
 * @param {string} height - 세로 길이
 * @param {string} fontSize - 폰트 크기
 * @param {string} hoverEvent - 호버 이벤트를 추가로 줄 수 있습니다
 * @param {string} borderColor - 테두리 색 지정
 * @param {string} color - 버튼 색 컬러 지정
 * @return {JSX.Element}
 */
export const StyleBorderButton = styled.button`
  border: 2px solid ${(props) => (props.$borderColor ? props.$borderColor : 'var(--black-100)')};
  border-radius: ${(props) => (props.$radius ? props.$radius : '20px')};
  position: relative;
  color: ${(props) => (props.$color ? props.$color : '')};
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : '')};
  width: ${(props) => (props.$width ? props.$width : '')};
  height: ${(props) => (props.$height ? props.$height : '')};
  overflow: hidden;
  opacity: 0.8;
  transition: all.2s;
  &:after {
    position: absolute;
    content: '';
    width: 100%;
    left: -100%;
    top: 0;
    height: 100px;
    background-color: #ffffff23;
    transition: all.2s;
    z-index: -1;
  }
  &:hover {
    opacity: 1;
    ${(props) => (props.$hoverEvent ? props.$hoverEvent : '')}
  }
  &:hover:after {
    left: 0;
  }
`;

export const StyleBottomButton = styled.button`
  position: relative;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }

  &:after {
    content: '';
    position: absolute;
    width: 0px;
    height: 2px;
    background-color: var(--black-100);
    bottom: 0;
    left: 0;
    right: 0;
    transition: all.2s;
    margin: auto;
  }
  &:hover:after {
    width: 80%;
  }
`;
