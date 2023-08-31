import React, { useState } from 'react';
import { styled } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import SwiperItem from './SwiperItem';
import SwiperEdit from './SwiperEdit';

const StyleContainer = styled.div`
  width: 100%;
  height: 70rem;
  padding: 2rem;
  background-color: var(--black-800);
  .swiper {
    width: 100%;
    height: 100%;
  }
  .swiper-wrapper {
    display: flex;
  }
  .swiper-slide {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default function ProjectCard({ id, data }) {
  const [activePage, setActivePage] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const handleSlideChange = (swiper) => {
    setActivePage(swiper.activeIndex);
  };
  const handleIsEdit = () => {
    setIsEdit((prev) => !prev);
  };
  const handleEditIdx = (target) => {
    setEditIdx(target);
  };
  return (
    <StyleContainer id={id}>
      <Swiper
        modules={[Pagination]}
        onSlideChange={handleSlideChange}
        slidesPerView={'auto'}
        centeredSlides={true}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slideToClickedSlide={true}
        initialSlide={1}
      >
        {!isEdit &&
          data.map((el, i) => (
            <SwiperSlide key={i}>
              <SwiperItem
                activePage={activePage}
                data={el}
                idx={i}
                handler={handleIsEdit}
                idxHandler={handleEditIdx}
              />
            </SwiperSlide>
          ))}
        {isEdit && editIdx !== null && (
          <SwiperSlide>
            <SwiperEdit data={data[editIdx]} />
          </SwiperSlide>
        )}
      </Swiper>
    </StyleContainer>
  );
}
