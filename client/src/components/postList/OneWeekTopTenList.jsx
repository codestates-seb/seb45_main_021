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
  padding: 1.5rem 2rem;
  position: absolute;
  left: 0;
  backdrop-filter: blur(5px);
  overflow: hidden;
  height: ${(props) => (props.$isSpread ? '440px' : '90px')};
  background-color: ${(props) => (props.$isSpread ? 'var(--backgroundColor)' : '#00000020')};
  transition: all.2s ease-in-out;
  .swiper-wrapper {
    height: 15px;
  }
  .swiper-slide {
    height: 15px;
  }
  .top-menu {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-size: 1.6rem;
    font-weight: var(--nanum-semi-bold);
    justify-content: space-between;
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
      <div className="top-menu">
        <h4>주간 인기 게시글</h4>
        <button onClick={() => setIsSpread((prev) => !prev)}>{isSpread ? '접기' : '펼치기'}</button>
      </div>
      {isSpread ? (
        topTenList.map((item, i) => (
          <OneWeekTopTenItem key={item.id} type={type} ranking={i + 1} item={item} />
        ))
      ) : (
        <Swiper
          modules={[Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
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
