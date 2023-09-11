import React, { useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../static/images/userDefaultImg.jpeg'
import Tag from '../common/Tag';
import useNav from '../../hooks/useNav';

const StyleSubmitedCard = styled.div`
    width:100%;
    padding:2rem;
    background-color:rgba(50,50,50,0.8);
    .image-name-container {
        flex:1.3;
        margin-right:3rem;
        justify-content:center;
        align-items:center;
        > * {
            cursor: pointer;
        }
        
        > img {
            margin-bottom:1rem;
            border-radius:50%;      
            width:100%;
            height:auto;
            object-fit:cover;    
        }
        
        &:hover {
            cursor: pointer;
            opacity:0.4;
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
        font-size:1.5rem;
        font-weight:var(--nanum-normal);
    }
    .button {
        &:hover {
            cursor: pointer;
            opacity:0.5;
        }
    }
    .accept-reject-box {
        margin:1rem;
        gap:1rem;
    }
    .tag-container {
        gap:1rem;
    }
`

const IntroduceBox = styled.div`
    width:100%;
    /* background-color:white; */
    height:${props=>props.$isOn ? '10rem' : '0'};
    overflow:hidden;
    border: 1px solid var(--black-300);
    margin-top:2rem;
    > span {
        padding:1rem;
    }
`

export default function SubmitedCard({
    cardData,
}) {
    const [isOn, setIsOn] = useState(false);
    const {toProfile} = useNav();
    const isOnHandler = () => {
        setIsOn(!isOn);
    }
    return (
        <StyleSubmitedCard className='col'>
            <div className='row'>
                <div className='image-name-container col' onClick={()=>toProfile(cardData.id)}>
                    <img src={cardData?.img.length === 0 ? defaultImg : cardData.img} alt='신청자이미지'/>
                    <span>{cardData?.userName}</span>
                </div>
                <div className='data-box col'>
                    <span>{`이메일 : ${cardData?.email}`}</span>
                    <span>{`재직 상태 : ${cardData?.isEmploy ? '재직 중' : '구직 중'}`}</span>
                    <span className='tag-container row'>
                        {'관심 기술 :'}
                        {cardData.tag.map((item,idx)=>
                        <Tag
                            key={idx}
                            text={item}
                            size={'1.2rem'}
                            padding={'0.4rem'}
                            type={'project'}
                        />)}
                    </span>
                    <span>{`연락처 : ${cardData?.hotline}`}</span>
                    <span
                        className='see-more-box button'
                        onClick={isOnHandler}
                    >{isOn ? '닫기' : '더보기'}</span>
                </div>
            </div>
            <IntroduceBox
                className='row'
                $isOn={isOn}
            >
                <span>{cardData.body}</span>
            </IntroduceBox>
            <div className='row accept-reject-box'>
                <span className='button'>수락</span>
                <span className='button'>거절</span>
            </div>
        </StyleSubmitedCard>
    );
}