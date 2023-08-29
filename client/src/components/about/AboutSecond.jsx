import VideoPlayer from './VideoPlayer';
import { styled } from 'styled-components';
import video from '../../static/videos/second.mp4';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const StyleAboutSecond = styled.div`
  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .swiper-wrapper {
    transition-timing-function: ease !important;
    transition-duration: 1s !important;
  }

  .swiper-slide {
    transition: all 0.5s;
    opacity: 0.5;
    filter: blur(2px);
    transform: scale(0.8);
  }

  .swiper-slide-active {
    transform: scale(1);
    opacity: 1;
    filter: none;
  }

  .card {
    width: 50rem;
    height: 50rem;
    border: 1px solid red;
    border-radius: 20px;
  }
`;

export default function AboutSecond() {
  return (
    <StyleAboutSecond>
      <VideoPlayer src={video} />
      <div className="wrapper">
        <Swiper
          modules={[Autoplay]}
          slidesPerView={3}
          spaceBetween={30}
          centeredSlides={true}
          loopedSlides={1}
          slideToClickedSlide={true}
        >
          <SwiperSlide>
            <div className="card"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card"></div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card"></div>
          </SwiperSlide>
        </Swiper>
      </div>
    </StyleAboutSecond>
  );
}
