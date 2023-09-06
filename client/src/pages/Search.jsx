import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import Page from '../components/common/Page';
import useFilterOption from '../hooks/useFilterOption';
import FilterOption from '../components/postList/FilterOption';
import { useLocation } from 'react-router';
import SearchTabButton from '../components/search/SearchTabButton';
const StyleSearch = styled(Page)`
  .filter-option {
    margin-top: 20px;
  }
`;

export default function Search() {
  const [option, optionHandler] = useFilterOption();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type');
  const keyword = queryParams.get('keyword');

  useEffect(() => {
    if (keyword) optionHandler('keyword', keyword);
  }, [keyword]);
  useEffect(() => {
    console.log('요청 실행');
  }, [option]);
  return (
    <StyleSearch>
      <SearchTabButton type={type} optionHandler={optionHandler} option={option} />
      <FilterOption
        className="filter-option"
        option={option}
        optionHandler={optionHandler}
        type={type}
      />
    </StyleSearch>
  );
}
