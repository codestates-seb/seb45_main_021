import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import styled from 'styled-components';
import TextCoverOver from '../common/TextCoverOver';
import OneWeekTopTenList from './OneWeekTopTenList';
import FilterOption from './FilterOption';
import SearchTabButton from './SearchTabButton';
import Page from '../common/Page';
import mokData from '../../static/portfolio.json';
import { useObserver } from '../../hooks/useObserver';
import useQueryClear from '../../hooks/useQueryClear';
import PostList from './PostList';
import ToTopButton from '../common/ToTopButton';
import PostSkeletonLoading from './PostSkeletonLoading';
import { desktop, tablet } from '../../static/theme.js';
const StylePostList = styled(Page)`
  .top-menu {
    margin-top: 70px;
    display: flex;
    align-items: center;
    h3 {
      flex: 1;
    }
    ${desktop} {
      margin-top: 50px;
    }
    ${tablet} {
      margin-top: 30px;
      flex-direction: column;
      align-items: start;
      gap: 10px;
    }
  }
  .user-action {
    display: flex;
    margin-top: 70px;
    ${desktop} {
      margin-top: 50px;
    }
    ${tablet} {
      margin-top: 20px;
    }
  }
  .loading {
    margin-top: 25px;
    background-color: gray;
  }
  .hidden {
    display: none;
  }
`;

export default function PostPage({ options, optionHandler, pageType, getApiUrl }) {
  const bottomTarget = useRef(null);
  const { searchType } = options;
  const firstRendering = useRef(true);
  const queryClear = useQueryClear();

  const fetchPostData = async ({ pageParam = 0 }) => {
    console.log(getApiUrl(pageParam));
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return {
      type: getApiUrl(pageParam),
      data: mokData.portfolios,
      currentPage: pageParam,
      maxPage: 4,
    };
  };

  useEffect(() => {
    if (!firstRendering.current) {
      queryClear();
    } else firstRendering.current = false;
  }, [options, pageType, searchType]);

  const { data, error, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(['posts', pageType, options], fetchPostData, {
      getNextPageParam: (lastPage) => {
        return lastPage.currentPage <= lastPage.maxPage ? lastPage.currentPage + 1 : undefined;
      },
      staleTime: 10000,
    });

  const onIntersect = ([entry]) => entry.isIntersecting && fetchNextPage();

  useObserver({
    target: bottomTarget,
    onIntersect,
  });

  const postData = data?.pages.flatMap((page) => page.data).map((el) => el);

  if (error) {
    console.log(error);
    return;
  }

  return (
    <StylePostList>
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
      </div>

      {!!postData?.length && (
        <PostList postData={postData} type={pageType === 'search' ? searchType : pageType} />
      )}
      {(isLoading || isFetchingNextPage) && <PostSkeletonLoading />}
      <div
        ref={bottomTarget}
        className={`${isFetchingNextPage || !hasNextPage ? 'hidden' : 'ref'}`}
      />
      <ToTopButton />
    </StylePostList>
  );
}
