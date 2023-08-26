import React from 'react';
import useNav from '../../hooks/useNav';
import { StyleBorderButton, StyleBottomButton } from '../common/Buttons';
import { styled } from 'styled-components';
import Inner from '../common/Inner';
const StyleHeader = styled.header`
  padding: 10px 0;
  z-index: 10;
  position: fixed;
  top: 0;
  width: 100%;
  transition: 0.6s;
  .inner {
    display: flex;
  }
  h1 {
    font-family: var(--monoton);
    font-size: 3.5rem;
    cursor: pointer;
  }
  nav {
    padding-left: 20px;
    flex: 1;
    display: flex;
    gap: 20px;
  }
  div {
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
        <nav>
          <StyleBottomButton onClick={toProject}>프로젝트</StyleBottomButton>
          <StyleBottomButton onClick={toPortfolio}>포트폴리오</StyleBottomButton>
        </nav>
        <div className="row">
          <StyleBorderButton onClick={toSignin}>로그인</StyleBorderButton>
          <StyleBorderButton onClick={toSignup}>회원가입</StyleBorderButton>
        </div>
      </Inner>
    </StyleHeader>
  );
}
