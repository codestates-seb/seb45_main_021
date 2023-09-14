import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import TextBox from './TextBox';
import Tag from '../common/Tag';
import { dateFormatter } from '../../utils/dateFormatter';
import { StyleBorderButton } from '../common/Buttons';
import Modal from '../common/Modal';
import ProjectCardContainer from '../project/ProjectCardContainer';
import api from '../../hooks/useAxiosInterceptor';
import { useSelector } from 'react-redux';
import { tablet } from '../../static/theme';
import ProjectCardSkeleton from '../project/ProjectCardSkeleton';
import EmptyData from './EmptyData';


export const StyleDetailBody = styled.div`
    width:100%; 
    gap:3rem;
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
            
        }
    }
`

const myProjectCard = [
    {
        projectCardId : 1,
        tag : ["java"],
        tell : "010-1234-5678",
        aboutMe : "저는 개발 공부중인 학생입니다.",
        img : null,
        memberId : 6,
        userName : '박찬섭',
        email : 'cksk49@naver.com',
        working : false,
    },
    {
        projectCardId : 2,
        tag : ["javascript"],
        tell : "010-1234-5678",
        aboutMe : "저는 학생입니다.",
        img : null,
        memberId : 6,
        userName : '박찬섭2',
        email : 'cksk49@naver.com',
        working : false,
    },
]

export default function DetailBody({
    detailData,
    type,
    isAdmin,
    updateHandler,
    projectId,
    portfolioId,
}) {
    
    const [isOnProjectCard, setIsOnProjectCard] = useState(false);
    const [ownProjectCardList, setOwnProjectCardList] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [isPossibleApply, setIsPossibleApply] = useState(false);
    const [isOnStateAlert, setIsOnStateAlert] = useState(false);
    const [apiResult,setApiResult] = useState(false);
    const [isApiLoading, setIsApiLoading] = useState(true);

    const loginUserData = useSelector(state=>state.user);

    const cancleProjectApply = (projectId,setApiResult) => {
        api.delete(`/projects/cancle/${projectId}`)
        .then(res=>{
            setApiResult(true);
        })
        .catch(err=>{
            setApiResult(false);
        })
    }

    const getOwnProjectCard = (memberId) => {
        setIsOnProjectCard(true);
        if(ownProjectCardList) {
            setIsOnProjectCard(true);
        } else {
            setIsApiLoading(true);
            api.get(`/projectcards/${memberId}`)
            .then(res=>{
                console.log(res.data);
                setOwnProjectCardList(res.data)
            })
            .catch(err=>{
                setApiResult(false);
            })
            .finally(()=>{
                setIsApiLoading(false);
            });
        }
    };

    const applyProjectCard = () => {
        const requestData = {};
        requestData.memberId = ownProjectCardList[selectedCard].memberId;
        requestData.projectId = Number(projectId);
        requestData.projectCardId = ownProjectCardList[selectedCard].projectCardId;
        console.log(requestData);
        api.post(`/projects/request`,requestData)
        .then(res=>{
            console.log('성공')
        })
        .catch(err=>{
            console.log('실패');
        })
    }

    useEffect(()=>{
        console.log(detailData);
        console.log(loginUserData);
        if(!isAdmin && loginUserData.isLogin) {
            for(let i = 0; i < detailData.requestPeople.length; i++) {
                if(Number(detailData.requestPeople[i]) === Number(loginUserData.userInfo.memeberId)) {
                    setIsPossibleApply(false);
                    return;
                }
            }
            setIsPossibleApply(true);
        } else {
            setIsPossibleApply(false);
        }
    },[])

    return (
        <StyleDetailBody className='row'>
            {isOnStateAlert && 
                <Modal 
                    title={'알림'}
                    body={apiResult ? '프로젝트 신청을 취소하였습니다.' : '다시 시도해 주세요.'}
                    setIsOpen={setIsOnStateAlert}
                    confirmHandler={()=>apiResult ? updateHandler : setIsOnStateAlert}
                />
            }
            {isOnProjectCard && 
            <Modal
                setIsOpen={setIsOnProjectCard}
                confirmHandler={()=>selectedCard!==null && applyProjectCard()}
            >
                {isApiLoading ?<ProjectCardSkeleton/>
                :   <ProjectCardContainer
                        isForSubmit={true}
                        selectedCard={selectedCard}
                        setSelectedCard={setSelectedCard}
                        cardList={ownProjectCardList}
                    />
                }
            </Modal>
            }
            <div className='post-data-box col'>
                    <TextBox
                        title={'개발 언어'}
                        component={<Tag text={detailData.lang} type={'project'}/>}
                    />
                    <TextBox
                        title={'검색 키워드'}
                        component={
                            detailData.tags.length === 1 && detailData.tags[0] === '' 
                            ? 
                            <p>검색 키워드 없음</p>
                            :
                            detailData.tags?.map(item=>
                                <Tag key={item} text={item} type={type}/>
                            )
                        }
                    />
                    {detailData.closedAt &&
                    <TextBox
                        title={'프로젝트 마감 날짜'}
                        component={
                            <p>{`${dateFormatter(detailData.createdAt)} ~ ${dateFormatter(detailData.closedAt)}`}</p>
                        }
                    />}
                    <TextBox
                        title={type==='project' ? '프로젝트 설명' : '포트폴리오 설명'}
                        component={
                            <p>{detailData.body}</p>
                        }
                    />
                    {detailData.description &&
                    <TextBox
                        title={'상세 요강'}
                        component={
                            <p>{`${detailData.description}`}</p>
                        }
                    />}
                    {detailData.totalPeople && 
                    <TextBox
                        title={'모집 현황'}
                        component={
                            <p>{`${detailData.totalPeople}명 / ${detailData.joinPeople ? detailData.joinPeople.length : 0}명`}</p>
                        }
                    />}
                {type === 'project' && !isAdmin && loginUserData.isLogin && 
                <div className='sticky-box'>
                    {detailData.totalPeople !== detailData.joinPeople.length ?
                    <StyleBorderButton 
                        $width={'100%'}
                        onClick={()=>{
                            if(isPossibleApply) {
                                getOwnProjectCard(loginUserData.userInfo?.memberId);
                            } else {
                                cancleProjectApply(detailData.projectId, apiResult);
                            }
                        }}
                        >{isPossibleApply ? '프로젝트 신청하기' : '프로젝트 신청 취소하기'}
                    </StyleBorderButton> :
                    <StyleBorderButton>
                        프로젝트 마감됌
                    </StyleBorderButton>
                    }
                </div>}
            </div>
            <div className='image-data-box col'>
                {detailData.images.length
                    ? detailData.images.map((item,idx)=><img key={idx} src={item} alt='이미지'></img>)
                    : <EmptyData
                        text={'등록된 이미지가 없습니다.'}
                        background={'var(--black-700)'}
                    />
                }
            </div>
        </StyleDetailBody>
    );
}


