import React, { Suspense, useEffect, useState } from 'react';
import styled from 'styled-components'
import Page from '../components/common/Page';
import DetailHead from '../components/PfPjPublic/DetailHead';
import DetailBody from '../components/PfPjPublic/DetailBody';
import { StyleBorderButton } from '../components/common/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import ProjectCardContainer from '../components/project/ProjectCardContainer';
import JoinStatusContainer from '../components/project/JoinStatusContainer';
import useNav from '../hooks/useNav';
import Modal from '../components/common/Modal';
import api from '../hooks/useAxiosInterceptor';
import { desktop, tablet } from '../static/theme';
import SuspenseDetailPage from '../components/PfPjPublic/DetailSkeletonLoading';
import ProjectCardSkeletion from './../components/project/ProjectCardSkeleton';
import JoinCardSkeleton from '../components/project/JoinCardSkeleton';

export const StyleDetailWrapper = styled(Page)`
  padding-top:6rem;
  * {
    border-radius: 6px;
    transition:all 0.2s;
  }
`

export const StyleDetailContainer = styled.div`
  width:100%;
  background-color:rgba(0,0,0,0.3);
  border-radius:10px;
  padding:4rem;
  margin-bottom:2rem;

  .join-people {
    flex:4;
    overflow:auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .request-people {
    flex:6;
    overflow:auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .vertical-line {
    margin:0 3rem;
    height:auto;
    border:3px solid var(--black-300);
    border-radius:10px;
  }

  .status {
    height:600px;
    overflow:auto;
    &::-webkit-scrollbar {
        display: none;
    }
  }

  ${desktop} {
    .status {
      flex-direction:column;
    }
    .vertical-line {
      margin:3rem 0;
    }
  }

`

const StyleStatusContainer = styled.div`
    flex:${props => props.$flex};
    > h2 {
      font-size:1.6rem;
      margin-bottom:1rem;
    }
`

const OnlyAdmin = styled.div`
  width:100%;
  justify-content:end;
  gap:2rem;
  margin-bottom:1rem;
`

const DummyData = {
  id : 1,
  title : '프론트엔드 리액트를 사용하여 프로젝트,포트폴리오 공유 프로젝트입니다.',
  totalPeople:5,
  joinPeople:[
    {
      id : 15,
    },{
      id : 16,
    },{
      id : 21,
    },
  ],
  created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
  modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
  closed_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
  language : 'JAVA',
  tag : ['테스트태그', '의미없는 태그', '의미없는 태그2'],
  body : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  titleImg : '',
  imgs : ['https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random'],
  description : '',
  author : {
    img : '',
    userName : '박찬섭', 
    id : 1,
  },
  likes : ["1", "2", "3", "4", "5"],
  requestPeople : [
    {
      id : 5,
      img : '',
      userName : '신청자1',
      email:'1234@naver.com',
      isEmploy : true,
      tag : ['java','javascript','C++'],
      hotline : '010-1234-5678',
      body : '신청합니다.'
    },
    {
      id : 6,
      img : '',
      userName : '신청자2',
      email:'1234@naver.com',
      isEmploy : false,
      tag : ['java','javascript','C++'],
      hotline : '010-1234-5678',
      body : '신청합니다.'},
    {
      id : 7,
      img : '',
      userName : '신청자3',
      email:'1234@naver.com',
      isEmploy : true,
      tag : ['java','javascript','C++'],
      hotline : '010-1234-5678',
      body : '신청합니다.'
    }
  ]
}

const joinRequestPeople = {
  
}

export default function ProjectDetail() {
  const [detailData, setDetailData] = useState({});
  const [requestPeopleData, setRequestPeopledata] = useState([]);

  //디테일페이지조회중인지 신청자현황조회중인지
  const [isOnDetail, setIsOnDetail] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isRequestLoading, setIsRequestLaoding] = useState(true);

  //삭제알림
  const [isOnDeleteModal, setIsOnDeleteModal] = useState(false);

  const {toProjectEdit} = useNav();
  const dispatch = useDispatch();
  //현재 로그인 한 유저 정보
  const loginUserData = useSelector(state=>state.user);
  const isAdmin = true;
  const fontSize = '1.6rem'

  const adminFunction = [
    {
      title : isOnDetail ? '프로젝트 조회' : '현황 조회',
      handler : ()=>{
        // requestPeopleData.length===0 && 
        fetchRequestData();
        setIsOnDetail(!isOnDetail);
      },
    },{
      title : '수정',
      handler : ()=>{toProjectEdit(detailData.id)},
    },{
      title : '삭제',
      handler : ()=>{setIsOnDeleteModal(!isOnDeleteModal)},
    }
  ]

  const fetchData = async () => {
    setIsPageLoading(true);
    return new Promise((resolve) => 
      setTimeout(()=>{
      resolve(DummyData);
    }, 1000));
  }

  const fetchRequestData = async () => {
    setIsRequestLaoding(true);
    setTimeout(()=>{
      setIsRequestLaoding(false);
      setRequestPeopledata(DummyData.requestPeople);
    }, 1000);
  }

  useEffect(()=>{
    fetchData()
    .then(res=>{
      setIsPageLoading(false);
      setDetailData(res);
    })
  },[]);

  return (
    <StyleDetailWrapper>
        {isOnDeleteModal &&
          <Modal
            setIsOpen={setIsOnDeleteModal}
            title={'정말 삭제하시겠습니까?'}
            body={'삭제된 내용은 복구할 수 없습니다.'}
          />}
        {isPageLoading ? <SuspenseDetailPage/> :
        <StyleDetailContainer className='col'>
          <DetailHead detailData={detailData} type='project'/>
          {isAdmin &&
          <OnlyAdmin className='row'>
            {adminFunction.map((item,idx)=>
              <StyleBorderButton
                key={idx}
                $fontSize={fontSize}
                onClick={item.handler}
              >
                {item.title}
              </StyleBorderButton>
            )}
          </OnlyAdmin>}
          {isAdmin && !isOnDetail ? 
          <div className='row status'>
            <StyleStatusContainer className='col' $flex={4}>
              <h2 className='status-title'>참가자 현황</h2>
              {isRequestLoading
              ? <JoinCardSkeleton/>
              : <JoinStatusContainer joinPeople={detailData.joinPeople}/>
              }
            </StyleStatusContainer>
            <div className='vertical-line'/>
            <StyleStatusContainer className='col' $flex={6}>
              <h2 className='status-title'>신청자 현황</h2>
              {isRequestLoading 
              ? <ProjectCardSkeletion/>
              : <ProjectCardContainer cardList={requestPeopleData}/>
              }
            </StyleStatusContainer>
          </div>
          : 
          <DetailBody detailData={detailData} type='project'/>
          }
        </StyleDetailContainer>
        }
    </StyleDetailWrapper>
  );
}
