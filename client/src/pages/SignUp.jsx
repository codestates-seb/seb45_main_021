import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import useNav from '../hooks/useNav';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Input from '../components/common/Input';

const StyleContainer = styled.div`
  border: 1px solid white;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-size: 2rem;
  h3 {
    font-size: 5rem;
    font-weight: 700;
  }
  span {
    font-size: 2rem;
    text-align: center;
  }
  p {
    color: #2f87fe;
    font-weight: 700;
    text-align: center;
    cursor: pointer;
  }
  .bottom {
    margin-bottom: 5rem;
  }
  .logo {
    margin-right: 20px;
  }
  .formGap {
    gap: 2rem;
  }
  .error {
    font-size: 1.3rem;
  }
  .colgap {
    gap: 3rem;
  }
`;

const StyleRowContainer = styled.div`
  justify-content: center;
  width: 100%;
  gap: 6rem;
`;

const StyleColContainer = styled.div`
  align-items: center;
  justify-content: center;
`;

const StyleBtnContainer = styled.div`
  width: 400px;
  border: 1px solid var(--black-300);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  padding: 1.2rem 0;
  border-radius: 10px;
  font-weight: 700;
  &:hover {
    background-color: #ffffff12;
  }
`;

const StyleDivider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid var(--black-500);
  position: relative;
  height: 100%;
  /* margin: 2rem 0; */
  span {
    background-color: var(--backgroundColor);
    color: var(--black-500);
    position: absolute;
    margin: auto;
    height: fit-content;
    padding: 10px 0;
    top: 0;
    bottom: 0;
  }
`;

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ name: '', email: '', password: '' });
  const { toSignin } = useNav();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmitForm = () => {
    setError({ name: '', email: '', password: '' });
  };

  useEffect(() => {
    // 마운트 함수
  }, []);

  return (
    <StyleContainer>
      <h3>회원가입</h3>
      <div className="row gap bottom">
        <span>이미 회원이신가요 ?</span>
        <p onClick={toSignin}>로그인</p>
      </div>
      <StyleRowContainer className="row">
        <StyleColContainer className="col colgap">
          <StyleBtnContainer>
            <FcGoogle className="logo" size={30} />
            <span>Google 회원가입</span>
          </StyleBtnContainer>
          <StyleBtnContainer>
            <AiFillGithub className="logo" size={30} />
            <span>Github 회원가입</span>
          </StyleBtnContainer>
        </StyleColContainer>
        <div>
          <StyleDivider>
            <span>OR</span>
          </StyleDivider>
        </div>
        <div>
          <form className="formGap col">
            <Input
              label={'이름'}
              placeholder="최대 5글자"
              width="40rem"
              height="56.22px"
              fontSize="2rem"
              type="text"
              value={name}
              onChange={handleChangeName}
              error={error.name}
            />
            <Input
              label={'이메일'}
              placeholder="name@example.com"
              width="40rem"
              height="56.22px"
              fontSize="2rem"
              type="text"
              value={email}
              onChange={handleChangeEmail}
              error={error.email}
            />
            <Input
              label={'비밀번호'}
              placeholder="영어,숫자,특수기호 포함 8글자 이상"
              width="40rem"
              height="56.22px"
              fontSize="2rem"
              type="password"
              autoComplete="off"
              value={password}
              onChange={handleChangePassword}
              error={error.password}
            />
            <StyleBtnContainer onClick={handleSubmitForm}>
              <span>회원가입</span>
            </StyleBtnContainer>
          </form>
        </div>
      </StyleRowContainer>
    </StyleContainer>
  );
}
