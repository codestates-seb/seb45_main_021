import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import ProfileCard from '../components/profile/ProfileCard';
import Project from '../components/profile/Project';
import Portfolio from '../components/profile/Portfolio';
import LikeList from '../components/profile/LikeList';
import ProjectCard from '../components/profile/ProjectCard';
import Page from '../components/common/Page';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../hooks/useAxiosInterceptor';
import { desktop, mobile } from '../static/theme';
import NotFound from '../components/profile/NotFound';

const StyleContainer = styled(Page)`
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
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  ${desktop} {
    margin-left: 2rem;
  }
  @media (max-width: 850px) {
    margin-top: 2rem;
    margin-left: 0;
  }
  ${mobile} {
    margin-top: 2rem;
    margin-left: 0;
  }
`;

export default function Profile() {
  const { memberId } = useParams();
  const user = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    api
      .get(`/members/${memberId}`)
      .then((el) => {
        const temp = [{}, {}, {}];
        temp.forEach((_, i) => {
          temp[i] = {
            tags: { value: [], error: '', curString: '' },
            working: el.data.profile.working,
            userImgUrl: el.data.profile.userImgUrl,
          };
        });
        // eslint-disable-next-line array-callback-return
        el.data.projectCard.forEach((ele, i) => {
          temp[i] = {
            ...ele,
            userImgUrl: el.data.profile.userImgUrl,
            working: el.data.profile.working,
            tags: { value: ele.tags, error: '', curString: '' },
          };
        });
        setData({
          profile: el.data.profile,
          project: el.data.project,
          portfolio: el.data.portFolio,
          likeList: [el.data.portfolioHeart, el.data.projectHeart],
          projectCard: temp,
        });
      })
      .catch((error) => {
        if (error.response.status === 404) {
          setIsNotFound(true);
        }
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [memberId]);

  return (
    <StyleContainer>
      {isNotFound && <NotFound />}
      {data !== null && !isNotFound && (
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
        </>
      )}
    </StyleContainer>
  );
}
