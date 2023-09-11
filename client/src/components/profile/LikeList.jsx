import React, { useState } from 'react';
import { styled } from 'styled-components';
import Select from '../common/Select';
import ListItem from './ListItem';
import Page from '../common/Page';
import Skeleton from '@mui/material/Skeleton';

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

export default function LikeList({ id, data, isLoading }) {
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
        {isLoading ? (
          <Skeleton width="30rem" height="40px" />
        ) : (
          <Select
            defaultLabel={filter.defaultLabel}
            options={filter.options}
            onClickHandler={handleClickFilter}
            width="25rem"
            fontSize="2rem"
          />
        )}
      </div>
      <table>
        <thead>
          <tr>
            {isLoading ? (
              <>
                <th>
                  <Skeleton width="100%" height="50px" />
                </th>
                <th>
                  <Skeleton width="100%" height="50px" />
                </th>
                <th>
                  <Skeleton width="100%" height="50px" />
                </th>
                <th>
                  <Skeleton width="100%" height="50px" />
                </th>
              </>
            ) : (
              <>
                <th className="title">제목</th>
                <th className="author">작성자</th>
                <th className="views">조회수</th>
                <th className="likes">좋아요</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td>
                <Skeleton width="100%" height="40px" />
              </td>
              <td>
                <Skeleton width="100%" height="40px" />
              </td>
              <td>
                <Skeleton width="100%" height="40px" />
              </td>
              <td>
                <Skeleton width="100%" height="40px" />
              </td>
            </tr>
          ) : (
            filter.value === 'portfolio' &&
            PortFolio.map((el, i) => <ListItem key={i} data={el} type="좋아요/포트폴리오" />)
          )}
          {filter.value === 'project' &&
            Project.map((el, i) => <ListItem key={i} data={el} type="좋아요/프로젝트" />)}
        </tbody>
      </table>
    </StyleContainer>
  );
}
