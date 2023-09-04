import React from 'react';
import useNav from '../../hooks/useNav';
import { StyleBorderButton, StyleBottomButton } from '../common/Buttons';
import { styled } from 'styled-components';
import SearchInput from './SearchInput';
import Inner from '../common/Inner';
const StyleHeader = styled.header`
  padding: 10px 0;
  z-index: 10;
  position: fixed;
  top: 0;
  width: 100%;
  transition: 0.6s;
  backdrop-filter: blur(5px);
  .inner {
    display: flex;
    align-items: center;
    gap: 3rem;
  }
  h1 {
    font-family: var(--monoton);
    font-size: 3.5rem;
    cursor: pointer;
  }
  nav button {
    height: 35px;
  }
  .page-actions {
    display: flex;
    gap: 20px;
  }
  .user-actions {
    display: flex;

    gap: 10px;
    button {
      padding: 0 15px;
    }
  }
`;

export default function Header() {
  const { toAbout, toPortfolio, toProject, toSignin, toSignup } = useNav();

  return (
    <StyleHeader id="header">
      <Inner>
        <h1 onClick={toAbout}>SPEC</h1>
        <nav className="page-actions">
          <StyleBottomButton onClick={toProject}>프로젝트</StyleBottomButton>
          <StyleBottomButton onClick={toPortfolio}>포트폴리오</StyleBottomButton>
        </nav>
        <SearchInput />
        <nav className="user-actions">
          <StyleBorderButton onClick={toSignin}>로그인</StyleBorderButton>
          <StyleBorderButton onClick={toSignup}>회원가입</StyleBorderButton>
        </nav>
      </Inner>
    </StyleHeader>
  );
}
