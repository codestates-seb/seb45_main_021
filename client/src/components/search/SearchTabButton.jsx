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

export default function SearchTabButton({ option, optionHandler, type }) {
  return (
    <StyleSearchButton>
      <div
        className={type === 'project' ? 'active' : ''}
        onClick={() => optionHandler('type', 'project')}
      >
        프로젝트
      </div>
      <div
        className={type === 'portfolio' ? 'active' : ''}
        onClick={() => optionHandler('type', 'portfolio')}
      >
        포트폴리오
      </div>
    </StyleSearchButton>
  );
}
