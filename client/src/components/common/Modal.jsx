import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StyleBorderButton } from './Buttons';

// 사용법
// const [isOn, setIsOn] = useState(false);
// const handleModal = (e) => {
//   setIsOn((prev) => !prev);
// };
// {isOn && <Modal setIsOn={handleModal} type="confirm" title="알림" message="앙 찬섭띠" />}
// <button onClick={handleModal}>123123</button>

const Container = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0000006c;
  backdrop-filter: blur(4px);
  .gap {
    gap: 2rem;
  }
  .Wrapper {
    background-color: black;
    border: 1px solid white;
    width: 50%;
    border-radius: 10px;
    padding: 2rem;
    gap: 10rem;
    position: relative;
    svg {
      position: absolute;
      width: fit-content;
      height: fit-content;
      top: 1rem;
      right: 1rem;
      cursor: pointer;
    }
    h2 {
      font-size: 5rem;
      color: var(--black-100);
    }
    span {
      font-size: 2rem;
    }
    button {
      display: flex;
      justify-content: center;
      width: 20rem;
      height: 50px;
      border-color: green;
      color: green;
    }
    .yes {
      border-color: var(--error);
      color: var(--error);
    }
    .no {
      border-color: green;
      color: green;
    }
    .button-wrapper {
      width: 100%;
      align-items: center;
      justify-content: center;
    }
  }
`;
/**
 *
 * @param setIsOn - useState 세터 함수 그대로 전달
 * @param type - type=alert or confirm
 * @param title - 타이틀 문자열 전달
 * @param message - 내용 문자열 전달
 * @param checkHandler - 예 버튼 누를시 전달될 함수
 * @param cancelHandler - type=confirm 일때 아니오 버튼 누를시 전달될 함수
 * @returns {JSX.Element}
 */
export default function Modal({ setIsOn, type, title, message, checkHandler, cancelHandler }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <Container>
      <div className="Wrapper col">
        <h2 className="title">{title}</h2>
        <span className="message">{message}</span>
        <div className="row gap button-wrapper">
          {type === 'alert' && (
            <StyleBorderButton
              onClick={() => {
                if (checkHandler) checkHandler();
                setIsOn();
              }}
            >
              확인
            </StyleBorderButton>
          )}
          {type === 'confirm' && (
            <>
              <StyleBorderButton
                className="yes"
                onClick={() => {
                  if (checkHandler) checkHandler();
                  setIsOn();
                }}
              >
                예
              </StyleBorderButton>
              <StyleBorderButton
                className="no"
                onClick={() => {
                  if (cancelHandler) cancelHandler();
                  setIsOn();
                }}
              >
                취소
              </StyleBorderButton>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
