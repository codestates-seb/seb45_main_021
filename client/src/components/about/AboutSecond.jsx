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
import { tablet, desktop, mobile } from '../../static/theme.js';
const StyleAboutSecond = styled.section`
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url(${img});
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .center {
    height: 460px;
    width: 700px;
    ${tablet} {
      width: 90%;
    }
  }
  .page-description {
    padding-left: 45px;
    display: flex;
    align-items: end;
    padding-bottom: 10px;
    ${tablet} {
      padding: 0 0 10px 0;
      margin-left: -3px;
    }
    h3 {
      font-size: 10rem;
      font-family: var(--barlow);
      color: var(--black-100);
      text-shadow: 3px 3px 6px var(--black-800);
    }
    span {
      padding: 0 0 5px 20px;
      font-weight: var(--barlow-bold);
      font-family: var(--barlow);
      font-size: 2.5rem;
      text-shadow: 3px 3px 6px var(--black);
    }
  }
  .wrapper {
    width: 650px;
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
    opacity: 0 !important;
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
      <div className="center">
        <div className="page-description">
          <h3>BEST {ranking}</h3>
          <span>포트폴리오</span>
        </div>
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          spaceBetween={0}
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
    </StyleAboutSecond>
  );
}
