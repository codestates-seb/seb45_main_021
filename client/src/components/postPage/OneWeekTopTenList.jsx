import React, { useEffect, useState } from 'react';
import list from '../../static/portfolio.json';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { styled } from 'styled-components';
import { Autoplay } from 'swiper/modules';
import OneWeekTopTenItem from './OneWeekTopTenItem';
import { tablet } from '../../static/theme';
import api from '../../hooks/useAxiosInterceptor';
const StyleOneWeekTopTenList = styled.div`
  padding-bottom: 10px;
  min-width: 350px;
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
  const [topTenList, setTopTenList] = useState([]);

  useEffect(() => {
    async function fetchOneWeekTopTenList() {
      let res;
      try {
        if (pageType === 'projects') {
          res = await api.get('/project/hearts/weekly-top');
        } else if (pageType === 'portfolios') {
          res = await api.get('/portfolio/hearts/weekly-top');
        }
        setTopTenList(res.data);
      } catch (e) {
        console.error(e);
      }
    }
    fetchOneWeekTopTenList();
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
          <SwiperSlide key={item.projectId || item.portfolioId}>
            <OneWeekTopTenItem pageType={pageType} ranking={i + 1} item={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyleOneWeekTopTenList>
  );
}
