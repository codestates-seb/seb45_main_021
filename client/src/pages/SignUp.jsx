import React, { useState } from 'react';
import { styled } from 'styled-components';
import useNav from '../hooks/useNav';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { IoIosMail } from 'react-icons/io';
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
  .gap {
    gap: 1rem;
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
`;

const StyleBtnContainer = styled.div`
  width: 300px;
  border: 1px solid var(--black-300);
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  padding: 1.2rem 0;
  padding-left: 50px;
  border-radius: 10px;
  font-weight: 700;
  &:hover {
    background-color: #ffffff12;
  }
`;

const StyleDivider = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--black-500);
  position: relative;
  width: 300px;
  margin: 2rem 0;
  span {
    background-color: var(--backgroundColor);
    color: var(--black-500);
    position: absolute;
    display: flex;
    justify-content: center;
    margin: 0 auto;
    width: fit-content;
    padding: 0 10px;
    left: 0;
    right: 0;
  }
`;

export default function SignUp() {
  const { toSignin } = useNav();
  const [step, setStep] = useState(1);
  return (
    <StyleContainer>
      <h3>회원가입</h3>
      <div className="row gap bottom">
        <span>이미 회원이신가요 ?</span>
        <p onClick={toSignin}>로그인</p>
      </div>
      {step === 1 && (
        <>
          <StyleBtnContainer>
            <FcGoogle className="logo" size={30} />
            <span>Google 회원가입</span>
          </StyleBtnContainer>
          <StyleBtnContainer>
            <AiFillGithub className="logo" size={30} />
            <span>Github 회원가입</span>
          </StyleBtnContainer>
          <StyleDivider>
            <span>OR</span>
          </StyleDivider>
          <StyleBtnContainer onClick={() => setStep(2)}>
            <IoIosMail className="logo" size={30} />
            <span>Email 회원가입</span>
          </StyleBtnContainer>
        </>
      )}
      {step === 2 && (
        <>
          <form className="formGap col">
            <Input
              label={'이름'}
              placeholder="성과 이름"
              width="300px"
              height="56.22px"
              fontSize="2rem"
            />
            <Input
              label={'이메일'}
              placeholder="name@example.com"
              width="300px"
              height="56.22px"
              fontSize="2rem"
              type="text"
            />
            <Input
              label={'비밀번호'}
              placeholder="비밀번호"
              width="300px"
              height="56.22px"
              fontSize="2rem"
              error="asdasd"
              autoComplete="off"
            />
          </form>
          <StyleDivider>
            <span>OR</span>
          </StyleDivider>
          <StyleBtnContainer>
            <FcGoogle className="logo" size={30} />
            <span>Google 회원가입</span>
          </StyleBtnContainer>
          <StyleBtnContainer>
            <AiFillGithub className="logo" size={30} />
            <span>Github 회원가입</span>
          </StyleBtnContainer>
        </>
      )}
    </StyleContainer>
  );
}
