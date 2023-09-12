import React, { useEffect, useState } from 'react';
import list from '../../static/portfolio.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { styled } from 'styled-components';
import { Autoplay } from 'swiper/modules';
import OneWeekTopTenItem from './OneWeekTopTenItem';
import { tablet } from '../../static/theme';
const StyleOneWeekTopTenList = styled.div`
  padding-bottom: 10px;
  ${tablet} {
  }
  .swiper-wrapper {
    height: 30px;
  }
  h5 {
    padding-bottom: 5px;
    font-size: 1.8rem;
    font-weight: var(--nanum-bold);
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
      <h5>주간 인기 게시글</h5>
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
