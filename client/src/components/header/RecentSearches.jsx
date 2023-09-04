import React from 'react';
import { styled } from 'styled-components';
import { HiXMark } from 'react-icons/hi2';
import useNav from '../../hooks/useNav';

const StyleRecentSearches = styled.div`
  position: absolute;

  top: 45px;
  width: 100%;
  background-color: var(--black-100);
  border-radius: 10px;
  color: black;
  padding: 2rem;
  .top-menu {
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    h4 {
      flex: 1;
      font-weight: var(--nanum-bold);
    }
    button {
      color: var(--cobalt);
    }
  }
  .history-item {
    font-size: 1.5rem;
    font-family: var(--nanum);
    font-weight: var(--nanum-semi-bold);
    display: flex;
    align-items: center;
    transition: 1s;
    span {
      cursor: pointer;
      flex: 1;
    }
    svg,
    path {
      cursor: pointer;
    }
    button {
      color: var(--black-500);
      &:hover {
        color: black;
      }
    }
  }
  .not-found {
    text-align: center;
    font-size: 1.4rem;
    color: var(--black-400);
    font-weight: var(--nanum-semi-bold);
  }
`;
export default function RecentSearches({ searchHistory, clearSearchHistory, deleteSearchHistory }) {
  const { toSearch } = useNav();
  return (
    <StyleRecentSearches>
      {!!searchHistory.length && (
        <div className="top-menu">
          <h4>최근 검색어</h4>
          <button onClick={clearSearchHistory}>전체 삭제</button>
        </div>
      )}
      {!!searchHistory.length ? (
        <ul className="history-box">
          {searchHistory.map((keyword, i) => (
            <li className="history-item" key={i}>
              <span onClick={() => toSearch(keyword, 'project')}>{keyword}</span>
              <button onClick={() => deleteSearchHistory(keyword)}>
                <HiXMark size={20} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="not-found">최근 검색어가 없습니다.</div>
      )}
    </StyleRecentSearches>
  );
}
