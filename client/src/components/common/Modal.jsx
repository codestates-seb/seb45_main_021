import React, { useEffect } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';
import { mobile } from '../../static/theme';
const StyleModal = styled.div`
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000007d;
  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-width: 500px;
    background-color: #323232;
    border-radius: 3px;
    ${mobile} {
      min-width: 200px;
      width: 95%;
    }
    font-weight: var(--nanum-semi-bold);
    animation: slideIn 0.3s ease;
    h4 {
      padding: 22px;
      font-size: 1.8rem;
    }
    p {
      font-size: 1.6rem;
      padding: 22px;
      color: var(--black-200);
      line-height: 10px;
    }
    .button-wrapper {
      display: flex;
      justify-content: end;
      margin-top: 15px;
      padding: 8px;
      button {
        border-radius: 5px;
        padding: 8px 15px;
        &:hover {
          background-color: var(--black-700);
        }
      }
    }
  }
  .children {
    padding: 2rem;
  }
  @keyframes slideIn {
    0% {
      transform: translateY(100%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

/**
 *
 * @param setIsOpen - setter 함수 그대로 전달
 * @param type - type=alert or confirm or children
 * @param title - 타이틀 문자열 전달 (alert,confirm)
 * @param body - 내용 문자열 전달 (alert,confirm)
 * @param children - 자식 요소 엘리먼트 렌더링 (children)
 * @param confirmHandler - 확인 버튼 클릭시 실행할 함수
 * @param cancelHandler - 취소 버튼 클릭시 실행할 함수
 * @returns {JSX.Element}
 */

export default function Modal({
  setIsOpen,
  type = 'confirm',
  title,
  body,
  confirmHandler,
  cancelHandler,
  children,
}) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const modalCloser = () => {
    if (type === 'confirm') setIsOpen(false);
  };

  const confirmOnClickHandler = () => {
    if (confirmHandler) {
      confirmHandler();
    }
    modalCloser(false);
  };

  const cancelOnClickHandler = () => {
    if (cancelHandler) cancelHandler();
    modalCloser(false);
  };

  return createPortal(
    <StyleModal onClick={modalCloser}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children ? (
          <div className="children">{children}</div>
        ) : (
          <>
            <h4>{title}</h4>
            <p>{body}</p>
          </>
        )}
        <div className="button-wrapper">
          <button onClick={confirmOnClickHandler}>확인</button>
          {type === 'confirm' && <button onClick={cancelOnClickHandler}>취소</button>}
        </div>
      </div>
    </StyleModal>,
    document.getElementById('modal'),
  );
}
