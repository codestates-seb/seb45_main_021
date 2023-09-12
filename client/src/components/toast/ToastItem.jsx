import React from 'react';
import { styled } from 'styled-components';
import { IoIosClose } from 'react-icons/io';
import { GoIssueClosed, GoInfo } from 'react-icons/go';
import { AiFillWarning, AiOutlineWarning } from 'react-icons/ai';

const Container = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-family: var(--nanum);
`;

const MessageWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: ${(props) =>
    props.$type === 'info'
      ? '#6060de'
      : props.$type === 'success'
      ? '#55b555'
      : props.$type === 'warning'
      ? '#dfdf4bcb'
      : props.$type === 'error'
      ? 'var(--error)'
      : null};
  border-radius: 5px;
  gap: 1rem;
  align-items: center;
  min-height: 5rem;
  p {
    font-family: var(--nanum);
    font-size: 2rem;
    min-width: 20rem;
    word-wrap: break-word;
    text-shadow: 2px 2px 2px gray;
  }
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }
  animation: slideInRight 0.5s ease-in-out;
`;

const ProgressBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  height: 5px;
  background-color: #dedede;
  animation: progressBar 3s linear;
  border-radius: 5px;
  @keyframes progressBar {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`;

export default function ToastItem({ messages, closeMessage }) {
  return (
    <Container>
      {messages.map((el) => (
        <MessageWrapper key={el.id} $type={el.type}>
          {el.type === 'info' && <GoInfo size={30} />}
          {el.type === 'success' && <GoIssueClosed size={30} />}
          {el.type === 'warning' && <AiOutlineWarning size={30} />}
          {el.type === 'error' && <AiFillWarning size={30} />}
          <p>{el.message}</p>
          <IoIosClose size={30} style={{ cursor: 'pointer' }} onClick={() => closeMessage(el.id)} />
          <ProgressBar />
        </MessageWrapper>
      ))}
    </Container>
  );
}
