import React from 'react';
import Input from '../common/Input';
import { styled } from 'styled-components';
import ProGress from '../common/ProGress';

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
            placeholder="영어,숫자,특수기호 포함 8글자 이상 20글자 이하"
            fontSize="1.5rem"
            width="100%"
            height="4rem"
            maxLength={20}
            value={editPassword.prevPassword.value}
            error={editPassword.prevPassword.error}
            onChange={(e) => setEditPassword({ ...editPassword, prevPassword: e.target.value })}
          />
          <ProGress
            comPleteNum={8}
            proGressNum={editPassword.prevPassword.value?.length}
            fontSize="1.5rem"
          />
          <Input
            type="password"
            autoComplete="off"
            label="새로운 비밀번호"
            placeholder="영어,숫자,특수기호 포함 8글자 이상 20글자 이하"
            fontSize="1.5rem"
            width="100%"
            height="4rem"
            maxLength={20}
            value={editPassword.newPassword.value}
            error={editPassword.newPassword.error}
            onChange={(e) => setEditPassword({ ...editPassword, newPassword: e.target.value })}
          />
          <ProGress
            comPleteNum={8}
            proGressNum={editPassword.newPassword.value?.length}
            fontSize="1.5rem"
          />
          <Input
            type="password"
            autoComplete="off"
            label="새로운 비밀번호 재확인"
            placeholder="영어,숫자,특수기호 포함 8글자 이상 20글자 이하"
            fontSize="1.5rem"
            width="100%"
            height="4rem"
            maxLength={20}
            value={editPassword.newPasswordCheck.value}
            error={editPassword.newPasswordCheck.error}
            onChange={(e) => setEditPassword({ ...editPassword, newPasswordCheck: e.target.value })}
          />
          <ProGress
            comPleteNum={8}
            proGressNum={editPassword.newPasswordCheck.value?.length}
            fontSize="1.5rem"
          />
        </form>
      </Container>
    </>
  );
}
