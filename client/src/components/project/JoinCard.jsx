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


export default function JoinCard({
    cardData,
}) {
    const {toProfile} = useNav();
    return (
        <StyleJoinCard>
            <div 
                className='col author-wrapper'
                onClick={()=>toProfile(cardData.memberId)}
            >
                <img src={cardData?.imgUrl.length === 0 ? defaultImg : cardData.imgUrl} alt='신청자이미지'/>
                <p>{cardData?.username}</p>
            </div>
        </StyleJoinCard>
    );
}

