import React, { useState } from 'react';
import { styled } from 'styled-components';
import Select from '../common/Select';
import ListItem from './ListItem';
import Page from '../common/Page';
import Skeleton from '@mui/material/Skeleton';
import { desktop, mobile } from '../../static/theme';

const StyleContainer = styled(Page)`
  width: 100%;
  min-height: 0;
  height: 500px;
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
  table {
    font-size: 1.5rem;
    table-layout: fixed;
    width: 100%;
  }
  th {
    width: 50px;
    padding-bottom: 1rem;
    font-weight: 700;
    height: 30px;
    vertical-align: middle;
    border-bottom: 1px solid var(--black-100);
  }
  td {
    width: 50px;
    text-align: center;
    vertical-align: middle;
    height: 40px;
    svg {
      margin-right: 5px;
      vertical-align: middle;
    }
  }
  th:nth-child(1),
  td:nth-child(1) {
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    ${desktop} {
      width: 230px;
    }
    @media (max-width: 800px) {
      width: 220px;
    }
    ${mobile} {
      width: 200px;
    }
  }
  th:nth-child(2),
  td:nth-child(2) {
    ${desktop} {
      display: table-cell;
    }
    @media (max-width: 900px) {
      display: none;
    }
    ${mobile} {
      display: none;
    }
  }
  th:nth-child(3),
  td:nth-child(3) {
    ${desktop} {
      display: table-cell;
    }
    @media (max-width: 900px) {
      display: none;
    }
    ${mobile} {
      display: none;
    }
  }
`;

export default function Project({ id, data, isLoading }) {
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
        {isLoading ? (
          <Skeleton width="20rem" height="40px" sx={{ bgcolor: 'grey.700' }} animation="wave" />
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
            <th className="title">
              {isLoading ? (
                <Skeleton width="90%" height="50px" sx={{ bgcolor: 'grey.700' }} animation="wave" />
              ) : (
                '제목'
              )}
            </th>
            {filter.value === 'attend' && (
              <th className="author">
                {isLoading ? (
                  <Skeleton
                    width="90%"
                    height="50px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                ) : (
                  '작성자'
                )}
              </th>
            )}
            <th className="created_At">
              {isLoading ? (
                <Skeleton width="90%" height="50px" sx={{ bgcolor: 'grey.700' }} animation="wave" />
              ) : (
                '작성시간'
              )}
            </th>
            <th className="views">
              {isLoading ? (
                <Skeleton width="90%" height="50px" sx={{ bgcolor: 'grey.700' }} animation="wave" />
              ) : (
                '조회수'
              )}
            </th>
            <th className="likes">
              {isLoading ? (
                <Skeleton width="90%" height="50px" sx={{ bgcolor: 'grey.700' }} animation="wave" />
              ) : (
                '좋아요'
              )}
            </th>
          </tr>
        </thead>
        <tbody>
          {filter.value === 'add' &&
            add.map((el, i) => (
              <ListItem key={i} data={el} type="프로젝트" isLoading={isLoading} />
            ))}
          {filter.value === 'attend' &&
            attend.map((el, i) => (
              <ListItem key={i} data={el} type="프로젝트" isLoading={isLoading} />
            ))}
        </tbody>
      </table>
    </StyleContainer>
  );
}
