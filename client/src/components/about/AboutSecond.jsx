import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import img from '../../static/images/second.jpg';
import { useEffect, useState } from 'react';
import AboutPortfolioCard from './AboutPortfolioCard';
import StyleFilter from '../common/Filter';
import { tablet } from '../../static/theme.js';
import api from '../../hooks/useAxiosInterceptor';

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
    ${tablet} {
      width: 90%;
    }
  }
  .page-description {
    display: flex;
    align-items: end;
    padding-bottom: 10px;
    justify-content: center;
    ${tablet} {
      padding: 0 0 10px 0;
      margin-left: -3px;
    }
    p {
      font-size: 5rem;
      font-family: var(--barlow);
      letter-spacing: 1cap.5;
      font-weight: var(--nanum-semi-bold);
      padding-bottom: 10px;
    }
  }
  .swiper {
    overflow: visible;
  }
  .swiper-wrapper {
    transition-timing-function: ease !important;
    transition-duration: 0.7s !important;
    transition-duration: 0.7s !important;
  }
  .swiper-slide {
    .about-card {
      transition: 0.2s;
      opacity: 0.5;
      transform: scale(0.9);
    }
  }
  .swiper-slide-active {
    .about-card {
      opacity: 1;
      transform: scale(1);
    }
  }
  .swiper-pagination {
    display: flex !important;
    flex-direction: row !important;
    justify-content: center;
    bottom: -50px !important;
    .swiper-pagination-bullet {
      line-height: 20px;
      font-size: 15px !important;
      color: #000000 !important;
      font-weight: 900;
      width: 30px;
      height: 20px;
      border-radius: 5px;
      opacity: 0.7;
    }
    .swiper-pagination-bullet-active {
      width: 40px;
      opacity: 1;
    }
  }
`;

export default function AboutSecond({ activePage }) {
  const [portfolios, setPortfolios] = useState([]);

  useEffect(() => {
    const fetchPortfolioTopTen = async () => {
      const res = await api.get('/portfolios/top10');
      setPortfolios([...res.data.data]);
    };
    if (activePage === 1) fetchPortfolioTopTen();
  }, [activePage]);

  return (
    <StyleAboutSecond>
      <StyleFilter $background="#00000050" />
      <div className="center">
        <div className="page-description">
          <p>SPEC TOP 10 PORTFOLIO </p>
        </div>
        <Swiper
          modules={[Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          centeredSlides={true}
          pagination={{
            clickable: true,
            renderBullet: (index, className) => `<span class="${className}">${index + 1}</span>`,
          }}
          breakpoints={{
            425: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1550: {
              slidesPerView: 3,
            },
          }}
        >
          {portfolios?.map((portfolio) => (
            <SwiperSlide key={portfolio.portfolioId}>
              <AboutPortfolioCard portfolio={portfolio} setPortfolios={setPortfolios} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </StyleAboutSecond>
  );
}
