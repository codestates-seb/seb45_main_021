import React from 'react';
import { styled } from 'styled-components';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaRegEye } from 'react-icons/fa';
import useNav from '../../hooks/useNav';
import Skeleton from '@mui/material/Skeleton';

const ItemContainer = styled.tr`
  border-bottom: 1px solid #bdbdbd6e;
`;

export default function ListItem({ data, type }) {
  const { toProfile, toProjectDetail, toPortfolioDetail } = useNav();

  const handleClickTitle = () => {
    if (type === '포트폴리오' || type === '좋아요/포트폴리오') toPortfolioDetail(data.portFolioId);
    if (type === '프로젝트' || type === '좋아요/프로젝트') toProjectDetail(data.projectId);
  };

  const handleClickName = () => {
    toProfile(data.author.merberId);
  };

  return (
    <ItemContainer>
      <td className="title cursor" onClick={handleClickTitle}>
        {data.title}
      </td>
      {data.author?.userName && (
        <td className="cursor author" onClick={handleClickName}>
          {data.author.userName}
        </td>
      )}
      <td className="created_At">{data.createdAt}</td>
      <td className="views">
        <FaRegEye color="gray" size="20" />
        <span>{data.view}</span>
      </td>
      <td className="likes">
        <AiOutlineHeart color="gray" size="20" />
        <span>{data.heartCount}</span>
      </td>
    </ItemContainer>
  );
}
