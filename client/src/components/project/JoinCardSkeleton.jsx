import React from 'react';
import styled from 'styled-components'
import { Skeleton } from '@mui/material';
import { StyleProjectCardContainer } from './ProjectCardContainer';

const StyleProjectCardSkeletion = styled(StyleProjectCardContainer)`
    min-height:700px;
`

const StyleProjectCard = styled.div`
    width:100%;
    padding:2rem;
    background-color:rgba(50,50,50,0.8);
    justify-content:center;
    align-items:center;
    .image-name-container {
      > span:nth-child(1) {
          border-radius:50%;
      }
      gap:1rem;
      justify-content:center;
      align-items:center;
    }
`
const renderSkeletons = (count = 1, size) => {
    const skeletons = [];
  
    for (let i = 0; i < count; i++) {
      skeletons.push(
        <StyleProjectCard key={i} className='row'>
          <div className='image-name-container col'>
            <Skeleton
              sx={{ bgcolor: 'grey.700' }}
              variant="rectangular"
              width={'8.2rem'}
              height={'8.2rem'}
              animation="wave"
            />
            <Skeleton
              sx={{ bgcolor: 'grey.700' }}
              variant="rectangular"
              width={'70%'}
              height={size}
              animation="wave"
            />
          </div>
        </StyleProjectCard>
      );
    }
  
    return skeletons;
  };

export default function JoinCardSkeleton() {
    const size = 20;
    return (
        <StyleProjectCardSkeletion className='col'>
            {renderSkeletons(5,size)}
        </StyleProjectCardSkeletion>
    );
}

