import React from 'react';
import { StyleBorderButton } from '../common/Buttons';
import useNav from '../../hooks/useNav';

export default function UnLoginActions() {
  const { toSignin, toSignup } = useNav();
  return (
    <>
      <StyleBorderButton onClick={toSignin}>로그인</StyleBorderButton>
      <StyleBorderButton onClick={toSignup}>회원가입</StyleBorderButton>
    </>
  );
}
