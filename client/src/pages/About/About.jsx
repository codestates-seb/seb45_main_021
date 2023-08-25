import React from 'react';
import { Pagination, A11y, Mousewheel } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import AboutFirst from '../../components/about/AboutFirst/AboutFirst';
import AboutSecond from '../../components/about/AboutSecond/AboutSecond';
import AboutThird from '../../components/about/AboutThird/AboutThird';
import styles from './About.module.css';
import classNames from 'classnames/bind';
import 'swiper/css';
import 'swiper/css/pagination';

const cx = classNames.bind(styles);
export default function About() {
  return (
    <Swiper
      modules={[Pagination, A11y, Mousewheel]}
      spaceBetween={0}
      direction="vertical"
      slidesPerView={1}
      mousewheel={true}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => console.log('slide change')}
      className={cx('swiper-container')}
    >
      <SwiperSlide>
        <AboutFirst />
      </SwiperSlide>
      <SwiperSlide>
        <AboutSecond />
      </SwiperSlide>
      <SwiperSlide>
        <AboutThird />
      </SwiperSlide>
    </Swiper>
  );
}
