import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../static/images/mockImage.png';
import LanguageTag from '../common/LanguageTag';
import useNav from '../../hooks/useNav';
import Tag from '../common/Tag';
import Like from '../common/Like';
import DateUser from '../common/DateUser';

const StylePostListItem = styled.li`
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
  const { language, titleImg, title, id, tag, likes, created_At, author } = post;

  const onDetailHandler = (id) => {
    type === 'projects' ? toProjectDetail(id) : toPortfolioDetail(id);
  };

  return (
    <StylePostListItem>
      <LanguageTag language={language} />
      <img src={titleImg || defaultImg} alt="post title img" onClick={() => onDetailHandler(id)} />
      <div className="content-box">
        <h4 onClick={() => onDetailHandler(id)}>{title}</h4>
        <div className="tag">
          {tag.map((tagItem) => (
            <Tag text={tagItem} key={tagItem} type={type} />
          ))}
        </div>
        <div className="user">
          <Like size="17px" likes={likes} postId={id} />
          <DateUser size="13px" date={created_At} user={author} />
        </div>
      </div>
    </StylePostListItem>
  );
}
