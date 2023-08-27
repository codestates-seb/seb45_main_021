import Section from '../common/Section';
import VideoPlayer from './VideoPlayer';
import { styled } from 'styled-components';
import video from '../../static/videos/second.mp4';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const StyleAboutSecond = styled(Section)`
  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 80%;
    height: 200px;
  }

  .swiper-wrapper {
    transition-timing-function: ease !important;
    transition-duration: 1s !important;
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
`;

export default function AboutSecond() {
  return (
    <StyleAboutSecond>
      <VideoPlayer src={video} />
      <div className="wrapper">
        <Swiper
          modules={[Autoplay, A11y]}
          slidesPerView={3}
          spaceBetween={300}
          centeredSlides={true}
          loopedSlides={1}
        >
          <SwiperSlide>
            <div className="card">
              <img
                alt=""
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu0IDFb1QuR89RXvvmYv8Oue1Z8sv7Kd-RA&usqp=CAU"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                alt=""
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu0IDFb1QuR89RXvvmYv8Oue1Z8sv7Kd-RA&usqp=CAU"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                alt=""
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu0IDFb1QuR89RXvvmYv8Oue1Z8sv7Kd-RA&usqp=CAU"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                alt=""
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu0IDFb1QuR89RXvvmYv8Oue1Z8sv7Kd-RA&usqp=CAU"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                alt=""
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu0IDFb1QuR89RXvvmYv8Oue1Z8sv7Kd-RA&usqp=CAU"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                alt=""
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu0IDFb1QuR89RXvvmYv8Oue1Z8sv7Kd-RA&usqp=CAU"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                alt=""
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmu0IDFb1QuR89RXvvmYv8Oue1Z8sv7Kd-RA&usqp=CAU"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </StyleAboutSecond>
  );
}
