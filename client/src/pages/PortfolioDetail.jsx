import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import DetailHead from '../components/PfPjPublic/DetailHead';
import DetailBody from '../components/PfPjPublic/DetailBody';
import { StyleBorderButton } from '../components/common/Buttons';
import { useDispatch, useSelector } from 'react-redux';
import { StyleDetailWrapper, StyleDetailContainer } from './ProjectDetail';
import Comment from '../components/portfolio/Comment';
import useNav from '../hooks/useNav';
import Modal from '../components/common/Modal';
import api from '../hooks/useAxiosInterceptor';
import SuspenseDetailPage from '../components/PfPjPublic/DetailSkeletonLoading';
import { shapingApiData } from '../utils/shapingApiData';
import { useNavigate, useParams } from 'react-router-dom';

const OnlyAdmin = styled.div`
  width: 100%;
  justify-content: end;
  gap: 2rem;
  margin-bottom: 1rem;
`;

const DummyData = {
  memberId: 1,
  userName: '한휘용',
  userImgUrl: null,
  portfolioId: 1,
  title: '제목1',
  body: '내용1',
  view: 1,
  createdAt: '2023-09-13T10:16:03.452348',
  modifiedAt: '2023-09-13T10:17:17.7792741',
  comments: [],
  tags: ['aaa', 'bbb', 'ccc'],
  lang: 'C',
  heartCount: 0,
  isComment: true,
  isEmploy: true,
};

export default function ProjectDetail() {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [detailData, setDetailData] = useState(DummyData);
  const [apiResult, setApiResult] = useState('');

  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [deleteApiResult, setDeleteApiResult] = useState(false);
  const { toPortfolioEdit, toPortfolio } = useNav();

  const loginUserData = useSelector((state) => state.user);
  const fontSize = '1.6rem';
  const { portfolioId } = useParams();

  const updateHandler = () => {
    setUpdate((prev) => !prev);
  };

  const adminFunction = [
    {
      title: '수정',
      handler: () => {
        toPortfolioEdit(detailData.portfolioId);
      },
    },
    {
      title: '삭제',
      handler: () => {
        setShowModal(true);
        setIsDeleteModal(true);
        setApiResult('해당 프로젝트를 삭제하시겠습니까?');
      },
    },
  ];

  const fetchData = () => {
    setIsLoading(true);
    api
      .get(`/portfolios/${portfolioId}`)
      .then((res) => {
        console.log(res.data.data);
        setIsLoading(false);
        setDetailData(shapingApiData(res.data.data));
      })
      .catch((err) => {
        if (err.code === 'ERR_BAD_REQUEST') {
          navigate('/404');
        } else if (err.code === 'ERR_BAD_RESPONSE') {
          console.log(err.code);
          setApiResult(false);
          setIsDeleteModal(true);
        }
      })
      .finally(() => setIsLoading(false));
  };

  const fetchDeletPortfolio = (id) => {
    setIsDeleteModal(true);
    setShowModal(true);
    api
      .delete(`/portfolios/${id}`)
      .then((res) => {
        setIsDeleteModal(false);
        setDeleteApiResult(true);
        setApiResult('포트폴리오를 삭제했습니다. 확인 버튼 클릭시 포트폴리오 리스트로 돌아갑니다.');
      })
      .catch((err) => {
        // if(err.code === 'ERR_BAD_REQUEST')
        setIsDeleteModal(false);
        setDeleteApiResult(false);
        setApiResult('포트폴리오 삭제에 실패했습니다. 다시 시도해 주세요');
      });
  };

  useEffect(() => {
    fetchData();
  }, [update]);

  useEffect(() => {
    if (loginUserData.userInfo?.memberId === detailData?.memberId) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [detailData]);

  return (
    <StyleDetailWrapper>
      {showModal && (
        <Modal
          type={isDeleteModal ? 'confirm' : 'alert'}
          setIsOpen={setShowModal}
          title={'알림'}
          body={apiResult}
          confirmHandler={() =>
            isDeleteModal
              ? fetchDeletPortfolio(portfolioId)
              : deleteApiResult
              ? toPortfolio()
              : setShowModal(false)
          }
        />
      )}
      {isLoading ? (
        <SuspenseDetailPage />
      ) : (
        <StyleDetailContainer className="col">
          <DetailHead detailData={detailData} type="portfolio" setter={setDetailData} />
          {isAdmin && (
            <OnlyAdmin className="row">
              {adminFunction.map((item, idx) => (
                <StyleBorderButton key={idx} $fontSize={fontSize} onClick={() => item.handler()}>
                  {item.title}
                </StyleBorderButton>
              ))}
            </OnlyAdmin>
          )}
          <DetailBody
            detailData={detailData}
            type="portfolio"
            isAdmin={isAdmin}
            updateHandler={updateHandler}
            portfolioId={portfolioId}
          />
        </StyleDetailContainer>
      )}
      {Number(detailData.isComment) === 1 && (
        <Comment updateHandler={updateHandler} isAdmin={isAdmin} detailData={detailData} />
      )}
    </StyleDetailWrapper>
  );
}
