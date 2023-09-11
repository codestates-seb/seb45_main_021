import React from 'react';
import Input from '../common/Input';
import { styled } from 'styled-components';

const Container = styled.div`
  h3 {
    font-weight: 700;
    font-size: 1.8rem;
    padding-bottom: 22px;
  }
`;

export default function EditPassword({ editPassword, setEditPassword }) {
  return (
    <>
      <Container className="col gap">
        <h3>비밀번호 변경</h3>
        <form className="col gap">
          <Input
            type="password"
            autoComplete="off"
            label="현재 비밀번호"
            placeholder="영어,숫자,특수기호 포함 8글자 이상"
            fontSize="1.5rem"
            width="100%"
            height="4rem"
            value={editPassword.prevPassword.value}
            error={editPassword.prevPassword.error}
            onChange={(e) => setEditPassword({ ...editPassword, prevPassword: e.target.value })}
          />
          <Input
            type="password"
            autoComplete="off"
            label="새로운 비밀번호"
            placeholder="영어,숫자,특수기호 포함 8글자 이상"
            fontSize="1.5rem"
            width="100%"
            height="4rem"
            value={editPassword.newPassword.value}
            error={editPassword.newPassword.error}
            onChange={(e) => setEditPassword({ ...editPassword, newPassword: e.target.value })}
          />
          <Input
            type="password"
            autoComplete="off"
            label="새로운 비밀번호 재확인"
            placeholder="영어,숫자,특수기호 포함 8글자 이상"
            fontSize="1.5rem"
            width="100%"
            height="4rem"
            value={editPassword.newPassword2.value}
            error={editPassword.newPassword2.error}
            onChange={(e) => setEditPassword({ ...editPassword, newPasswordCheck: e.target.value })}
          />
        </form>
      </Container>
    </>
  );
}
