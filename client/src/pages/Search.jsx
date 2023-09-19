import React from 'react';
import useFilterOption from '../hooks/useFilterOption';
import PostPage from '../components/postPage/PostPage';

export default function Search() {
  const { options, optionHandler, pageType, searchType, getApiUrl } = useFilterOption();

  return (
    <PostPage
      options={options}
      optionHandler={optionHandler}
      pageType={pageType}
      searchType={searchType}
      getApiUrl={getApiUrl}
    />
  );
}
