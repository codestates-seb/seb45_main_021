import React, { useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../static/images/userDefaultImg.jpeg'
import Tag from '../common/Tag';

const StyleForSubmitCard = styled.div`
    width:100%;
    padding:1rem;
    height:300px;
    background-color:rgba(50,50,50,0.8);
    opacity:${props => props.$selectedCard ? '0.5' : '1'};
    position:relative;
    .image-container {
        flex:1.3;
        overflow:hidden;
        margin-right:1rem;
        justify-content:center;
        align-items:center;
        > img {
            margin-bottom:1rem;
            border-radius:50%;      
            width:100%;
            height:auto;
            object-fit:cover;    
        }
    }
    .data-box {
        flex:8;
        align-items:start;
        justify-content:center;
        gap:0.5rem;
    }
    .tag-box {
        margin-left:0.5rem;
        gap:0.5rem;
    }
    .see-more-box {
        margin-left:auto;
    }
    span {
        font-size:1.5rem !important;
        font-weight:var(--nanum-normal);
    }
    .accept-reject-box {
        margin:1rem;
        gap:1rem;
    }
    &:hover{
        cursor: pointer;
        opacity:0.5;
    }
    &:hover * {
        pointer-events: none; 
    }
    .display-selected {
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        font-size:3rem;
        font-weight: var(--nanum-bold);
    }
`

const IntroduceBox = styled.div`
    width:100%;
    /* background-color:white; */
    height: 100%;
    border: 1px solid var(--black-300);
    margin-top:2rem;
    > span {
        padding:1rem;
    }
`

export default function ForSubmitCard({
    cardData,
    idx,
    selectedCard,
    setSelectedCard
}) {
    return (
        <StyleForSubmitCard
            $selectedCard={selectedCard}
            className='col'
            onClick={()=>setSelectedCard(idx)}
        >  
            {selectedCard && <span className='display-selected'>카드 선택됨</span>}
            <div className='row'>
                <div className='image-container col'>
                    <img src={cardData?.img.length === 0 ? defaultImg : cardData.img} alt='신청자이미지'/>
                    <span>{cardData?.userName}</span>
                </div>
                <div className='data-box col'>
                    <span>{`이메일 : ${cardData?.email}`}</span>
                    <span>{`재직 상태 : ${cardData?.isEmploy ? '재직 중' : '구직 중'}`}</span>
                    <div className='row'>
                        <span>{'관심 기술 : '}</span>
                        <div className='tag-box row'>
                            {cardData.tag.map((item,idx)=>
                                <Tag
                                    key={idx}
                                    text={item}
                                    size={'1.2rem'}
                                    padding={'0.4rem'}
                                    type={'project'}
                                />
                            )}
                        </div>
                    </div>
                    <span>{`연락처 : ${cardData?.hotline}`}</span>
                </div>
            </div>
            <IntroduceBox className='row'>
                <span>{cardData.body}</span>
            </IntroduceBox>
        </StyleForSubmitCard>
    );
}