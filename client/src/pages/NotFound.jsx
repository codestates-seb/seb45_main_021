import React, { useState } from 'react';
import { styled } from 'styled-components';
import Page from '../components/common/Page';
import { StyleBorderButton } from '../components/common/Buttons';
import Modal from '../components/common/Modal';

const Container = styled(Page)`
  display: flex;
  flex-direction: column;
  width: var(--inner);
  justify-content: center;
  align-items: center;
  height: auto;
  gap: 3rem;
  margin-top: 6rem;
  /* background-color: #00000030; */
  font-family: var(--nanum-normal);
  font-weight: 600;
  h2 {
    font-size: 7rem;
    letter-spacing: 1rem;
    color: var(--error);
    font-family: var(--barlow);
  }
  span {
    font-size: 3rem;
  }
  button {
    align-items: center;
    width: fit-content;
    padding: 1rem 4rem;
    font-size: 3rem;
    font-family: var(--barlow);
    transition: all 1s;
  }
`;

export default function NotFound() {
  return (
    <Container>
      <h2>404</h2>
      <span>죄송합니다.</span>
      <span>요청하신 페이지를 찾을 수 없습니다.</span>
      <a href="/">
        <StyleBorderButton>Home</StyleBorderButton>
      </a>
    </Container>
  );
}
