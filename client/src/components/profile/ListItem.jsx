import React from 'react';
import { styled } from 'styled-components';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ItemContainer = styled.li`
  border-bottom: 1px solid #bdbdbd6e;
  .icon {
    position: relative;
    svg {
      position: absolute;
      left: 10px;
    }
  }
`;

export default function ListItem({ data, type }) {
  const nav = useNavigate();

  const handleClickTitle = () => {
    if (type === '포트폴리오' || type === '좋아요/포트폴리오') nav(`/project/${data.postId}`);
    if (type === '프로젝트' || type === '좋아요/프로젝트') nav(`/portfolio/${data.postId}`);
  };

  const handleClickName = () => {
    nav(`/profile/${data.author.userId}`);
  };

  return (
    <ItemContainer className="row">
      <p className="title cursor" onClick={handleClickTitle}>
        {data.title}
      </p>
      <p className="cursor" onClick={handleClickName}>
        {data.author.userName}
      </p>
      <p>{data.created_At}</p>
      <p className="icon">
        <FaRegEye color="gray" />
        <span>{data.views}</span>
      </p>
      <p className="icon">
        {type === '좋아요/포트폴리오' || type === '좋아요/프로젝트' ? (
          <AiFillHeart color="red" />
        ) : data.likeList.length === 0 ? (
          <AiOutlineHeart color="red" />
        ) : (
          <AiFillHeart color="red" />
        )}
        {data.likeList.length}
      </p>
    </ItemContainer>
  );
}
