import { useEffect } from 'react';
import { styled } from 'styled-components';
import Page from '../components/common/Page';
import { useLocation } from 'react-router';
import TextCoverOver from '../components/common/TextCoverOver';
import OneWeekTopTenList from '../components/postList/OneWeekTopTenList';
import { useSelector } from 'react-redux';
import FilterOption from '../components/postList/FilterOption';

const StylePostList = styled(Page)`
  h3 {
    text-align: center;
    margin-top: 50px;
  }
  .user-action {
    margin-top: 20px;
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
  const filterOption = useSelector((state) => state.filterOption);

  return (
    <StylePostList>
      <button> hello</button>
      <h3>
        <TextCoverOver text={type.toUpperCase()} fontSize="7rem" />
      </h3>
      <div className="user-action">
        <OneWeekTopTenList type={type} />
        <FilterOption />
      </div>
      <div className="infinite"></div>
    </StylePostList>
  );
}
