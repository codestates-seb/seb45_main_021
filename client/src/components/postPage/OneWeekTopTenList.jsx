import React, { useEffect, useState } from 'react';
import list from '../../static/portfolio.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { styled } from 'styled-components';
import { Autoplay } from 'swiper/modules';
import OneWeekTopTenItem from './OneWeekTopTenItem';

const StyleOneWeekTopTenList = styled.div`
  border-radius: 3px;
  backdrop-filter: blur(5px);
  flex: 1;

  .swiper-wrapper {
    height: 40px;
  }

  h5 {
    font-size: 1.4rem;
    font-weight: var(--nanum-semi-bold);
    left: 0;
  }
`;

export default function OneWeekTopTenList({ pageType }) {
  const [topTenList, setTopTenList] = useState([...list.portfolios]);

  useEffect(() => {
    // TopTenList를 받아와서, setTopTenList를 해야함
  }, [pageType]);

  return (
    <StyleOneWeekTopTenList onClick={(e) => e.stopPropagation()}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        direction="vertical"
        loop={true}
        autoplay={{ delay: 4000 }}
      >
        {topTenList.map((item, i) => (
          <SwiperSlide key={item.id}>
            <OneWeekTopTenItem pageType={pageType} ranking={i + 1} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyleOneWeekTopTenList>
  );
}
