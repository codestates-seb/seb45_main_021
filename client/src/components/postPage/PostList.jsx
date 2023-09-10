import React from 'react';
import styled from 'styled-components';
import PostListItem from './PostListItem';
import { mobile, desktop, tablet } from '../../static/theme.js';
const StylePostList = styled.ul`
  padding-top: 25px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
  ${desktop} {
    grid-template-columns: 1fr 1fr;
    gap: 40px;
  }
  ${tablet} {
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
