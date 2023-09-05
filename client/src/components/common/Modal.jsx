import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { StyleBorderButton } from './Buttons';

// 사용법
// const [isOn, setIsOn] = useState(false);
// const handleModal = (e) => {
//   e.stopPropagation();
//   setIsOn((prev) => !prev);
// };
// {isOn && <Modal setIsOn={setIsOn} type="confirm" title="알림" message="앙 찬섭띠" />}
// <button onClick={handleModal}>123123</button>

const Container = styled.div`
  position: absolute;
  margin: auto auto;
  z-index: 10;
  width: 50%;
  height: fit-content;
  background-color: #000000b0;
  border-radius: 20px;
  backdrop-filter: blur(4px);
  border: 1px solid white;
  .gap {
    gap: 2rem;
  }
  .Wrapper {
    width: 100%;
    height: 100%;
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
 * @param onClickHandler - type=alert 일떄 확인 버튼 누를시 전달될 함수
 * @param trueHandler - type=confirm 일때 예 버튼 누를시 전달될 함수
 * @param falseHandler - type=confirm 일때 아니오 버튼 누를시 전달될 함수
 * @description 최상단에서 불러주세요 포지션 앱솔루트 부모기준입니다.
 * @returns {JSX.Element}
 */
export default function Modal({
  setIsOn,
  type,
  title,
  message,
  onClickHandler,
  trueHandler,
  falseHandler,
}) {
  const Ref = useRef(null);
  const handler = (e) => {
    e.stopPropagation();
    if (!Ref.current.contains(e.target)) {
      setIsOn(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  if (type === 'alert') {
    return (
      <Container ref={Ref}>
        <div className="Wrapper col">
          <IoIosClose size="50" color="var(--black-100)" onClick={() => setIsOn(false)} />
          <h2 className="title">{title}</h2>
          <span className="message">{message}</span>
          <div className="row button-wrapper">
            <StyleBorderButton onClick={onClickHandler}>확인</StyleBorderButton>
          </div>
        </div>
      </Container>
    );
  }
  if (type === 'confirm') {
    return (
      <Container ref={Ref}>
        <div className="Wrapper col">
          <IoIosClose size="50" color="var(--black-100)" onClick={() => setIsOn(false)} />
          <h2 className="title">{title}</h2>
          <span className="message">{message}</span>
          <div className="row gap button-wrapper">
            <StyleBorderButton
              className="yes"
              onClick={() => {
                handler();
                trueHandler();
              }}
            >
              예
            </StyleBorderButton>
            <StyleBorderButton
              className="no"
              onClick={() => {
                handler();
                falseHandler();
              }}
            >
              취소
            </StyleBorderButton>
          </div>
        </div>
      </Container>
    );
  }
}
