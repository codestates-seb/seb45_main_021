import { styled } from 'styled-components';
import Section from '../common/Section';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState } from 'react';
import video from '../../static/videos/first.mp4';
import { MdKeyboardDoubleArrowDown } from 'react-icons/md';
import { BsMouse } from 'react-icons/bs';

const StyleAboutFirst = styled(Section)`
  .site-info {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80rem;
    height: 18rem;
    align-items: center;
  }
  h3 {
    transform: ${(props) => `translateY(${props.$active ? '0' : '-100%'})`};
    opacity: ${(props) => (props.$active ? '1' : '0')};
    transition: 0.6s;
    font-size: 10rem;
    font-family: var(--monoton);
  }
  p {
    padding-top: 3rem;
    line-height: 1.5;
    font-size: 1.8rem;
    font-weight: var(--nanum-semi-bold);
    text-align: center;
    text-shadow: 2px 2px 2px var(--black-800);
  }
  .filter {
    background-color: #00000064;
  }
  .scroll-info {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    left: 0;
    bottom: 3rem;
    right: 0;
  }
  .mouse {
    animation: mouseUi 1s ease-in-out infinite alternate;
  }
  @keyframes mouseUi {
    0%,
    100% {
      opacity: 0;
      margin-bottom: 3rem;
    }
    100% {
      opacity: 1;
      margin-bottom: 1rem;
    }
  }
  .arrow-down {
    color: var(--black-400);
    margin-bottom: 2rem;
  }
`;

export default function AboutFirst({ activePage }) {
  const [active, setActive] = useState();

  useEffect(() => {
    if (activePage === 0) setTimeout(() => setActive(true), 0);
  }, []);

  useEffect(() => {
    if (activePage === 0) setTimeout(() => setActive(true), 500);
    return () => setTimeout(() => setActive(false), 500);
  }, [activePage]);

  return (
    <StyleAboutFirst $active={active ? true : false}>
      <VideoPlayer src={video} />
      <div className="site-info col">
        <h3>SPEC</h3>
        <p>
          S/P/E/C 는 프로젝트 협업과, 개인의 포트폴리오 작업, 다양한 경험 <br />
          그리고 소중한 만남을 모아둔 공간입니다 .
        </p>
      </div>
      <div className="scroll-info">
        <BsMouse size={35} className="mouse" />
        <MdKeyboardDoubleArrowDown className="arrow-down" size={25} />
      </div>
    </StyleAboutFirst>
  );
}
