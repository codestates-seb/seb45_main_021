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
  margin-top: 20px;
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

const StyleDiv = styled.div`
  flex: 1;
`;

const data1 = {
  profile: {
    userName: '유명인',
    userImgUrl: userDefaultImg,
    email: 'kimcoding@gmail.com',
    age: 50,
    tags: ['JavaScript', 'React', 'CSS'],
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
      userImg: userDefaultImg,
      working: true,
      aboutMe: '자기소개 이렇게 적는게 맞는걸까요오오오드용액 가버렷 컽컽컽 !!@!@',
      tell: '010-1111-2222',
      tags: ['JavaScript', 'React', 'CSS'],
    },
    {
      userImg: userDefaultImg,
      working: true,
      aboutMe: '내가 자신없으면 너가 뭘 할 수 있는데 으이 ?!!?',
      tell: '010-3333-2222',
      tags: [],
    },
    {},
  ],
};

export default function Profile() {
  const { memberId } = useParams();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/members/${memberId}`)
      .then((el) => {
        console.log(el.data);
        const temp = [{}, {}, {}];
        temp.map((ele, i) => {
          temp[i] = {
            ...ele,
            working: el.data.profile.working,
            userImgUrl: el.data.profile.userImgUrl,
          };
        });
        // eslint-disable-next-line array-callback-return
        el.data.projectCard.map((ele, i) => {
          temp[i] = {
            ...ele,
          };
        });
        setData({
          profile: {
            ...el.data.profile,
            tags: el.data.profile.tags,
            userImgUrl:
              el.data.profile.userImgUrl === '' ? userDefaultImg : el.data.profile.userImgUrl,
          },
          project: el.data.project,
          portfolio: el.data.portFolio,
          likeList: [el.data.portfolioHeart, el.data.projectHeart],
          projectCard: temp,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    console.log('data');
    console.log(data);
  }, [data]);

  return (
    <StyleContainer>
      {data !== null && (
        <>
          <ProfileCard id="profile" data={data.profile} isLoading={isLoading} />
          <StyleDiv>
            <Project id="project" data={data.project} isLoading={isLoading} />
            <Portfolio id="portfolio" data={data.portfolio} isLoading={isLoading} />
            {user.isLogin && Number(memberId) === user.userInfo.memberId && (
              <>
                <LikeList id="likeList" data={data.likeList} isLoading={isLoading} />
                <ProjectCard
                  id="projectCard"
                  data={data.projectCard}
                  isLoading={isLoading}
                  setData={setData}
                  trueData={data}
                />
              </>
            )}
          </StyleDiv>
          <AnchorMenu />
        </>
      )}
    </StyleContainer>
  );
}
