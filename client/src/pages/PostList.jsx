import { styled } from 'styled-components';
import Page from '../components/common/Page';
import { useLocation } from 'react-router';
import TextCoverOver from '../components/common/TextCoverOver';
import OneWeekTopTenList from '../components/postList/OneWeekTopTenList';
import FilterOption from '../components/postList/FilterOption';
import useFilterOption from '../hooks/useFilterOption';
import { useEffect } from 'react';

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
`;

export default function PostList() {
  const path = useLocation().pathname.split('/');
  const type = path[1];
  const [option, optionHandler] = useFilterOption();

  useEffect(() => {
    console.log('postList 요청');
  }, [option]);

  return (
    <StylePostList>
      <h3>
        <TextCoverOver text={type.toUpperCase()} fontSize="7rem" />
      </h3>
      <div className="user-action">
        <OneWeekTopTenList type={type} />
        <FilterOption option={option} optionHandler={optionHandler} type={type} />
      </div>
      <div className="infinite"></div>
    </StylePostList>
  );
}
