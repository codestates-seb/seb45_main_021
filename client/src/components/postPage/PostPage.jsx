import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import TextCoverOver from '../common/TextCoverOver';
import OneWeekTopTenList from './OneWeekTopTenList';
import FilterOption from './FilterOption';
import SearchTabButton from './SearchTabButton';
import Page from '../common/Page';
import { useObserver } from '../../hooks/useObserver';
import PostList from './PostList';
import ToTopButton from '../common/ToTopButton';
import PostSkeletonLoading from './PostSkeletonLoading';
import CheckBox from '../common/CheckBox';
import { desktop, tablet, mobile } from '../../static/theme.js';
import { StyleBackgroundButton } from '../common/Buttons';
import Modal from '../common/Modal';
import useNav from '../../hooks/useNav';
import { useSelector } from 'react-redux';
import usePostListQuery from '../../hooks/usePostListQuery';
import scollToTop from '../../utils/scrollToTop';

const StylePostList = styled(Page)`
  .top-menu {
    margin-top: 70px;
    display: flex;
    align-items: center;
    h3 {
      flex: 1;
      ${mobile} {
        span {
          font-size: 4rem;
        }
      }
    }
    ${desktop} {
      margin-top: 50px;
    }
    ${tablet} {
      margin-top: 30px;
      flex-direction: column;
      align-items: start;
      gap: 30px;
      h3 {
        margin: auto;
      }
    }
  }
  .user-action {
    margin: 40px 0 20px;
    & > div:nth-child(2) {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }
  }
  .hidden {
    display: none;
  }
  .not-found {
    font-size: 3rem;
    padding-top: 15%;
    text-align: center;
    color: var(--black-500);
    font-weight: var(--nanum-bold);
  }
`;

export default function PostPage({ options, optionHandler, pageType, getApiUrl }) {
  const bottomTarget = useRef(null);
  const { searchType } = options;
  const isPagePortfolios = pageType === 'portfolios' || searchType === 'portfolios';
  const [isOpen, setIsOpen] = useState(false);
  const { toSignin, toProjectWrite, toPortfolioWrite } = useNav();
  const { isLogin } = useSelector((state) => state.user);

  // Infinite Query 사용하여 데이터 가져오기
  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    usePostListQuery(options, pageType, getApiUrl);

  // Intersection Observer 사용하여 Infinite Scroll 구현
  const onIntersect = ([entry]) => {
    if ((entry.isIntersecting, !isFetchingNextPage)) {
      fetchNextPage();
    }
  };
  useObserver({ target: bottomTarget, onIntersect });

  // 데이터가 있을 때만 PostList 표시
  const postData = data?.pages.flatMap((page) => page.data).map((el) => el);

  useEffect(() => {
    window.onbeforeunload = () => scollToTop();
  }, []);

  const writeButtonHandler = () => {
    if (isLogin) isPagePortfolios ? toPortfolioWrite() : toProjectWrite();
    else setIsOpen(true);
  };

  if (error) {
    console.error(error, 'axios error');
    return;
  }

  const isNotFound = !isLoading && !isFetchingNextPage && !postData.length;
  const isDataFetching = isLoading || isFetchingNextPage;
  const hasData = !!postData?.length;

  return (
    <StylePostList>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          title="로그인이 필요한 서비스입니다."
          body="로그인 페이지로 이동하시겠습니까?"
          confirmHandler={toSignin}
        />
      )}
      <div className="top-menu">
        <h3>
          <TextCoverOver
            text={pageType === 'search' ? options.keyword : pageType.toUpperCase()}
            fontSize="5rem"
          />
        </h3>
        {pageType !== 'search' ? (
          <OneWeekTopTenList pageType={pageType} />
        ) : (
          <SearchTabButton
            searchType={searchType}
            optionHandler={optionHandler}
            options={options}
          />
        )}
      </div>
      <div className="user-action">
        <FilterOption
          options={options}
          optionHandler={optionHandler}
          pageType={pageType === 'search' ? searchType : pageType}
        />
        <div>
          {isPagePortfolios && (
            <CheckBox
              value={options.employ}
              boxSize="25px"
              label="구직용 포트폴리오 모아보기"
              onChange={(value) => optionHandler('employ', value)}
            />
          )}
          <StyleBackgroundButton
            $padding="10px 15px"
            $margin="0 0 0 auto"
            onClick={writeButtonHandler}
          >
            글 작성
          </StyleBackgroundButton>
        </div>
      </div>
      {hasData && (
        <PostList postData={postData} type={pageType === 'search' ? searchType : pageType} />
      )}
      {isDataFetching && <PostSkeletonLoading />}
      {isNotFound && <div className="not-found">검색결과가 없습니다</div>}
      <div
        ref={bottomTarget}
        className={`${isFetchingNextPage || !hasNextPage ? 'hidden' : 'ref'}`}
      />
      <ToTopButton />
    </StylePostList>
  );
}
