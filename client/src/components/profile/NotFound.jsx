import React from 'react';
import { styled } from 'styled-components';
import { StyleBackgroundButton } from '../common/Buttons';
import useNav from '../../hooks/useNav';

const StyleNotFound = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto auto;
  h2 {
    font-size: 15rem;
    margin-bottom: 50px;
    font-weight: bold;
    color: var(--backgroundColor);
    text-shadow: 0px 0px 10px var(--black-300);
  }
  span {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 30px;
    font-weight: var(--nanum-semi-bold);
    color: var(--black-300);
  }
  button {
    padding: 10px 25px;
  }
`;

export default function NotFound() {
  const { toAbout } = useNav();
  return (
    <StyleNotFound>
      <h2>404</h2>
      <span>요청하신 유저가 존재하지 않습니다.</span>
      <StyleBackgroundButton onClick={toAbout}>홈으로</StyleBackgroundButton>
    </StyleNotFound>
  );
}
