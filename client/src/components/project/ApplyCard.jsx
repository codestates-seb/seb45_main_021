import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../static/images/userDefaultImg.jpeg'

const StyleApplyCard = styled.div`
    width:100%;
    border:1px solid white;
    .image-container {
        flex:2;
        overflow:hidden;
        border-radius:50%;      
        > img {
            width:100%;
            height:auto;
            object-fit:cover;    
        }
    }

    .col {
        flex:8;
    }

`

export default function ApplyCard({
    cardData,
}) {
    return (
        <StyleApplyCard className='row'>
            <div className='image-container'>
                <img src={cardData?.img.length === 0 ? defaultImg : cardData.img} alt='신청자이미지'/>
            </div>
            <div className='col'>
                <p>{cardData?.userName}</p>
                <p>{cardData?.email}</p>
                <p>{cardData?.isEmploy}</p>
                <p>{cardData?.userName}</p>
            </div>
        </StyleApplyCard>
    );
}

// id : 6,
//       img : '',
//       userName : '신청자2',
//       isEmploy : false,
//       tag : ['java','javascript','C++'],
//       hotline : '010-1234-5678',
//       body : '신청합니다.'},