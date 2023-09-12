import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import userDefaultImg from '../static/images/userDefaultImg.jpeg';
import ProfileCard from '../components/profile/ProfileCard';
import Project from '../components/profile/Project';
import Portfolio from '../components/profile/Portfolio';
import LikeList from '../components/profile/LikeList';
import ProjectCard from '../components/profile/ProjectCard';
import AnchorMenu from '../components/profile/AnchorMenu';
import Page from '../components/common/Page';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../hooks/useAxiosInterceptor';
import { desktop, mobile } from '../static/theme';

const StyleContainer = styled(Page)`
  gap: 2rem;
  display: flex;
  position: relative;
  overflow-x: hidden;
  ${desktop} {
    flex-direction: row;
  }
  @media (max-width: 850px) {
    flex-direction: column;
  }
  ${mobile} {
    flex-direction: column;
  }
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent !important;
    padding: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background-color: var(--black-100);
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: none;
  }
`;

const data = {
  profile: {
    userName: '유명인',
    userImg: userDefaultImg,
    email: 'kimcoding@gmail.com',
    age: 50,
    tag: ['JavaScript', 'React', 'CSS'],
    working: false,
    aboutMe: '나 안산에 사는 코딩을 공부중인 23살 명인쓰인데 리액트 잘하고 css 맛깔나게 짠다.',
    createdAt: '1999-3-3',
  },
  project: [
    [
      {
        projectId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다123123 한대 두대 세대 네대 이렇게 이녀석 ',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 100,
      },
      {
        projectId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 100,
      },
      {
        projectId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 100,
      },
      {
        projectId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 100,
      },
    ],
    [
      {
        projectId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        author: { userName: '박찬섭', memberId: 1 },
        heartCount: 100,
      },
      {
        projectId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        author: { userName: '박찬섭', memberId: 1 },
        heartCount: 100,
      },
    ],
  ],
  portfolio: [
    [
      {
        portFolioId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 232,
      },
      {
        portFolioId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 232,
      },
      {
        portFolioId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 232,
      },
      {
        portFolioId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 232,
      },
    ],
    [
      {
        portFolioId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 232,
      },
      {
        portFolioId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        createdAt: '2000-2-2',
        view: 320,
        heartCount: 232,
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
        likeList: new Array(100),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasdasdasdasd',
        created_At: '2000-12-12',
        views: 10,
        likeList: new Array(200),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasd',
        created_At: '2000-12-12',
        views: 10,
        likeList: new Array(200),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자asdasdasdasdasdasdasdasdasdsaasdasdasdasddasdasd',
        created_At: '2000-12-12',
        views: 10,
        likeList: new Array(200),
      },
    ],
    [
      {
        postId: '1',
        title: '같이 @@ 프로젝트 참여하실분 모집합니다',
        created_At: '2000-2-2',
        views: 120,
        likeList: new Array(100),
      },
      {
        postId: '2',
        title: '같이 프로젝트 함 하자',
        created_At: '2000-2-12',
        views: 560,
        likeList: new Array(200),
      },
    ],
  ],
  projectCard: [
    {
      working: true,
      email: 'dbauddls12@naver.com',
      userImg: userDefaultImg,
      userName: '유명인',
      aboutMe: '자기소개 이렇게 적는게 맞는걸까요오오오드용액 가버렷 컽컽컽 !!@!@',
      tell: '010-1111-2222',
      tag: ['JavaScript', 'React', 'CSS'],
    },
    {
      working: true,
      email: 'dbauddls12@naver.com',
      userImg: userDefaultImg,
      userName: '유명인',
      aboutMe: '내가 자신없으면 너가 뭘 할 수 있는데 으이 ?!!?',
      tell: '010-3333-2222',
      tag: [],
    },
    {},
  ],
};

export default function Profile() {
  const { memberId } = useParams();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // try {
    //   api
    //     .get(`/members/${memberId}/${user.isLogin ? user.userInfo.memberId : 0}`)
    //     .then((el) => console.log(el));
    // } catch (error) {
    //   console.log(error);
    // }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <StyleContainer>
      <ProfileCard id="profile" data={data.profile} isLoading={isLoading} />
      <div>
        <Project id="project" data={data.project} isLoading={isLoading} />
        <Portfolio id="portfolio" data={data.portfolio} isLoading={isLoading} />
        {user.isLogin && Number(memberId) === user.userInfo.memberId && (
          <>
            <LikeList id="likeList" data={data.likeList} isLoading={isLoading} />
            <ProjectCard id="projectCard" data={data.projectCard} isLoading={isLoading} />
          </>
        )}
      </div>
      <AnchorMenu />
    </StyleContainer>
  );
}
