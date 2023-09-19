import React, { useEffect, useState } from 'react';
import useNav from '../../hooks/useNav';
import { StyleBottomButton } from '../common/Buttons';
import { styled } from 'styled-components';
import SearchBox from './SearchBox';
import Inner from '../common/Inner';
import LoginActions from './LoginActions';
import UnLoginActions from './UnLoginActions';
import { useSelector } from 'react-redux';
import { mobile, custom } from '../../static/theme.js';
import { BiMenu } from 'react-icons/bi';
import { HiX } from 'react-icons/hi';

const StyleHeader = styled.header`
  transition: 0.6s;
  z-index: 10;
  margin-top: 25px;
  position: relative;
  height: ${(props) => (props.$isSpread ? 'auto' : '45px')};
  .inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 3rem;
    position: relative;
    ${mobile} {
      gap: 0;
    }
    ${custom(900)} {
      .page-actions,
      .user-actions,
      .desk-search {
        display: none;
      }
      .spread-btn {
        display: block;
      }
    }
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
  }
  .spread-btn {
    padding: 0;
    display: none;
  }
  .spread-content {
    width: var(--inner);
    margin: var(--center);
    margin-top: 20px;
    .spread-buttons {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding-bottom: 10px;
    }
  }
`;

export default function Header() {
  const { toAbout, toPortfolio, toProject, toSignin, toSignup } = useNav();
  const [isSpread, setIsSpread] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth >= 900 && isSpread) {
        setIsSpread(false);
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSpread]);

  const spreadCloser = (callback) => {
    callback();
    setIsSpread(false);
  };

  return (
    <StyleHeader id="header" $isSpread={isSpread}>
      <Inner>
        <h1 onClick={toAbout}>SPEC</h1>
        <nav className="page-actions">
          <StyleBottomButton $font-size="1px" onClick={toProject}>
            프로젝트
          </StyleBottomButton>
          <StyleBottomButton onClick={toPortfolio}>포트폴리오</StyleBottomButton>
        </nav>
        <SearchBox className="desk-search" />
        <nav className="user-actions">
          {user.isLogin ? <LoginActions userInfo={user?.userInfo} /> : <UnLoginActions />}
        </nav>
        <button className="spread-btn" onClick={() => setIsSpread((pre) => !pre)}>
          {isSpread ? <HiX size={30} /> : <BiMenu size={33} />}
        </button>
      </Inner>

      {isSpread && (
        <div className="spread-content">
          <div className="spread-buttons">
            {' '}
            <button className="spread-content-btn" onClick={() => spreadCloser(toProject)}>
              프로젝트
            </button>
            <button className="spread-content-btn" onClick={() => spreadCloser(toPortfolio)}>
              포트폴리오
            </button>
            {user.isLogin ? (
              <LoginActions userInfo={user?.userInfo} />
            ) : (
              <>
                <button className="spread-content-btn" onClick={() => spreadCloser(toSignin)}>
                  로그인
                </button>
                <button className="spread-content-btn" onClick={() => spreadCloser(toSignup)}>
                  회원가입
                </button>
              </>
            )}
          </div>
          <SearchBox className="tablet-search" callback={() => setIsSpread(false)} />
        </div>
      )}
    </StyleHeader>
  );
}
