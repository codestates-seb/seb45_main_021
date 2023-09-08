import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import useNav from '../hooks/useNav';
import { FcGoogle } from 'react-icons/fc';
import Page from '../components/common/Page';
import { AiFillGithub } from 'react-icons/ai';
import Input from '../components/common/Input';
import api from '../hooks/useAxiosInterceptor';
import { useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/userForm/userSlice';
import { isValidEmail, isValidPassword } from '../components/profile/isValid';
import userDefaultImg from '../static/images/userDefaultImg.jpeg';

const StyleContainer = styled(Page)`
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
  width: 40rem;
  height: 56.22px;
  border: 1px solid var(--black-300);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  padding: 2rem 4rem;
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
  position: relative;
  height: 100%;

  &::before {
    content: '';
    border-left: 1px solid var(--black-500);
    position: absolute;
    height: 40%;
    top: 0;
  }

  &::after {
    content: '';
    border-left: 1px solid var(--black-500);
    position: absolute;
    height: 40%;
    bottom: 0;
  }

  span {
    background-color: transparent;
    color: var(--black-500);
    position: absolute;
    margin: auto;
    height: fit-content;
    padding: 10px 0;
    top: 0;
    bottom: 0;
  }
`;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const { toSignup } = useNav();
  const dispatch = useDispatch();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitForm = () => {
    try {
      const isvalidEmail = isValidEmail(email);
      const isvalidPassword = isValidPassword(password);
      if (isvalidEmail && isvalidPassword) {
        setError({ email: '', password: '' });
        api.post('/members/login', { email, password }).then((el) => {
          dispatch(
            updateUser({
              isLogin: true,
              userInfo: {
                memberId: el.data.memberId,
                userName: el.data.username,
                imgUrl: el.data.imgUrl,
                socialType: el.data.socialType,
              },
            }),
          );
        });
      } else if (!isvalidEmail && !isvalidPassword) {
        setError({
          email: '올바른 이메일 형식을 입력해주세요.',
          password: '영어,숫자,특수기호 포함 8글자 이상으로 입력해주세요.',
        });
      } else if (!isvalidEmail) {
        setError({ ...error, email: '올바른 이메일 형식을 입력해주세요.' });
      } else if (!isvalidPassword) {
        setError({ ...error, password: '영어,숫자,특수기호 포함 8글자 이상으로 입력해주세요.' });
      }
    } catch (error) {
      console.log(error);
      setError({ email: '다시 확인해주세요.', password: '다시 확인해주세요.' });
    }
  };

  useEffect(() => {
    // 마운트 함수
    dispatch(deleteUser());
  }, []);

  return (
    <StyleContainer>
      <h3>로그인</h3>
      <div className="row gap bottom">
        <span>회원가입이 필요하신가요 ?</span>
        <p onClick={toSignup}>&nbsp;회원가입</p>
      </div>
      <StyleRowContainer className="row">
        <StyleColContainer className="col colgap">
          <StyleBtnContainer>
            <FcGoogle className="logo" size={30} />
            <span>Google 로그인</span>
          </StyleBtnContainer>
          <StyleBtnContainer>
            <AiFillGithub className="logo" size={30} />
            <span>Github 로그인</span>
          </StyleBtnContainer>
        </StyleColContainer>
        <div>
          <StyleDivider>
            <span>OR</span>
          </StyleDivider>
        </div>
        <div>
          <form className="formGap col colgap">
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
              type="password"
              width="40rem"
              height="56.22px"
              fontSize="2rem"
              autoComplete="off"
              value={password}
              onChange={handleChangePassword}
              error={error.password}
            />
            <StyleBtnContainer onClick={handleSubmitForm}>
              <span>로그인</span>
            </StyleBtnContainer>
          </form>
        </div>
      </StyleRowContainer>
    </StyleContainer>
  );
}