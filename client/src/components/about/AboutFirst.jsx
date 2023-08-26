import { styled } from 'styled-components';
import Section from '../common/Section';
import VideoPlayer from './VideoPlayer';
import { useEffect, useState } from 'react';
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
`;

export default function AboutFirst({ activePage }) {
  const [active, setActive] = useState();

  useEffect(() => {
    if (activePage === 0) setTimeout(() => setActive(true), 0);
  }, [activePage]);

  return (
    <StyleAboutFirst $active={active ? true : false}>
      <VideoPlayer src="/videos/first.mp4" />
      <div className="site-info col">
        <h3>SPEC</h3>
        <p>
          S/P/E/C 는 프로젝트 협업과, 개인의 포트폴리오 작업, 다양한 경험 <br />
          그리고 소중한 만남을 모아둔 공간입니다.
        </p>
      </div>
    </StyleAboutFirst>
  );
}
