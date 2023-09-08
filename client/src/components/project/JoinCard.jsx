import React from 'react';
import styled from 'styled-components'
import defaultImg from '../../static/images/userDefaultImg.jpeg'
import Tag from '../common/Tag';
import useNav from '../../hooks/useNav';

const StyleJoinCard = styled.div`
    width:100%;
    padding:2rem;
    background-color:rgba(50,50,50,0.8);

    .author-wrapper {
        padding:2px 5px;
        justify-content:start;
        align-items:center;
        gap:1.5rem;
        * {
            cursor:pointer;
        }

        > img {
            width:10rem;
            height:10rem;
            border-radius:50%;
            object-fit:cover;
        }
        &:hover {
            cursor:pointer;
            opacity:0.4;
        }

        p {
            font-size:1.6rem;
        }
    }
`

const dummy = {
        img : '',
        userName : '박찬섭12', 
        id : 15,
    }

export default function JoinCard({
    cardData = dummy,
}) {
    const {toProfile} = useNav();
    return (
        <StyleJoinCard>
            <div 
                className='col author-wrapper'
                onClick={()=>toProfile(cardData.id)}
            >
                <img src={cardData?.img.length === 0 ? defaultImg : cardData.img} alt='신청자이미지'/>
                <p>{cardData?.userName}</p>
            </div>
        </StyleJoinCard>
    );
}

