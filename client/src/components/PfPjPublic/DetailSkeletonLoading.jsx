import React from 'react';
import styled from 'styled-components';
import { StyleDetailContainer } from '../../pages/ProjectDetail';
import { Skeleton } from '@mui/material';
import { BorderLine } from '../portfolio/SeeComment';
import { tablet } from '../../static/theme';
import TextBox from './TextBox';

const StyleSkeletonHead = styled.div`
    height : auto;
    padding-bottom:1rem;
    gap:1.5rem;
`

const StyleSkeletonBody = styled.div`
    width:100%; 
    .post-data-box {
        flex:4;
        height:auto;
        gap:10rem;
    }

    .sticky-box {
        position:sticky;
        top:90vh;
        margin-bottom:2rem;
    }

    .image-data-box {
        padding-left:3rem;
        flex:6;
        gap:3rem;
        > img {
            width:100%;
            object-fit:cover;
        }
    }
    ${tablet} {
        flex-direction: column;
        .image-data-box {
            padding-left:0; 
        }
    }
`


export default function DetailSkeletonLoading({type = 'project'}) {
    const defaultSize = {
        project : [{
            title : {width:'20%'},
            body : {width:'12%', height:26},
        },
        {
            title : {width:'25%'},
            body : {width:'70%',height:26},
        },
        {
            title : {width:'25%'},
            body : {width:'65%',height:26},
        },
        {
            title : {width:'35%'},
            body : {width:'100%',height:300},
        },],
        portfolio : [{
            title : {width:'20%'},
            body : {width:'10%', height:26},
        },
        {
            title : {width:'25%'},
            body : {width:'70%',height:26},
        },
        {
            title : {width:'35%'},
            body : {width:'65%',height:100},
        },],
    }
    return (
        <StyleDetailContainer>
            <StyleSkeletonHead className='col'>
                <Skeleton
                    sx={{ bgcolor: 'grey.700' }}
                    variant="rectangular"
                    width={'12%'}
                    height={30}
                    animation="wave"
                />
                <Skeleton
                    sx={{ bgcolor: 'grey.700' }}
                    variant="rectangular"
                    width={'100%'}
                    height={30}
                    animation="wave"
                />
                <Skeleton
                    sx={{ bgcolor: 'grey.700' }}
                    variant="rectangular"
                    width={'25%'}
                    height={30}
                    animation="wave"
                />
            </StyleSkeletonHead>
            <BorderLine/>
            <StyleSkeletonBody className='row'>
                <div className='post-data-box col'>
                {defaultSize[type].map((item,idx)=>
                    <TextBox
                        key={idx}
                        title={<Skeleton
                            key={idx}
                            sx={{ bgcolor: 'grey.700' }}
                            variant="rectangular"
                            width={item.title.width}
                            height={22}
                            animation="wave"
                        />}
                        component={<Skeleton
                            key={idx}
                            sx={{ bgcolor: 'grey.700' }}
                            variant="rectangular"
                            width={item.body.width}
                            height={item.body.height}
                            animation="wave"
                        />}
                    />
                )}
                </div>
                <div className='image-data-box'>
                    <Skeleton
                        sx={{ bgcolor: 'grey.700' }}
                        variant="rectangular"
                        width={'100%'}
                        height={400}
                        animation="wave"
                    />
                </div>
            </StyleSkeletonBody>
        </StyleDetailContainer>
    );
}

