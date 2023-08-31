import React from 'react';
import { styled } from 'styled-components';
import userDefaultImg from '../static/images/userDefaultImg.jpeg';
import ProfileCard from '../components/profile/ProfileCard';
import Project from '../components/profile/Project';
import Portfolio from '../components/profile/Portfolio';
import LikeList from '../components/profile/LikeList';
import ProjectCard from '../components/profile/ProjectCard';
import AnchorMenu from '../components/profile/AnchorMenu';

const StyleContainer = styled.div`
  width: 100%;
  padding-top: 2rem;
  gap: 2rem;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  position: relative;
`;

const data = {
  profile: {
    userName: '유명인',
    userImg: userDefaultImg,
    email: 'kimcoding@gmail.com',
    age: 50,
    tags: ['JavaScript', 'React', 'CSS'],
    isWorking: false,
    aboutMe: '나 안산에 사는 코딩을 공부중인 23살 명인쓰인데 리액트 잘하고 css 맛깔나게 짠다.',
    created_At: '1999.3.3',
  },
  project: [
    [
      {
        postId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        created_At: '2000-2-2',
        views: 320,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(100),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasdasdasdasd',
        created_At: '2000-12-12',
        views: 10,
        author: { userName: '박찬섭', userId: 3 },
        likeList: new Array(200),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasd',
        created_At: '2000-12-12',
        views: 10,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(200),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasd',
        created_At: '2000-12-12',
        views: 10,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(200),
      },
    ],
    [
      {
        postId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        created_At: '2000-2-2',
        views: 120,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(100),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자',
        created_At: '2000-2-12',
        views: 560,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(200),
      },
    ],
  ],
  portfolio: [
    [
      {
        postId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        created_At: '2000-2-2',
        views: 320,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(100),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasdasdasdasd',
        created_At: '2000-12-12',
        views: 10,
        author: { userName: '박찬섭', userId: 3 },
        likeList: new Array(200),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasd',
        created_At: '2000-12-12',
        views: 10,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(200),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasd',
        created_At: '2000-12-12',
        views: 10,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(200),
      },
    ],
    [
      {
        postId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        created_At: '2000-2-2',
        views: 120,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(100),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자',
        created_At: '2000-2-12',
        views: 560,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(200),
      },
    ],
  ],
  likeList: [
    [
      {
        postId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        created_At: '2000-2-2',
        views: 320,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(100),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasdasdasdasd',
        created_At: '2000-12-12',
        views: 10,
        author: { userName: '박찬섭', userId: 3 },
        likeList: new Array(200),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasd',
        created_At: '2000-12-12',
        views: 10,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(200),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasd',
        created_At: '2000-12-12',
        views: 10,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(200),
      },
    ],
    [
      {
        postId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        created_At: '2000-2-2',
        views: 120,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(100),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자',
        created_At: '2000-2-12',
        views: 560,
        author: { userName: '박찬섭', userId: 1 },
        likeList: new Array(200),
      },
    ],
  ],
  projectCard: [
    {
      isWorking: true,
      email: 'dbauddls12@naver.com',
      userImg: userDefaultImg,
      userName: '유명인',
      title: '안녕하세요 자신있는 개발자입니다.',
      aboutMe: '자기소개 이렇게 적는게 맞는걸까요오오오드용액 가버렷 컽컽컽 !!@!@',
      call: '010-1111-2222',
      tags: ['JavaScript', 'React', 'CSS'],
    },
    {
      isWorking: true,
      email: 'dbauddls12@naver.com',
      userImg: userDefaultImg,
      userName: '유명인',
      title: '안녕하세요 자신없는 개발자입니다.',
      aboutMe: '내가 자신없으면 너가 뭘 할 수 있는데 으이 ?!!?',
      call: '010-3333-2222',
      tags: [],
    },
    {},
  ],
};

export default function Profile() {
  return (
    <StyleContainer>
      <ProfileCard id="profile" data={data.profile} />
      <Project id="project" data={data.project} />
      <Portfolio id="portfolio" data={data.portfolio} />
      <LikeList id="likeList" data={data.likeList} />
      <ProjectCard id="projectCard" data={data.projectCard} />
      <AnchorMenu />
    </StyleContainer>
  );
}
