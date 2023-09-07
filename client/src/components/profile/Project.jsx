import React, { useState } from 'react';
import { styled } from 'styled-components';
import Select from '../common/Select';
import ListItem from './ListItem';
import Page from '../common/Page';

const StyleContainer = styled(Page)`
  width: 100%;
  background-color: #00000046;
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
    font-size: 2rem;
  }
  table {
    width: 100%;
    font-size: 1.5rem;
    table-layout: fixed;
  }

  th {
    padding: 2rem;
    border-bottom: 1px solid var(--black-100);
  }
  td {
    padding: 1rem;
    text-align: center;
    vertical-align: middle;
    height: 50px;
    svg {
      margin-right: 5px;
      vertical-align: middle;
    }
  }
  td:nth-child(1) {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
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
      <table>
        <thead>
          <tr>
            <th className="title">제목</th>
            {filter.value === 'attend' && <th className="author">작성자</th>}
            <th className="created_At">작성시간</th>
            <th className="views">조회수</th>
            <th className="likes">좋아요</th>
          </tr>
        </thead>
        <tbody>
          {filter.value === 'add' &&
            add.map((el, i) => <ListItem key={i} data={el} type="프로젝트" />)}
          {filter.value === 'attend' &&
            attend.map((el, i) => <ListItem key={i} data={el} type="프로젝트" />)}
        </tbody>
      </table>
    </StyleContainer>
  );
}