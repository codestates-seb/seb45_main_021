import React from 'react';
import styled from 'styled-components';
import LanguageTag from '../common/LanguageTag';
import useNav from '../../hooks/useNav';
import Tag from '../common/Tag';
import Like from '../common/Like';
import DateUser from '../common/DateUser';
import EmployBadge from '../common/EmployBadge';
import useLikeUpdate from '../../hooks/useLikeUpdate';
import { useSelector } from 'react-redux';

const StylePostListItem = styled.li`
  border: 1px solid var(--black-700);
  border-radius: 3px;
  overflow: hidden;
  background-color: var(--backgroundColor);
  min-height: 320px;
  transition: all.1s;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px 2px #ffffff11;
  position: relative;
  &:hover {
    box-shadow: 0 5px 10px 2px #ffffff11;
  }
  img {
    cursor: pointer;
    height: 220px;
    width: 100%;
    object-fit: cover;
  }
  .content-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 120px;
    padding: 10px;
    h4 {
      cursor: pointer;
      font-size: 1.7rem;
      font-weight: var(--nanum-semi-bold);
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .tag {
      gap: 7px;
      display: flex;
    }
    .user {
      display: flex;
    }
  }
`;
export default function PostListItem({ post, type }) {
  const { toProjectDetail, toPortfolioDetail } = useNav();
  const {
    lang,
    title,
    tags,
    heartCount,
    portfolioId,
    projectId,
    createdAt,
    isEmploy,
    userName,
    memberId,
    projectTitleImage,
    portfolioTitleImage,
  } = post;
  const options = useSelector((state) => state.filterOption);
  const likeUpdateSuccess = useLikeUpdate(options, type);
  const postId = portfolioId || projectId;

  const postTitleImage = projectTitleImage?.imageUrl || portfolioTitleImage?.imageUrl;
  const onDetailHandler = (id) => {
    type === 'projects' ? toProjectDetail(id) : toPortfolioDetail(id);
  };
  return (
    <StylePostListItem>
      {type === 'portfolios' && !!isEmploy && <EmployBadge />}
      <LanguageTag language={lang} />
      <img src={postTitleImage} alt="post title img" onClick={() => onDetailHandler(postId)} />
      <div className="content-box">
        <h4 onClick={() => onDetailHandler(postId)}>{title}</h4>
        <div className="tag">
          {tags?.map((tagItem) => (
            <Tag text={tagItem} key={postId + tagItem} type={type} />
          ))}
        </div>
        <div className="user">
          <Like
            size="17px"
            heartCount={heartCount}
            postId={postId}
            type={type}
            likeUpdateSuccess={likeUpdateSuccess}
          />
          <DateUser size="13px" date={createdAt} userName={userName} memberId={memberId} />
        </div>
      </div>
    </StylePostListItem>
  );
}
