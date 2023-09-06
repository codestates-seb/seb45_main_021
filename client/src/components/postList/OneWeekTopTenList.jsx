import React, { useEffect, useState } from 'react';
import list from '../../static/portfolio.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { styled } from 'styled-components';
import { Autoplay } from 'swiper/modules';
import OneWeekTopTenItem from './OneWeekTopTenItem';

const StyleOneWeekTopTenList = styled.div`
  border: 1px solid var(--black-100);
  border-radius: 3px;
  position: absolute;
  padding: 1.5rem 1rem;
  backdrop-filter: blur(5px);
  background-color: var(--backgroundColor);
  transition: all.2s;
  z-index: 2;
  width: 450px;
  .swiper {
    margin: 0;
  }
  .swiper-wrapper {
    height: 15px;
  }
  h5 {
    top: -25px;
    font-size: 1.4rem;
    font-weight: var(--nanum-semi-bold);
    left: 0;
    position: absolute;
  }
  button {
    position: absolute;
    right: 3px;
    top: 10px;
    z-index: 2;
  }
`;

export default function OneWeekTopTenList({ type }) {
  const [topTenList, setTopTenList] = useState([...list.portfolios]);
  const [isSpread, setIsSpread] = useState(false);

  useEffect(() => {
    const closeSpread = () => setIsSpread(false);
    window.addEventListener('click', closeSpread);
    return () => window.removeEventListener('click', closeSpread);
  }, []);

  useEffect(() => {
    // TopTenList를 받아와서, setTopTenList를 해야함
  }, [type]);

  return (
    <StyleOneWeekTopTenList onClick={(e) => e.stopPropagation()} $isSpread={isSpread}>
      <h5>주간 인기 게시글</h5>
      <button onClick={() => setIsSpread((prev) => !prev)}>{isSpread ? '접기' : '펼치기'}</button>
      {isSpread ? (
        topTenList.map((item, i) => (
          <OneWeekTopTenItem key={item.id} type={type} ranking={i + 1} item={item} />
        ))
      ) : (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={10}
          direction="vertical"
          loop={true}
          autoplay={{ delay: 4000 }}
        >
          {topTenList.map((item, i) => (
            <SwiperSlide key={item.id}>
              <OneWeekTopTenItem type={type} ranking={i + 1} item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </StyleOneWeekTopTenList>
  );
}
