import Section from '../common/Section';
import VideoPlayer from './VideoPlayer';
import { styled } from 'styled-components';
import video from '../../static/videos/second.mp4';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, A11y } from 'swiper/modules';
import 'swiper/css/pagination';

const StyleAboutSecond = styled(Section)`
  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 50rem;
    display: flex;
    border: 1px solid red;
  }

  .swiper {
    height: 40rem;
  }

  .swiper-slide {
    transition: all 0.5s;
    opacity: 0.5;
    transform: scale(0.9);
  }

  .swiper-slide-active {
    transform: scale(1);
    filter: none;
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
          slidesPerView={1}
          spaceBetween={300}
          loop={true}
          loopedSlides={1}
          autoplay={true}
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
