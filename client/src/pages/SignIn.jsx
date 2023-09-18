import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import useNav from '../hooks/useNav';
import { FcGoogle } from 'react-icons/fc';
import Page from '../components/common/Page';
import { AiFillGithub } from 'react-icons/ai';
import Input from '../components/common/Input';
import api from '../hooks/useAxiosInterceptor';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../redux/userForm/userSlice';
import { isValidEmail, isValidPassword } from '../components/profile/isValid';
import Spinner from '../components/common/Spinner';
import { desktop, mobile } from '../static/theme';

const StyleContainer = styled(Page)`
  display: flex;
  width: fit-content;
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
    ${desktop} {
      margin-bottom: 5rem;
    }
    @media (max-width: 900px) {
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
    display: flex;
    flex-direction: column;
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
  display: flex;
  ${desktop} {
    flex-direction: row;
  }
  @media (max-width: 900px) {
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
  font-size: 2rem;
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
    @media (max-width: 900px) {
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
    @media (max-width: 900px) {
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
    ${desktop} {
      top: 0;
      bottom: 0;
    }
    @media (max-width: 900px) {
      left: 0;
      right: 0;
    }
    ${mobile} {
      left: 0;
      right: 0;
    }
  }
`;

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({ email: '', password: '' });
  const [isSubmit, setIsSubmit] = useState(false);
  const { toSignup, toAbout } = useNav();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const isvalidEmail = isValidEmail(email);
    const isvalidPassword = isValidPassword(password);
    setIsSubmit(true);
    if (isvalidEmail && isvalidPassword) {
      setError({ email: '', password: '' });
      api
        .post('/members/login', { email, password })
        .then((el) => {
          dispatch(
            updateUser({
              isLogin: true,
              userInfo: {
                memberId: el.data.memberId,
                userName: el.data.userName,
                userImgUrl: el.data.userImgUrl,
                socialType: el.data.socialType,
              },
              likeList: {
                portfolioList: el.data.portfolioList,
                projectList: el.data.projectList,
              },
            }),
          );
          toAbout();
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setError({ ...error, password: '비밀번호가 유효하지 않습니다.' });
          }
          if (error.response.status === 404) {
            setError({ ...error, email: '이메일이 유효하지 않습니다.' });
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
    window.location.assign(
      `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=15196070608-ti8mt0m3fo8tj48172bhq72h4re8bcni.apps.googleusercontent.com&scope=email%20profile&state=J8xE05niEcAJo0CAB8XkqVr25Prh7dXvkrqthZ2YJw0%3D&redirect_uri=https://spec.today/signin`,
    );
  };

  const handleClickGithubBtn = () => {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=b7cd8d79c75bb40d352a',
    );
  };

  useEffect(() => {
    // 마운트 함수
    if (isLogin) toAbout();
    const url = new URL(window.location.href);
    const state = url.searchParams.get('state');
    const authorizationCode = url.searchParams.get('code');
    if (authorizationCode) {
      if (state) {
        api
          .get(`/oauth2/google/signin?code=${authorizationCode}`)
          .then((el) => {
            if (el.status === 200) {
              dispatch(
                updateUser({
                  isLogin: true,
                  userInfo: {
                    memberId: el.data.memberId,
                    userName: el.data.userName,
                    userImgUrl: el.data.userImgUrl,
                    socialType: el.data.socialType,
                  },
                  likeList: {
                    portfolioList: el.data.portfolioList,
                    projectList: el.data.projectList,
                  },
                }),
              );
              toAbout();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        api
          .get(`/oauth2/github?code=${authorizationCode}`)
          .then((el) => {
            if (el.status === 200) {
              dispatch(
                updateUser({
                  isLogin: true,
                  userInfo: {
                    memberId: el.data.memberId,
                    userName: el.data.userName,
                    userImgUrl: el.data.userImgUrl,
                    socialType: el.data.socialType,
                  },
                  likeList: {
                    portfolioList: el.data.portfolioList,
                    projectList: el.data.projectList,
                  },
                }),
              );
              toAbout();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isSubmit ? (
        <Spinner />
      ) : (
        <StyleContainer>
          <h3>로그인</h3>
          <div className="row gap bottom">
            <span>회원가입이 필요하신가요 ?</span>
            <p onClick={toSignup}>&nbsp;회원가입</p>
          </div>
          <StyleRowContainer>
            <StyleColContainer className="col colgap">
              <StyleBtnContainer onClick={handleClickGoogleBtn}>
                <FcGoogle className="logo" size={30} />
                Google 로그인
              </StyleBtnContainer>
              <StyleBtnContainer onClick={handleClickGithubBtn}>
                <AiFillGithub className="logo" size={30} />
                Github 로그인
              </StyleBtnContainer>
            </StyleColContainer>
            <div>
              <StyleDivider>
                <span>OR</span>
              </StyleDivider>
            </div>
            <StyleColContainer className="col gap">
              <form className="formGap" onSubmit={handleSubmitForm}>
                <Input
                  label={'이메일'}
                  placeholder="name@example.com"
                  width="40rem"
                  height="56.22px"
                  borderRadius="10px"
                  fontSize="2rem"
                  type="text"
                  value={email}
                  onChange={handleChangeEmail}
                  autoComplete="on"
                  error={error.email}
                />
                <Input
                  label={'비밀번호'}
                  placeholder="영어,숫자,특수기호 포함 8글자 이상"
                  type="password"
                  width="40rem"
                  height="56.22px"
                  borderRadius="10px"
                  maxLength={20}
                  fontSize="2rem"
                  autoComplete="off"
                  value={password}
                  onChange={handleChangePassword}
                  error={error.password}
                />
                <StyleBtnContainer onClick={handleSubmitForm}>로그인</StyleBtnContainer>
              </form>
            </StyleColContainer>
          </StyleRowContainer>
        </StyleContainer>
      )}
    </>
  );
}
