import React, { useState } from 'react';
import styled from 'styled-components'
import Page from '../components/common/Page';
import DetailHead from '../components/PfPjPublic/DetailHead';
import DetailBody from '../components/PfPjPublic/DetailBody';
import { StyleBorderButton } from '../components/common/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import ApplyStatusContainer from '../components/project/ApplyStatusContainer';

export const StyleDetailWrapper = styled(Page)`
  padding-top:6rem;
  height:500rem;
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
`

const OnlyAdmin = styled.div`
  width:100%;
  justify-content:end;
  gap:2rem;
  margin-bottom:1rem;
`

const ApplyButton = styled.button`
  border: 2px solid ${(props) => (props.$borderColor ? props.$borderColor : 'var(--black-100)')};
  border-radius: 4px;
  position: relative;
  color: ${(props) => (props.$color ? props.$color : '')};
  font-size: ${(props) => (props.$fontSize ? props.$fontSize : '')};
  width: ${(props) => (props.$width ? props.$width : '')};
  height: ${(props) => (props.$height ? props.$height : '')};
  overflow: visible;
  opacity: 0.8;
  transition: all.2s;
`

const DummyData = {
  id : 1,
  title : '프론트엔드 리액트를 사용하여 프로젝트,포트폴리오 공유 프로젝트입니다.',
  totalPeople:5,
  joinPeople:['1','2','3'],
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
      body : '신청합니다.'},
  ]
}

export default function ProjectDetail() {
  const [detailData, setDetailData] = useState(DummyData);
  const dispatch = useDispatch();
  const loginUserData = useSelector(state=>state.user);
  const isAdmin = true;
  
  // loginUserData?.userInfo.id === detailData.id
  
  // const loginUserData = 
  const fontSize = '1.6rem'

  return (
    <StyleDetailWrapper>
      <StyleDetailContainer className='col'>
        <DetailHead detailData={detailData} type='project'/>
        {isAdmin && <OnlyAdmin className='row'>
          <ApplyButton $fontSize={fontSize}>신청 현황 조회하기
            <ApplyStatusContainer requestPeople={detailData.requestPeople}/>
          </ApplyButton>
          <StyleBorderButton $fontSize={fontSize}>수정</StyleBorderButton>
          <StyleBorderButton $fontSize={fontSize}>삭제</StyleBorderButton>
        </OnlyAdmin>}
        <DetailBody detailData={detailData} type='project'/>
      </StyleDetailContainer>
    </StyleDetailWrapper>
  );
}
