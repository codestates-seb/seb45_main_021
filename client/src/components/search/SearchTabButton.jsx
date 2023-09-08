import React from 'react';
import { styled } from 'styled-components';

const StyleSearchButton = styled.div`
  margin-top: 50px;
  display: flex;
  div {
    flex: 1;
    height: 90px;
    border: 1px solid var(--black-800);
    border-bottom: 1px solid var(--black-100);
    transition: all.2s;
    text-align: center;
    line-height: 90px;
    font-size: 2rem;
    &.active {
      border-color: var(--black-100);

      border-bottom: none;
    }
  }
`;

export default function SearchTabButton({ optionHandler, searchType }) {
  return (
    <StyleSearchButton>
      <div
        className={searchType === 'projects' ? 'active' : ''}
        onClick={() => optionHandler('searchType', 'projects')}
      >
        프로젝트
      </div>
      <div
        className={searchType === 'portfolios' ? 'active' : ''}
        onClick={() => optionHandler('searchType', 'portfolios')}
      >
        포트폴리오
      </div>
    </StyleSearchButton>
  );
}
