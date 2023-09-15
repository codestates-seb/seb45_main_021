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
import NotFound from './NotFound';

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
export default function ProjectDetail() {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [requestPeopleData, setRequestPeopledata] = useState(null);
  const [apiResult, setApiResult] = useState('');

  //디테일페이지조회중인지 신청자현황조회중인지 true면 디테일 페이지 false면 신청자 참가자 조회
  const [isOnDetail, setIsOnDetail] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteApiResult, setDeleteApiResult] = useState(false);
  const [requestUpdate, setRequestUpdate] = useState(undefined);
  const {toProjectEdit, toProject} = useNav();

  //현재 로그인 한 유저 정보
  const loginUserData = useSelector(state=>state.user);
  const fontSize = '1.6rem'
  const {projectId} = useParams()

  const updateHandler = () => {
    setUpdate((prev)=>!prev);
  }

  const requestUpdateHandler = () => {
    setRequestUpdate((prev)=>!prev);
  }

  const adminFunction = [
    {
      title : isOnDetail ? '현황 조회' : '프로젝트 조회',
      handler : ()=>{
        // requestPeopleData.length===0 && 
        fetchRequestData();
        setIsOnDetail(!isOnDetail);
      },
    },{
      title : '수정',
      handler : ()=>{
        toProjectEdit(detailData.projectId)
      },
    },{
      title : '삭제',
      handler : ()=>{
        setShowModal(true);
        setIsDeleteModal(true);
        setApiResult('해당 프로젝트를 삭제하시겠습니까?');
      },
    }
  ]

  const fetchData = () => {
    setIsLoading(true);
    api.get(`/projects/${projectId}`)
    .then(res=>{
      console.log(shapingApiData(res.data));
      setIsLoading(false);
      setDetailData(shapingApiData(res.data));
    })
    .catch(err=>{
      if(err.code === 'ERR_BAD_REQUEST') {
        setApiResult(false);
      } else if (err.code === 'ERR_BAD_RESPONSE'){
        console.log(err.code);
        setApiResult(false);
        setIsDeleteModal(true);
      }
    })
    .finally(()=>setIsLoading(false));
  }

  const fetchRequestData = () => {
      setIsLoading(true);
      api.get(`projects/${projectId}/application-status`)
      .then(res=>{
        setRequestPeopledata(res.data);
      })
      .catch(err=>{
        setShowModal(true);
        setApiResult(true);
      })
      .finally(()=>{
        setIsLoading(false);
      })
  }

  const fetchDeleteProject = (id) => {
    setIsDeleteModal(true);
    setShowModal(true);
    api.delete(`/projects/${id}`)
    .then(res=>{
      setIsDeleteModal(false);
      setDeleteApiResult(true);
      setApiResult('프로젝트를 삭제했습니다. 확인 버튼 클릭시 프로젝트 리스트로 돌아갑니다.')
    })
    .catch(err=>{
      setIsDeleteModal(false);
      setDeleteApiResult(false);
      if(err.code === 'ERR_BAD_RESPONSE') {
        setApiResult('프로젝트에 신청한 사람이 존재하거나 참가한 사람이 있으면 삭제 할 수 없습니다.')  
      } else {
        setApiResult('프로젝트 삭제에 실패했습니다. 다시 시도해 주세요')
      }
      setShowModal(true);
    })
    .finally(()=>setShowModal(true));
  }

  useEffect(()=>{
    fetchData();
  },[update]);

  useEffect(()=>{
    if (requestUpdate !== undefined) {
      console.log('리퀘스트 업데이트')
      fetchRequestData(); 
    }
  },[requestUpdate])

  useEffect(()=>{
    if(loginUserData.userInfo?.memberId === detailData?.memberId) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  },[detailData])

  

  return (
    <>
    {apiResult === false ? <NotFound/> :
    <StyleDetailWrapper>
        {showModal &&
          <Modal
            type={isDeleteModal ? 'confirm' : 'alert'}
            setIsOpen={setShowModal}
            title={'알림'}
            body={apiResult}
            confirmHandler={()=>isDeleteModal ? fetchDeleteProject(projectId) : deleteApiResult ? toProject() : setShowModal(false)}
          />}
        {isLoading
        ? <SuspenseDetailPage/>
        : <StyleDetailContainer className='col'>
          <DetailHead detailData={detailData} type='project'/>
          {isAdmin &&
          <OnlyAdmin className='row'>
            {adminFunction.map((item,idx)=>
              <StyleBorderButton
                key={idx}
                $fontSize={fontSize}
                onClick={()=>item.handler()}
              >
                {item.title}
              </StyleBorderButton>
            )}
          </OnlyAdmin>}
          {isAdmin && !isOnDetail ? 
          <div className='row status'>
            <StyleStatusContainer className='col' $flex={4}>
              <h2 className='status-title'>참가자 현황</h2>
              {isLoading
              ? <JoinCardSkeleton/>
              : <JoinStatusContainer joinPeople={requestPeopleData.joinPeople}/>
              }
            </StyleStatusContainer>
            <div className='vertical-line'/>
            <StyleStatusContainer className='col' $flex={6}>
              <h2 className='status-title'>신청자 현황</h2>
              {isLoading
              ? <ProjectCardSkeletion/>
              : <ProjectCardContainer
                  detailData={detailData}
                  cardList={requestPeopleData.requestPeople}
                  requestUpdateHandler={requestUpdateHandler}
                />
              }
            </StyleStatusContainer>
          </div>
          : 
          <DetailBody 
            detailData={detailData}
            type='project'
            isAdmin={isAdmin}
            updateHandler={updateHandler}
            projectId={projectId}
          />
          }
        </StyleDetailContainer>
        }
    </StyleDetailWrapper>
    }
    </>
  );
}
