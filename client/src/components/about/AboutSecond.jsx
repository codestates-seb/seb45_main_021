import Section from '../common/Section';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import img from '../../static/images/second.jpg';
import { useEffect, useState } from 'react';
import data from '../../static/portfolio.json';
import AboutPortfolioCard from './AboutPortfolioCard';
import StyleFilter from '../common/Filter';

const StyleAboutSecond = styled(Section)`
  background-image: url(${img});
  background-size: cover;
  .center {
    display: flex;
    gap: 1rem;
    width: var(--inner);
    height: 35rem;
  }
  .page-description {
    flex: 1;
    h3 {
      flex: 1;
      font-size: 10rem;
      margin-top: -1.5rem;
      margin-left: -0.5rem;
      font-family: var(--barlow);
      color: var(--black-100);
      text-shadow: 3px 3px 6px var(--black-800);
    }
    p {
      line-height: 1.8;
      font-size: 2rem;
      font-weight: var(--nanum-semi-bold);
      text-shadow: 2px 2px 6px var(--black-800);
    }
  }
  .wrapper {
    width: 70rem;
  }
  .swiper-wrapper {
    transition-timing-function: ease !important;
    transition-duration: 0.7s !important;
    transition-duration: 0.7s !important;
  }
  .swiper-slide {
    transition: all 0.5s;
    opacity: 0.5;
    transform: scale(0.8);
  }
  .swiper-slide-active {
    transform: scale(1);
    opacity: 1;
  }
  .swiper-button-prev,
  .swiper-button-next {
    color: var(--black-100);
  }
  .swiper-button-disabled {
    opacity: 0;
  }
`;

export default function AboutSecond({ activePage }) {
  const [ranking, setRanking] = useState(1);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    if (swiperInstance) {
      setTimeout(() => {
        swiperInstance.slideTo(0);
        setRanking(1);
      }, 600);
    }
  }, [activePage]);

  const swiperSwitchHandler = (swiper) => {
    setRanking(swiper.activeIndex + 1);
    setSwiperInstance(swiper);
  };

  return (
    <StyleAboutSecond>
      <StyleFilter $background="#00000050" />
      <div className="center ">
        <div className="page-description col">
          <h3>BEST {ranking}</h3>
          <p>
            SPEC에서 현재 가장 핫한 포트폴리오 10선을 소개합니다 <br />
            <br />
            SPEC은 누구나 자신의 포트폴리오를 자유롭게 올리고, <br />
            공유할 수 있는 사이트입니다. <br />
            SPEC을 통해 창작자와 관람객이 소통하고, <br />
            서로의 영감을 나눌 수 있는 공간을 만들고자 합니다.
          </p>
        </div>
        <div className="wrapper">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            spaceBetween={10}
            navigation={true}
            onSlideChange={swiperSwitchHandler}
          >
            {data.portfolios.map((portfolio) => (
              <SwiperSlide key={portfolio.id}>
                <AboutPortfolioCard portfolio={portfolio} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </StyleAboutSecond>
  );
}
