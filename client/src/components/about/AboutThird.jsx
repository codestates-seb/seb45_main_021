import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import useNav from '../../hooks/useNav';
import VideoPlayer from './VideoPlayer';
import video from '../../static/videos/third.mp4';
import { StyleBorderButton } from '../common/Buttons';

const StyleAboutThird = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  perspective: 50rem;
  .rotation-box {
    width: 85rem;
    perspective-origin: center;
    display: flex;
    gap: 5rem;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
  }

  .info-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2rem;
  }

  .info-item:last-child {
    font-size: 4.5rem;
    letter-spacing: 0.5rem;
    gap: 3.5rem;
    font-family: var(--monoton);
  }

  button {
    border-radius: 3px;
    font-size: 1.8rem;
    padding: 2rem;
  }
  span:first-child {
    font-size: 5rem;
  }
`;

export default function AboutThird({ activePage }) {
  const { toPortfolio, toProject, toSignin, toSignup } = useNav();
  const [location, setLocation] = useState({ x: 0, y: 0 });
  const stringArr = ['SideProject', 'Portfolio', 'Experience', 'Connection'];

  const maxRotation = 2;
  useEffect(() => {
    if (activePage === 2) {
      const locationHandler = (e) => {
        const { clientX, clientY } = e;
        setLocation({ x: clientX, y: clientY });
      };
      window.addEventListener('mousemove', locationHandler);
      return () => window.removeEventListener('mousemove', locationHandler);
    }
  }, [activePage]);

  const rotationX = (location.y / window.innerHeight) * 2 * maxRotation - maxRotation;
  const rotationY = (location.x / window.innerWidth) * 2 * maxRotation - maxRotation;

  return (
    <StyleAboutThird>
      <VideoPlayer src={video} />
      <div
        className="rotation-box"
        style={{
          transform: `rotateX(${-rotationX}deg) rotateY(${rotationY}deg)`,
        }}
      >
        <div className="info-item">
          <StyleBorderButton onClick={toProject}>프로젝트 바로가기</StyleBorderButton>
          <StyleBorderButton onClick={toPortfolio}>포트폴리오 바로가기</StyleBorderButton>
          <StyleBorderButton onClick={toSignin}>로그인</StyleBorderButton>
          <StyleBorderButton onClick={toSignup}>회원가입</StyleBorderButton>
        </div>
        <div className="info-item col ">
          {stringArr.map((str, i) => (
            <div key={i}>
              <span>{str.slice(0, 1)}</span>
              {str.slice(1)}
            </div>
          ))}
        </div>
      </div>
    </StyleAboutThird>
  );
}