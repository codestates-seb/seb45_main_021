import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { HiOutlineSearch } from 'react-icons/hi';
import useForm from '../../hooks/useForm';
import useNav from '../../hooks/useNav';
import RecentSearches from './RecentSearches';

const StyleSearchInput = styled.div`
  width: 100%;
  opacity: ${(props) => (props.$hidden ? '0' : '1')};
  visibility: ${(props) => (props.$hidden ? 'hidden' : 'visible')};
  height: ${(props) => (props.$hidden ? '0px' : 'auto')};
  flex: 1;
  position: relative;
  input {
    border: 2px solid var(--black-400);
    width: 100%;
    height: 40px;
    border-radius: 20px;
    font-size: 1.6rem;
    background-color: transparent;
    font-weight: var(--nanum-semi-bold);
    color: var(--black-100);
    padding: 11px 10px 9px 37px;
    transition: all.2s;
    &:focus {
      border-color: var(--black-100);
    }
  }
  .search-button {
    left: 2px;
    top: 4px;
    bottom: 0;
    position: absolute;
    z-index: -1;
    path,
    svg {
      cursor: pointer;
      color: var(--black-100);
    }
  }
`;

const searchHiddenPath = ['portfolio/write', 'project/write', 'portfolio/edit', 'project/edit', ''];

export default function SearchBox({ callback, ...rest }) {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const currentKeyword = queryParams.get('keyword') || '';
  const hiddenPath = location.pathname.split('/').slice(1, 3).join('/');
  const isSearchHidden = searchHiddenPath.includes(hiddenPath);
  const [searchInput, setSearchInput] = useForm({ keyword: currentKeyword });
  const [searchHistory, setSearchHistory] = useState([]);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const { toSearch } = useNav();
  const inputRef = useRef(null);

  useEffect(() => {
    // 주소가 바뀌면, 최근 검색창을 감추고, path에서 값을 빼오기
    setIsInputFocused(false);
    setSearchInput(null, currentKeyword, 'keyword');
    if (inputRef.current) inputRef.current.blur();
  }, [currentKeyword]);

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 검색 기록 불러오기
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
    window.addEventListener('click', () => setIsInputFocused(false));
    return () => window.removeEventListener('click', () => setIsInputFocused(false));
  }, []);

  const clearSearchHistory = () => {
    // 검색 기록 삭제
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const deleteSearchHistory = (keyword) => {
    // 특정 검색 기록 삭제
    const newSearchHistory = searchHistory.filter((item) => item !== keyword);
    setSearchHistory(newSearchHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newSearchHistory));
  };

  const updateSearchHistory = (keyword) => {
    // 검색 기록 업데이트
    if (keyword && keyword !== currentKeyword) {
      const newHistory = [keyword, ...searchHistory.filter((item) => item !== keyword)];
      if (newHistory.length > 5) {
        newHistory.pop();
      }
      setSearchHistory(newHistory);
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      toSearch(keyword, 'projects');
      if (callback) callback();
    }
  };

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchInput.keyword.trim()) {
      updateSearchHistory(searchInput.keyword.trim());
    }
  };
  return (
    <StyleSearchInput
      $hidden={isSearchHidden}
      onClick={(e) => {
        e.stopPropagation();
        setIsInputFocused(true);
      }}
      {...rest}
    >
      <form onSubmit={searchHandler}>
        <input
          type="text"
          name="keyword"
          onChange={setSearchInput}
          autoComplete="off"
          value={searchInput.keyword}
          ref={inputRef}
          maxLength={10}
          placeholder="태그를 검색해보세요"
        />
        <button className="search-button">
          <HiOutlineSearch size={22} />
        </button>
      </form>
      {isInputFocused && (
        <RecentSearches
          updateSearchHistory={updateSearchHistory}
          isInputFocused={isInputFocused}
          searchHistory={searchHistory}
          clearSearchHistory={clearSearchHistory}
          deleteSearchHistory={deleteSearchHistory}
        />
      )}
    </StyleSearchInput>
  );
}
