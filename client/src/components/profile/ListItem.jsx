import React from 'react';
import { styled } from 'styled-components';
// import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
// import { FaRegEye } from 'react-icons/fa';
import useNav from '../../hooks/useNav';

const ItemContainer = styled.li`
  border-bottom: 1px solid #bdbdbd6e;
`;

export default function ListItem({ data, type }) {
  const { toProfile, toProjectDetail, toPortfolioDetail } = useNav();

  const handleClickTitle = () => {
    if (type === '포트폴리오' || type === '좋아요/포트폴리오') toPortfolioDetail(data.postId);
    if (type === '프로젝트' || type === '좋아요/프로젝트') toProjectDetail(data.postId);
  };

  const handleClickName = () => {
    toProfile(data.author.userId);
  };

  return (
    <ItemContainer className="row">
      <span className="title cursor" onClick={handleClickTitle}>
        {data.title}
      </span>
      <span className="cursor author" onClick={handleClickName}>
        {data.author.userName}
      </span>
      <span className="created_At">{data.created_At}</span>
      <span className="icon views">
        <span>{data.views}</span>
      </span>
      <span className="likes">{data.likeList.length}</span>
    </ItemContainer>
  );
}
