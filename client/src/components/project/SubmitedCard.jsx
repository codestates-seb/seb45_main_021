import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import defaultImg from '../../static/images/userDefaultImg.jpeg'
import Tag from '../common/Tag';
import useNav from '../../hooks/useNav';
import { useParams } from 'react-router-dom';
import Modal from '../common/Modal';
import api from '../../hooks/useAxiosInterceptor'

const StyleSubmitedCard = styled.div`
    width:100%;
    padding:2rem;
    background-color:rgba(50,50,50,0.8);
    .image-name-container {
        flex:1.3;
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
    .card-box {
        gap:2rem;
    }
    .data-box {
        flex:8;
        align-items:start;
        justify-content:space-around;
        gap:0.5rem;
    }
    .tag-box {
        gap:0.5rem;
        justify-content:center;
        align-items:center;
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
    requestUpdateHandler,
    detailData,
}) {
    const [isOn, setIsOn] = useState(false);
    const {projectId} = useParams();
    const {toProfile} = useNav();
    const [showModal, setShowModal] = useState(false);
    const isOnHandler = () => {setIsOn(!isOn)}
    const isImpossibleAccept = detailData.joinPeople.length >= detailData.totalPeople;
    
    const acceptRefuseHandler = (projectId, memberId,type) => {
        if(isImpossibleAccept && type==='accept') {
            setShowModal(true);
        } else {
            api.patch(`/projects/${projectId}/request/${memberId}/${type}`)
            .then((res)=>{
                requestUpdateHandler();
            })
            .catch(()=>{
                setShowModal(true);
            })
            .finally(()=>{
                requestUpdateHandler();
            })
        }
    };
    

    return (
        <StyleSubmitedCard className='col'>
            {showModal &&
            <Modal
                setIsOpen={setShowModal}
                type='alert'
                title='알림'
                body={isImpossibleAccept ? '모집인원이 모두 찼습니다.' : '통신 실패 다시 시도해 주세요.'}
                confirmHandler={()=>setShowModal(false)}
            />}
            <div className='card-box row'>
                <div className='image-name-container col' onClick={()=>toProfile(cardData.memberId)}>
                    <img src={cardData?.img ? cardData.img : defaultImg} alt='신청자이미지'/>
                    <span>{cardData?.userName}</span>
                </div>
                <div className='data-box col'>
                    <span>{`이메일 : ${cardData?.email}`}</span>
                    <span>{`재직 상태 : ${cardData?.working ? '재직 중' : '구직 중'}`}</span>
                    <span className='tag-box row'>
                        {'관심 기술 :'}
                        {cardData.tags.map((item,idx)=>
                        <Tag
                            key={idx}
                            text={item}
                            size={'1rem'}
                            padding={'0.4rem'}
                            type={'project'}
                        />)}
                    </span>
                    <span>{`연락처 : ${cardData?.tell}`}</span>
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
                <span>{cardData?.aboutMe}</span>
            </IntroduceBox>
            <div className='row accept-reject-box'>
                <span className='button'
                onClick={()=>acceptRefuseHandler(projectId,cardData.memberId,'accept')}
                >수락</span>
                <span className='button'
                onClick={()=>acceptRefuseHandler(projectId,cardData.memberId,'refuse')}
                >거절</span>
            </div>
        </StyleSubmitedCard>
    );
}