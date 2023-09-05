import React from 'react';
import useNav from '../../hooks/useNav';
import { StyleBottomButton } from '../common/Buttons';
import { styled } from 'styled-components';
import SearchInput from './SearchInput';
import Inner from '../common/Inner';
import LoginActions from './LoginActions';
import UnLoginActions from './UnLoginActions';
import { useSelector } from 'react-redux';

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
  button {
    height: 35px;
    padding: 0px 10px;
  }
  .page-actions {
    display: flex;
    gap: 20px;
  }
  .user-actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    img {
      cursor: pointer;
      margin-right: 5px;
      width: 35px;
      border: 1px solid var(--black-800);
    }
  }
`;

export default function Header() {
  const { toAbout, toPortfolio, toProject } = useNav();
  const { isLogin, userInfo } = useSelector((state) => state.user);
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
          {isLogin ? <LoginActions userInfo={userInfo} /> : <UnLoginActions />}
        </nav>
      </Inner>
    </StyleHeader>
  );
}
