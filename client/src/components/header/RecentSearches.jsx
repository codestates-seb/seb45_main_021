import React from 'react';
import { styled } from 'styled-components';

const StyleRecentSearches = styled.div`
  position: absolute;
  top: 45px;
  width: 100%;
  background-color: #181818;
  border: 1px solid var(--black-700);
  border-radius: 10px;
  padding: 2rem 0;
  button {
    color: var(--cobalt);
  }
  .top-menu {
    font-size: 1.3rem;
    display: flex;
    padding: 5px 2rem;
    align-items: center;
    margin-bottom: 1rem;
    h4 {
      flex: 1;
      font-weight: var(--nanum-bold);
    }
  }
  .history-item {
    padding: 5px 2rem;
    font-size: 1.5rem;
    font-family: var(--nanum);
    font-weight: var(--nanum-semi-bold);
    display: flex;
    align-items: center;
    margin-bottom: 5px;
    &:hover {
      background-color: var(--black-700);
    }
    span {
      padding: 10px 0;
      cursor: pointer;
      flex: 1;
    }
    svg,
    path {
      cursor: pointer;
    }
  }
  .not-found {
    text-align: center;
    font-size: 1.4rem;
    color: var(--black-400);
    font-weight: var(--nanum-semi-bold);
  }
`;
export default function RecentSearches({
  searchHistory,
  updateSearchHistory,
  clearSearchHistory,
  deleteSearchHistory,
}) {
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
              <span onClick={() => updateSearchHistory(keyword)}>{keyword}</span>
              <button onClick={() => deleteSearchHistory(keyword)}>삭제</button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="not-found">최근 검색어가 없습니다.</div>
      )}
    </StyleRecentSearches>
  );
}
