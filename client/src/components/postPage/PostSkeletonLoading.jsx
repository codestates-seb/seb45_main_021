import React from 'react';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import { mobile, desktop, tablet } from '../../static/theme.js';
const StylePostSkeletonLoading = styled.ul`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  gap: 40px;
  ${desktop} {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  ${tablet} {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  ${mobile} {
    margin-top: 55px;
  }
  li {
    min-height: 320px;
    .content-box {
      justify-content: space-between;
      padding: 10px 0;
      height: 120px;
    }
    .user {
      justify-content: space-between;
    }
  }
`;

export default function PostSkeletonLoading() {
  return (
    <StylePostSkeletonLoading>
      {Array.from({ length: 12 }, (_, index) => (
        <li key={index}>
          <Skeleton
            sx={{ bgcolor: 'grey.700' }}
            variant="rectangular"
            width={'100%'}
            height={220}
            animation="wave"
          />
          <div className="content-box col">
            <Skeleton
              sx={{ bgcolor: 'grey.700' }}
              variant="rounded"
              width={'100%'}
              height={35}
              animation="wave"
            />{' '}
            <Skeleton
              sx={{ bgcolor: 'grey.700' }}
              variant="rounded"
              width={'50%'}
              height={25}
              animation="wave"
            />
            <div className="user row">
              <Skeleton
                sx={{ bgcolor: 'grey.700' }}
                variant="rounded"
                width={'20%'}
                height={20}
                animation="wave"
              />
              <Skeleton
                sx={{ bgcolor: 'grey.700' }}
                variant="rounded"
                width={'35%'}
                height={20}
                animation="wave"
              />
            </div>
          </div>
        </li>
      ))}
    </StylePostSkeletonLoading>
  );
}
