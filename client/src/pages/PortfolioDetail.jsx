import React, { useEffect, useState } from 'react';
import styled from 'styled-components'
import DetailHead from '../components/PfPjPublic/DetailHead';
import DetailBody from '../components/PfPjPublic/DetailBody';
import { StyleBorderButton } from '../components/common/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { StyleDetailWrapper, StyleDetailContainer } from './ProjectDetail';
import AnchorToComment from '../components/portfolio/AncholToComment';
import Comment from '../components/portfolio/Comment';
import useNav from '../hooks/useNav';

const OnlyAdmin = styled.div`
  width:100%;
  justify-content:end;
  gap:2rem;
  margin-bottom:1rem;
`

const DummyData = {
  id : 1,
  title : '내가 만든 포트폴리오',
  created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
  modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
  language : 'JAVA',
  tag : ['테스트태그', '의미없는 태그', '의미없는 태그2'],
  body : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  titleImg : '',
  imgs : ['https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random'],
  author : {
    img : '',
    userName : '박찬섭', 
    id : 1,
  },
  isComments : true,
  comments : [{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : '이종범', 
    id : 1,
    body : ', consectetur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : '유명인', 
    id : 2,
    body : 'Lorem ipsum dolor sit amet, consectetㅁ;ㅈ으맞위맞ㅇur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",  
    img : '',
    userName : 'qkrckstjq', 
    id : 3,
    body : 'Lorem ipsum dolor sit amet, conseㅁ;ㅣㅏ주이ㅏㅁ쥬ㅜ이뮤ㅜㅈ이ㅏur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : 'qkrckstjqtqwe', 
    id : 4,
    body : 'Lorem ipsum do송ㅅ료ㅓㅗㄹ효ㅓㄹ허lor sit amet, consectetur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : 'dlfknkldf', 
    id : 5,
    body : 'Lorem ipsuㅊ호ㅓㅇㅊ효ㅓㅊ효ㅓㅕm dolor sit amet, consectetur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : '박찬SDRG섭', 
    id : 6,
    body : 'Lorem ipsum dolor sitㅊ허ㅏㅊ혀ㅏ쳐 amet, consectetur'
  }],
  likes : ["1", "2", "3", "4", "5"],
}

export default function ProjectDetail() {
  const [detailData, setDetailData] = useState(DummyData);
  const dispatch = useDispatch();
  const loginUserData = useSelector(state=>state.user);
  const isAdmin = true;
  const {toPortfolioEdit} = useNav();
  // loginUserData?.userInfo === detailData.id 
  const fontSize = '1.6rem'

  useEffect(()=>{
    setDetailData({...DummyData})
  },[])

  return (
    <StyleDetailWrapper>
      <StyleDetailContainer className='col'>
        <DetailHead detailData={detailData} type='portfolio'/>
        {isAdmin && <OnlyAdmin className='row'>
          <StyleBorderButton
            $fontSize={fontSize}
            onClick={()=>toPortfolioEdit(detailData.id)}
          >수정</StyleBorderButton>
          <StyleBorderButton $fontSize={fontSize}>삭제</StyleBorderButton>
        </OnlyAdmin>}
        <DetailBody
          detailData={detailData} 
          type='portfolio'
        />
        <AnchorToComment/>
      </StyleDetailContainer>
      {detailData.isComments &&
        <Comment
          isAdmin={isAdmin}
          detailData={detailData}
        />
      }
    </StyleDetailWrapper>
  );
}
