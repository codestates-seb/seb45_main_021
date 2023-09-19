import React from 'react';
import useFilterOption from '../hooks/useFilterOption';
import Page from '../components/common/Page';
import { styled } from 'styled-components';
import PostPage from '../components/postPage/PostPage';
const StyleProjects = styled(Page)``;

export default function Projects() {
  const { options, optionHandler, pageType, getApiUrl } = useFilterOption();

  return (
    <PostPage
      options={options}
      optionHandler={optionHandler}
      pageType={pageType}
      getApiUrl={getApiUrl}
    />
  );
}
