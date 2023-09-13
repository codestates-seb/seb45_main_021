import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import useNav from '../hooks/useNav';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import Input from '../components/common/Input';
import api from '../hooks/useAxiosInterceptor';
import Page from '../components/common/Page';
import { isValidEmail, isValidPassword } from '../components/profile/isValid';
import { deleteUser } from '../redux/userForm/userSlice';
import { useDispatch } from 'react-redux';
import Spinner from '../components/common/Spinner';
import { desktop, mobile } from '../static/theme';

const StyleContainer = styled(Page)`
  width: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-size: 2rem;
  scale: 1;
  ${desktop} {
    scale: 1;
  }
  @media (max-width: 800px) {
    scale: 0.8;
  }
  ${mobile} {
    scale: 0.8;
  }
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
    ${desktop} {
      margin-bottom: 5rem;
    }
    @media (max-width: 800px) {
      margin-bottom: 3rem;
    }
    ${mobile} {
      margin-bottom: 3rem;
    }
  }
  .logo {
    margin-right: 20px;
  }
  .formGap {
    gap: 1rem;
  }
  .error {
    font-size: 1.3rem;
  }
  .colgap {
    gap: 2rem;
  }
`;

const StyleRowContainer = styled.div`
  justify-content: center;
  width: 100%;
  gap: 6rem;
  display: flex;
  flex-direction: row;
  ${desktop} {
    flex-direction: row;
  }
  @media (max-width: 800px) {
    flex-direction: column;
    gap: 4rem;
  }
  ${mobile} {
    flex-direction: column;
    gap: 4rem;
  }
`;

const StyleColContainer = styled.div`
  align-items: center;
  justify-content: center;
`;

const StyleBtnContainer = styled.button`
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
    ${desktop} {
      top: 0;
    }
    @media (max-width: 800px) {
      left: 0;
      width: 40%;
      border-bottom: 1px solid var(--black-500);
    }
    ${mobile} {
      left: 0;
      width: 40%;
      border-bottom: 1px solid var(--black-500);
    }
  }

  &::after {
    content: '';
    border-left: 1px solid var(--black-500);
    position: absolute;
    height: 40%;
    bottom: 0;
    ${desktop} {
      bottom: 0;
    }
    @media (max-width: 800px) {
      right: 0;
      width: 40%;
      border-bottom: 1px solid var(--black-500);
    }
    ${mobile} {
      right: 0;
      width: 40%;
      border-bottom: 1px solid var(--black-500);
    }
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

export default function SignUp() {
  const [userName, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ userName: '', email: '', password: '' });
  const [isSubmit, setIsSubmit] = useState(false);
  const { toSignin } = useNav();
  const dispatch = useDispatch();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const isvalidEmail = isValidEmail(email);
    const isvalidPassword = isValidPassword(password);
    setIsSubmit(true);
    if (isvalidEmail && isvalidPassword) {
      const data = JSON.stringify({ userName, email, password });
      console.log('회원가입 요청');
      api
        .post('/members/signup', data)
        .then(() => {
          toSignin();
        })
        .catch((error) => {
          if (error.response.status === 409) {
            setError({ ...error, email: '이미 존재하는 이메일 입니다.' });
          }
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
    setIsSubmit(false);
  };

  const handleClickGoogleBtn = () => {
    try {
      // api.post('/oauth2/authorization/google');
      // window.location.assign(
      //   'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=15196070608-ti8mt0m3fo8tj48172bhq72h4re8bcni.apps.googleusercontent.com&scope=email%20profile&state=J8xE05niEcAJo0CAB8XkqVr25Prh7dXvkrqthZ2YJw0%3D&redirect_uri=http://localhost:3000/signup',
      // );
      // window.location.assign(
      //   'https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=15196070608-ti8mt0m3fo8tj48172bhq72h4re8bcni.apps.googleusercontent.com&scope=email%20profile&state=J8xE05niEcAJo0CAB8XkqVr25Prh7dXvkrqthZ2YJw0%3D&redirect_uri=http://ec2-52-78-224-100.ap-northeast-2.compute.amazonaws.com:8080/login/oauth2/code/google',
      // );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // 마운트 함수
    dispatch(deleteUser());
  }, []);

  return (
    <>
      {isSubmit ? (
        <Spinner />
      ) : (
        <StyleContainer>
          <h3>회원가입</h3>
          <div className="row gap bottom">
            <span>이미 회원이신가요 ?</span>
            <p onClick={toSignin}>&nbsp;로그인</p>
          </div>
          <StyleRowContainer>
            <StyleColContainer className="col colgap">
              <StyleBtnContainer onClick={handleClickGoogleBtn}>
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
            <StyleColContainer>
              <form className="formGap col" onSubmit={handleSubmitForm}>
                <Input
                  label={'이름'}
                  placeholder="이름을 입력해주세요"
                  width="40rem"
                  height="56.22px"
                  fontSize="2rem"
                  type="text"
                  value={userName}
                  onChange={handleChangeName}
                  error={error.userName}
                />
                <Input
                  label={'이메일'}
                  placeholder="userName@example.com"
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
                <StyleBtnContainer type="submit" onClick={handleSubmitForm}>
                  <span>회원가입</span>
                </StyleBtnContainer>
              </form>
            </StyleColContainer>
          </StyleRowContainer>
        </StyleContainer>
      )}
    </>
  );
}
