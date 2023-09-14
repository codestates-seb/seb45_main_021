import React, { useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../static/images/userDefaultImg.jpeg'
import Tag from '../common/Tag';

const StyleForSubmitCard = styled.div`
    max-width:500px;
    padding:1rem;
    height:100%;
    background-color:rgba(30,30,30,0.8);
    opacity:${props => props.$selectedCard ? '0.5' : '1'};
    position:relative;
    gap:1rem;
    .card-box {
        flex:1;
        gap:1rem;
    }
    .image-container {
        flex:2;
        overflow:hidden;
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
        flex:10;
        align-items:start;
        justify-content:space-around;
        gap:0.5rem;
    }
    .tag-box {
        gap:0.5rem;
        justify-content:center;
        align-items:center;
    }

    span {
        font-size:1.6rem;
        font-weight:var(--nanum-normal);
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
    .aboutme-box {
        width:100%;
        flex:1;
        border: 1px solid var(--black-300);
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
            onClick={()=>setSelectedCard(prev=>prev===idx ? null : idx)}
        >  
            {selectedCard && <span className='display-selected'>카드 선택됨</span>}
            <div className='card-box row'>
                <div className='image-container col'>
                    <img src={cardData?.img ? cardData.img : defaultImg} alt='신청자이미지'/>
                    <span>{cardData?.userName}</span>
                </div>
                <div className='data-box col'>
                    <span>{`이메일 : ${cardData?.email}`}</span>
                    <span>{`재직 상태 : ${cardData?.working ? '재직 중' : '구직 중'}`}</span>    
                    <div className='tag-box row'>
                    <span>{'관심 기술 : '}</span>
                        {cardData.tags.map((item,idx)=>
                            <Tag
                                key={idx}
                                text={item}
                                size={'1.2rem'}
                                padding={'0.4rem'}
                                type={'project'}
                            />
                        )}
                    </div>
                    <span>{`연락처 : ${cardData?.tell}`}</span>
                </div>
            </div>
            <div className='aboutme-box'>
                <span>{cardData.aboutMe}</span>
            </div>
        </StyleForSubmitCard>
    );
}