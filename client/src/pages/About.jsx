import React, { useEffect, useState } from 'react';
import { Pagination, A11y, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AboutFirst from '../components/about/AboutFirst';
import AboutSecond from '../components/about/AboutSecond';
import AboutThird from '../components/about/AboutThird';
import 'swiper/css';
import 'swiper/css/pagination';
import { styled } from 'styled-components';

const StyleAbout = styled.div`
  .swiper {
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
  }
  .swiper-wrapper {
    transition-timing-function: ease-in-out;
    transition-duration: 1s !important;
  }
  .swiper-pagination {
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .swiper-pagination-bullet {
    background-color: var(--black-100);
    width: 10px;
    height: 10px;
    transition: all.3s;
    opacity: 0.4;
  }
  .swiper-pagination-bullet-active {
    width: 13px;
    height: 13px;
    opacity: 0.6;
  }
`;

export default function About() {
  const [activePage, setActivePage] = useState(0);

  const handleSlideChange = (swiper) => {
    const header = document.getElementById('header');
    setActivePage(swiper.activeIndex);
    header.style.top = swiper.activeIndex === 0 ? '0' : '-100%';
  };

  useEffect(()=>{
    return () => {
      const header = document.getElementById('header');
      console.log(header);
      header.style.top = '0'
    }
  },[])

  return (
    <StyleAbout>
      <Swiper
        modules={[Pagination, A11y, Mousewheel]}
        spaceBetween={0}
        direction="vertical"
        slidesPerView={1}
        mousewheel={true}
        navigation
        pagination={{ clickable: true }}
        onSlideChange={handleSlideChange}
      >
        <SwiperSlide>
          <AboutFirst activePage={activePage} />
        </SwiperSlide>
        <SwiperSlide>
          <AboutSecond />
        </SwiperSlide>
        <SwiperSlide>
          <AboutThird />
        </SwiperSlide>
      </Swiper>
    </StyleAbout>
  );
}
