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
    p {
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

export default function Portfolio({ id, data }) {
  const [filter, setfilter] = useState({
    value: '구직용',
    options: [
      { label: '구직용', value: '구직' },
      { label: '재직용', value: '재직' },
    ],
  });

  const handleClickFilter = (target) => {
    setfilter({ ...filter, value: target });
  };
  return (
    <StyleContainer id={id} className="col">
      <h2>포트폴리오</h2>
      <div className="filterWrapper">
        <Select
          value={filter.value}
          options={filter.options}
          onClickHandler={handleClickFilter}
          width="30rem"
          fontSize="2rem"
        />
      </div>
      <ul className="listWrapper col">
        <li className="listHeader row">
          <p className="title">제목</p>
          <p>작성자</p>
          <p>작성시간</p>
          <p>조회수</p>
          <p>좋아요</p>
        </li>
        {filter.value === '구직'
          ? data[0].map((el, i) => <ListItem key={i} data={el} type="포트폴리오" />)
          : filter.value === '재직'
          ? data[1].map((el, i) => <ListItem key={i} data={el} type="포트폴리오" />)
          : null}
      </ul>
    </StyleContainer>
  );
}
