import React, { useState } from 'react';
import { styled } from 'styled-components';
import Select from '../common/Select';
import ListItem from './ListItem';
import Page from '../common/Page';
import { tablet, mobile } from '../../static/theme';

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
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 60rem;
      ${tablet} {
        width: 40rem;
      }
      ${mobile} {
        width: 20rem;
      }
    }
    .views {
      ${tablet} {
        display: none;
      }
      ${mobile} {
        display: none;
      }
    }
    .likes {
      ${tablet} {
        display: none;
      }
      ${mobile} {
        display: none;
      }
    }
  }
`;

export default function Project({ id, data }) {
  const [filter, setfilter] = useState({
    defaultLabel: '등록한 프로젝트',
    value: 'add',
    options: [
      { label: '등록한 프로젝트', value: 'add' },
      { label: '참여한 프로젝트', value: 'attend' },
    ],
  });

  const add = data[0];
  const attend = data[1];

  const handleClickFilter = (target) => {
    setfilter({ ...filter, value: target });
  };
  return (
    <StyleContainer id={id} className="col">
      <h2>프로젝트</h2>
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
          <span className="author">작성자</span>
          <span className="created_At">작성시간</span>
          <span className="views">조회수</span>
          <span className="likes">좋아요</span>
        </li>
        {filter.value === 'add'
          ? add.map((el, i) => <ListItem key={i} data={el} type="프로젝트" />)
          : filter.value === 'attend'
          ? attend.map((el, i) => <ListItem key={i} data={el} type="프로젝트" />)
          : null}
      </ul>
    </StyleContainer>
  );
}
