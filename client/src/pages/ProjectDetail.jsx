import React, { useEffect, useState } from 'react';
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
import { useNavigate, useParams } from 'react-router-dom';
import { shapingApiData } from './../utils/shapingApiData';

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
  projectId : 1,
  view : 0,
  memberId : 9,
  userName : '박찬섭',
  userImgUrl : '',
  title : '안녕하세요wtrgdrgdhtfth',
  totalPeople : 6,
  createdAt : String(new Date()),
  modifiedAt : String(new Date()),
  closedAt : String(new Date()),
  body : '기획안 gfukukfhukhfkfhjukvhjm,hjmvhjmhjmvhj,vhj,vhj,vhj,vhj,vhj,vhj,hvj,vmvhjmhjmvhj,vhj,vhj,vhj,vhj,vhj,vhj,hvj,vhjhjv입니다기획안gfukukfhukhfkfhjukvhjm,hjmvhjmhjmvhj,vhj,vhj,vhj,vhj,vhj,vhj,hvj,vhjhjv입니다',
  joinPeople : 'null', 
  requestPeople : 'null',
  description : '즐겁게 해보실 분',
  lang : 'react',
  images : [
    {
      imageId : 10,
      imageUrl : 'https://source.unsplash.com/random'
    },
    {
      imageId : 11,
      imageUrl : 'https://source.unsplash.com/random'
    },
    {
      imageId : 12,
      imageUrl : 'https://source.unsplash.com/random'
    }
  ],
  projectTitleImage : {
    projectTitleImageId : 6,
    imageUrl : 'https://source.unsplash.com/random',
  },
  tags : ['테1스트','태스1트','태스3트'],
  heartCount : 6,
}

const RequestPeopleTestData = {
  joinPeople : [{
    memberId : 1,
    imgUrl : '',
    userName : '테스터'
  },{
    memberId : 2,
    imgUrl : '',
    userName : '바차서'
  }],
  requestPeople : []
}

export default function ProjectDetail() {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [requestPeopleData, setRequestPeopledata] = useState([]);
  const [error, setError] = useState(false);

  //디테일페이지조회중인지 신청자현황조회중인지
  const [isOnDetail, setIsOnDetail] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isRequestLoading, setIsRequestLaoding] = useState(true);

  //삭제알림
  const [isOnDeleteModal, setIsOnDeleteModal] = useState(false);
  const {toProjectEdit} = useNav();

  //현재 로그인 한 유저 정보
  const loginUserData = useSelector(state=>state.user);
  const fontSize = '1.6rem'
  const {projectId} = useParams()
  // console.log(loginUserData);
  // console.log(isAdmin);

  const updateHandler = () => {
    setUpdate((prev)=>!prev);
  }

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

  const fetchData = () => {
    console.log(projectId);
    setIsPageLoading(true);
    api.get(`/projects/${projectId}`)
    .then(res=>{
      console.log(shapingApiData(res.data));
      setIsPageLoading(false);
      setDetailData(shapingApiData(res.data));
    })
    .catch(err=>{
      if(err.code === 'ERR_BAD_REQUEST') {
        navigate('/404')
      } else if (err.code === 'ERR_BAD_RESPONSE'){
        console.log(err.code);
        setError(true);
        setIsOnDeleteModal(true);
      }
    })
  }

  const fetchRequestData = () => {
    setIsRequestLaoding(true);
    setTimeout(()=>{
      setIsRequestLaoding(false);
      setRequestPeopledata({...RequestPeopleTestData});
    }, 1000);
  }

  const fetchMyProjectCard = () => {
    setIsRequestLaoding(true);
    setTimeout(()=>{
      setIsRequestLaoding(false);
      setRequestPeopledata(DummyData.requestPeople);
    }, 1000);
  }

  useEffect(()=>{
    fetchData()
  },[]);

  useEffect(()=>{
    if(loginUserData.userInfo?.memberId === detailData?.memberId) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  },[detailData])

  return (
    <StyleDetailWrapper>
        {isOnDeleteModal &&
          <Modal
            setIsOpen={setIsOnDeleteModal}
            title={error ? '통신 에러' : '정말 삭제하시겠습니까?'}
            body={error ? '다시 시도해 주세요.' : '삭제된 내용은 복구할 수 없습니다.'}
            confirmHandler={error ? ()=>{navigate(-1)} : undefined}
          />}
        {isPageLoading
        ? <SuspenseDetailPage/>
        : <StyleDetailContainer className='col'>
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
              : <JoinStatusContainer joinPeople={requestPeopleData.joinPeople}/>
              }
            </StyleStatusContainer>
            <div className='vertical-line'/>
            <StyleStatusContainer className='col' $flex={6}>
              <h2 className='status-title'>신청자 현황</h2>
              {isRequestLoading 
              ? <ProjectCardSkeletion/>
              : <ProjectCardContainer cardList={requestPeopleData.requestPeople}/>
              }
            </StyleStatusContainer>
          </div>
          : 
          <DetailBody 
            detailData={detailData}
            type='project'
            isAdmin={isAdmin}
            updateHandler={updateHandler}
          />
          }
        </StyleDetailContainer>
        }
    </StyleDetailWrapper>
  );
}
