import React, { useState } from 'react';
import { styled } from 'styled-components';
import Select from '../common/Select';
import ListItem from './ListItem';
import Page from '../common/Page';

const StyleContainer = styled(Page)`
  width: 100%;
  background-color: var(--black-800);
  gap: 2rem;
  padding: 1rem;
  position: relative;
  overflow-y: scroll;
  .cursor {
    cursor: pointer;
    &:hover {
      color: var(--black-500);
    }
  }
  h2 {
    font-size: 3rem;
    font-weight: 800;
  }
  .filterWrapper {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  li {
    width: 100%;
    font-size: 2rem;
    justify-content: space-between;
    gap: 2rem;
    span {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 12rem;
      height: 5rem;
    }
  }
  .listHeader {
    border-bottom: 1px solid var(--black-100);
  }
  .listWrapper {
    width: 100%;
    list-style: none;
    .title {
      flex-shrink: 0;
      width: 70rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export default function LikeList({ id, data }) {
  const [filter, setfilter] = useState({
    defaultLabel: '포트폴리오',
    value: 'portfolio',
    options: [
      { label: '포트폴리오', value: 'portfolio' },
      { label: '프로젝트', value: 'project' },
    ],
  });
  const PortFolio = data[0];
  const Project = data[1];

  const handleClickFilter = (target) => {
    setfilter({ ...filter, value: target });
  };
  return (
    <StyleContainer id={id} className="col">
      <h2>좋아요</h2>
      <div className="filterWrapper">
        <Select
          defaultLabel={filter.defaultLabel}
          options={filter.options}
          onClickHandler={handleClickFilter}
          width="30rem"
          fontSize="2rem"
        />
      </div>
      <ul className="listWrapper col">
        <li className="listHeader row">
          <span className="title">제목</span>
          <span>작성자</span>
          <span>작성시간</span>
          <span>조회수</span>
          <span>좋아요</span>
        </li>
        {filter.value === 'portfolio'
          ? PortFolio.map((el, i) => <ListItem key={i} data={el} type="좋아요/포트폴리오" />)
          : filter.value === 'project'
          ? Project.map((el, i) => <ListItem key={i} data={el} type="좋아요/프로젝트" />)
          : null}
      </ul>
    </StyleContainer>
  );
}
