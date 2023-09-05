import React, { useState } from 'react';
import styled from 'styled-components';
import Page from '../components/common/Page';
import WriteHeader from '../components/project/WriteHeader';
import Language from './../components/common/LanguageTag';
import DetailHead from '../components/project/DetailHead';
import DetailBody from '../components/project/DetailBody';

const StyleProjectDetailWrapper = styled(Page)`
  padding-top: 6rem;
  height: 500rem;
`;

const StyleProjectDetailContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--black-800);
  border-radius: 10px;
  padding: 4rem;
`;

const DummyData = {
  id: 1,
  title: '프론트엔드 리액트를 사용하여 프로젝트,포트폴리오 공유 프로젝트입니다.',
  totalPeople: '5',
  joinPeople: [
    {
      userName: '박찬섭',
      memberId: 1,
    },
    {
      userName: '박찬섭2',
      memberId: 2,
    },
    {
      userName: '박찬섭3',
      memberId: 3,
    },
  ],
  requestPeople: [{}, {}, {}],
  created_At: 'Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)',
  modified_At: 'Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)',
  closed_At: 'Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)',
  language: 'JAVA',
  tag: ['테스트태그', '의미없는 태그', '의미없는 태그2'],
  body: '',
  titleImg: '',
  imgs: '',
  description: '',
  author: {
    img: '',
    userName: '박찬섭',
    id: 1,
  },
  likes: ['1', '2', '3', '4', '5'],
};

// {
//   "titleImg": "",
//   "title": "리액트를 활용한, 신세대 프로젝트입니다 반갑습니다",
//   "created_At": "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
//   "id": "3",
//   "language": "C#",
//   "tag": ["React", "vue", "Angular"],
//   "author": {
//     "id": "1",
//     "img": "",
//     "name": "명인입니다"
//   },
//   "likes": ["1", "2", "3", "4", "5"],
//   "isEmploy": true
// },

export default function ProjectDetail() {
  const [detailData, setDetailData] = useState(DummyData);
  return (
    <StyleProjectDetailWrapper>
      <StyleProjectDetailContainer className="col">
        <DetailHead detailData={detailData} />
        <DetailBody />
      </StyleProjectDetailContainer>
    </StyleProjectDetailWrapper>
  );
}
