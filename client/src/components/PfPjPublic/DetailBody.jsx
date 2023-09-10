import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import TextBox from './TextBox';
import Tag from '../common/Tag';
import { dateFormatter } from '../../utils/dateFormatter';
import { StyleBorderButton } from '../common/Buttons';
import Modal from '../common/Modal';
import SubmitCardContainer from '../project/SubmitCardContainer';
import api from '../../hooks/useAxiosInterceptor';
import { useSelector } from 'react-redux';


export const StyleDetailBody = styled.div`
    width:100%; 
    .post-data-box {
        flex:4;
        height:auto;
    }

    .sticky-box {
        position:sticky;
        top:90vh;
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
`

export default function DetailBody({
    detailData,
    type,
}) {
    const [isOnProjectCard, setIsOnProjectCard] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isPossibleApply, setIsPossibleApply] = useState(false);
    const userInfo = useSelector((state)=>state.user);

    useEffect(()=>{

    },[])

    return (
        <StyleDetailBody className='row'>
            {isOnProjectCard && <Modal
                type={'children'}
                children={
                    <SubmitCardContainer
                        cardList={detailData.requestPeople}
                        isForSubmit={true}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                    />}
                setIsOn={()=>setIsOnProjectCard(!isOnProjectCard)}
            />}
            <div className='post-data-box col'>
                    <TextBox
                        title={'개발 언어'}
                        component={<Tag text={detailData.language} type={'project'}/>}
                    />
                    <TextBox
                        title={'검색 키워드'}
                        component={
                            detailData.tag.map(item=>
                                <Tag key={item} text={item} type={'project'}/>
                            )
                        }
                    />
                    {detailData.closed_At && <TextBox
                        title={'프로젝트 마감 날짜'}
                        component={
                            <p>{`${dateFormatter(detailData.created_At)} ~ ${dateFormatter(detailData.closed_At)}`}</p>
                        }
                    />}
                    <TextBox
                        title={type==='project' ? '프로젝트 설명' : '포트폴리오 설명'}
                        component={
                            <p>{`${detailData.body}`}</p>
                        }
                    />
                    {detailData.description && <TextBox
                        title={'상세 요강'}
                        component={
                            <p>{`${detailData.description}`}</p>
                        }
                    />}
                    {detailData.description && <TextBox
                        title={'모집 현황'}
                        component={
                            <p>{`${detailData.totalPeople}명 / ${detailData.joinPeople?.length}명`}</p>
                        }
                    />}
                {type === 'project' &&
                <div className='sticky-box'>
                    <StyleBorderButton 
                        $width={'100%'}
                        onClick={()=>setIsOnProjectCard(!isOnProjectCard)}
                        >프로젝트 신청하기
                    </StyleBorderButton>
                </div>
                }
            </div>
            <div className='image-data-box col'>
                {detailData.imgs.map((url,idx)=>
                    <img key={idx} src={url} alt='이미지'></img>
                )}
            </div>
        </StyleDetailBody>
    );
}

