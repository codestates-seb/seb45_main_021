import React from 'react';
import { styled } from 'styled-components';
import { desktop, tablet, mobile } from '../../static/theme.js';

const StyleSearchButton = styled.div`
  display: flex;
  position: relative;
  background-color: #1a1f1b;
  border-radius: 3px;
  width: 30%;
  .tab-toggle {
    position: absolute;
    background-color: #fafafa25;
    width: 50%;
    height: 45px;
    border-radius: 3px;
    left: ${(props) => (props.$isProject ? '0' : '50%')};
  }
  div {
    flex: 1;
    cursor: pointer;
    transition: all.2s;
    text-align: center;
    font-size: 2rem;
    height: 45px;
    line-height: 45px;
  }
  ${tablet} {
    width: 100%;
  }
`;

export default function SearchTabButton({ optionHandler, searchType }) {
  return (
    <StyleSearchButton $isProject={searchType === 'projects'}>
      <div className="tab-toggle"></div>
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
