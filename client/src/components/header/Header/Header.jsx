import React from 'react';
import styles from './Header.module.css';
import classNames from 'classnames/bind';
import useNav from '../../../hooks/useNav';
import { BorderButton, BottomButton } from '../../common/Button/Buttons';
const cx = classNames.bind(styles);

export default function Header() {
  const { toAbout, toPortfolio, toProject, toSignin, toSignup } = useNav();
  return (
    <header className={cx('Header')}>
      <h1 onClick={toAbout}>SPEC</h1>
      <nav className={cx('navigate')}>
        <BottomButton onClick={toProject}>프로젝트</BottomButton>
        <BottomButton onClick={toPortfolio}>포트폴리오</BottomButton>
      </nav>
      <div className={cx('actions')}>
        <BorderButton onClick={toSignin}>로그인</BorderButton>
        <BorderButton onClick={toSignup}>회원가입</BorderButton>
      </div>
    </header>
  );
}
