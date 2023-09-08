import TextCoverOver from '../common/TextCoverOver';
import OneWeekTopTenList from './OneWeekTopTenList';
import FilterOption from './FilterOption';
import styled from 'styled-components';
import Page from '../common/Page';
import { useNavigate } from 'react-router';
import { useEffect, useRef, useState } from 'react';
import SearchTabButton from '../search/SearchTabButton';
import mokData from '../../static/portfolio.json';

const StylePostList = styled(Page)`
  h3 {
    text-align: center;
    margin-top: 50px;
  }
  .user-action {
    margin-top: 50px;
    position: relative;
  }
  .infinite {
    border: 1px solid white;
    margin-top: 120px;
    height: 1000px;
  }
  .content {
    height: 200px;
    margin: 10px;
    box-sizing: content-box;
    background-color: #2d2d2d;
  }
  .loading {
    height: 700px;
    background-color: gray;
  }
  .hidden {
    display: none;
  }
`;

export default function PostPage({ options, optionHandler, pageType, getApiUrl }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [pageCount, setPageCount] = useState({ currentPage: 0, maxPage: 0 });
  const { searchType } = options;
  const [postData, setPostData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { currentPage, maxPage } = pageCount;

  useEffect(() => {
    setPageCount((prevCount) => ({ ...prevCount, currentPage: 0 }));
    setPostData([]);
  }, [options, pageType, options.searchType]);

  useEffect(() => {
    console.log('데이터 요청', getApiUrl(currentPage), currentPage);
    setIsLoading(true);
    setTimeout(() => {
      setPostData((prevData) => [...prevData, ...mokData.portfolios]);
      setIsLoading(false);
      setPageCount((prevCount) => ({ ...prevCount, maxPage: 4 }));
    }, 1000);
  }, [currentPage]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        console.log(maxPage, currentPage);
        if (entry.isIntersecting) {
          setPageCount((prevCount) => ({ ...prevCount, currentPage: prevCount.currentPage + 1 }));
          console.log('스크롤 이벤트 감지');
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <StylePostList>
      {pageType === 'search' ? (
        <SearchTabButton searchType={searchType} optionHandler={optionHandler} options={options} />
      ) : (
        <h3>
          <TextCoverOver text={pageType.toUpperCase()} fontSize="7rem" />
        </h3>
      )}
      <div className="user-action">
        {pageType !== 'search' && <OneWeekTopTenList pageType={pageType} />}
        <FilterOption
          options={options}
          optionHandler={optionHandler}
          pageType={pageType === 'search' ? searchType : pageType}
        />
      </div>
      {postData.map((el, i) => (
        <div key={i} className="content" onClick={() => navigate(`/project/detail/${el.id}`)}>
          {el.title}
        </div>
      ))}
      {isLoading && <div className="loading">로딩중입니다</div>}
      <div ref={containerRef} className={`${isLoading || maxPage <= currentPage ? 'hidden' : ''}`}>
        scroll감지 박스
      </div>
    </StylePostList>
  );
}
