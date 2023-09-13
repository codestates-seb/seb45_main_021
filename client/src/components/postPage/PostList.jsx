import React from 'react';
import styled from 'styled-components';
import PostListItem from './PostListItem';
import { desktop, tablet, mobile } from '../../static/theme.js';

const StylePostList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  padding-bottom: 40px;
  ${desktop} {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    padding-bottom: 20px;
  }
  \ ${tablet} {
    grid-template-columns: 1fr;
  }
`;

export default function PostList({ postData, type }) {
  return (
    <StylePostList>
      {postData.map((post, i) => (
        <PostListItem key={i} post={post} type={type} />
      ))}
    </StylePostList>
  );
}
