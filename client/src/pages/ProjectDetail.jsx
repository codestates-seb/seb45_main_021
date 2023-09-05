import React, { useState } from 'react';
import styled from 'styled-components'
import Page from '../components/common/Page';
import DetailHead from '../components/project/DetailHead';
import DetailBody from '../components/project/DetailBody';
import { StyleBorderButton } from '../components/common/Buttons';
import { useDispatch, useSelector } from 'react-redux';

const StyleProjectDetailWrapper = styled(Page)`
  padding-top:6rem;
  height:500rem;
  * {
        border-radius: 6px;
        transition:all 0.2s;
  }
`

const StyleProjectDetailContainer = styled.div`
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.3);
  border-radius:10px;
  padding:4rem;
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
  closed_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
  language : 'JAVA',
  tag : ['테스트태그', '의미없는 태그', '의미없는 태그2'],
  body : '우리가 준비한 프로젝트는 이렇고 저렇고 어쩌고 저쩌고우리가 준비한 프로젝트는 이렇고 저렇고 어쩌고 저쩌고우리가 준비한 프로젝트는 이렇고 저렇고 어쩌고 저쩌고우리가 준비한 프로젝트는 이렇고 저렇고 어쩌고 저쩌고우리가 준비한 프로젝트는 이렇고 저렇고 어쩌고 저쩌고우리가 준비한 프로젝트는 이렇고 저렇고 어쩌고 저쩌고우리가 준비한 프로젝트는 이렇고 저렇고 어쩌고 저쩌고우리가 준비한 프로젝트는 이렇고 저렇고 어쩌고 저쩌고우리가 준비한 프로젝트는 이렇고 저렇고 어쩌고 저쩌고',
  titleImg : '',
  imgs : ['https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random'],
  description : '',
  author : {
    img : '',
    userName : '박찬섭', 
    id : 1,
  },
  likes : ["1", "2", "3", "4", "5"],
}

export default function ProjectDetail() {
  const [detailData, setDetailData] = useState(DummyData);
  const dispatch = useDispatch();
  const loginUserData = useSelector(state=>state.user);
  const isAdmin = true;
  // loginUserData?.userInfo === detailData.id
  
  // const loginUserData = 
  const fontSize = '1.6rem'

  return (
    <StyleProjectDetailWrapper>
      <StyleProjectDetailContainer className='col'>
        <DetailHead detailData={detailData}/>
        <DetailBody/>
        {isAdmin && <OnlyAdmin className='row'>
          <StyleBorderButton $fontSize={fontSize}>참여 현황</StyleBorderButton>
          <StyleBorderButton $fontSize={fontSize}>수정</StyleBorderButton>
          <StyleBorderButton $fontSize={fontSize}>삭제</StyleBorderButton>
        </OnlyAdmin>}
        <DetailBody detailData={detailData}/>
      </StyleProjectDetailContainer>
    </StyleProjectDetailWrapper>
  );
}
