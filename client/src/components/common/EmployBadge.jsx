import React, { useState, useEffect } from 'react';
import { AiOutlineFire } from 'react-icons/ai';
import { styled } from 'styled-components';

const StyleEmployBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  path,
  svg {
    cursor: pointer;
  }
  span {
    opacity: ${(props) => (props.$isClick ? '1' : '0')};
    transform: translateX(${(props) => (props.$isClick ? '0' : '10px')});
    transition: 0.2s;
    font-size: 1.5rem;
    font-family: var(--barlow);
    font-weight: var(--barlow-bold);
  }
`;

/**
 * 좋아요 버튼과, 좋아요 개수를 보여주는 컴포넌트입니다
 * @param {string} size - 뱃지 사이즈 입니다.
 * @returns {JSX.Element}
 */

export default function EmployBadge({ size }) {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const visibleHandler = () => {
      if (isShow) setIsShow(false);
    };
    window.addEventListener('click', visibleHandler);
    return () => window.removeEventListener('click', visibleHandler);
  });

  const isShowToggleHandler = (e) => {
    e.stopPropagation();
    setIsShow((pre) => !pre);
  };

  return (
    <StyleEmployBadge $isClick={isShow}>
      <span>취업을 위한 포트폴리오예요</span>
      <AiOutlineFire size={size || '3rem'} onClick={isShowToggleHandler} />
    </StyleEmployBadge>
  );
}
