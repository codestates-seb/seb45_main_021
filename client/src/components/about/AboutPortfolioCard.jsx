import React from 'react';
import { styled } from 'styled-components';
import img from '../../static/images/mockImage.png';
import Filter from '../common/Filter';
import Like from '../common/Like';
import DateUser from '../common/DateUser';
import LanguageTag from '../common/LanguageTag';
import useNav from '../../hooks/useNav';
import Tag from '../common/Tag';
import EmployBadge from '../common/EmployBadge';
import { tablet } from '../../static/theme.js';

const StyleAboutPortfolioCard = styled.div`
  height: 350px;
  width: 600px;
  background-image: url(${(props) => props.$background});
  background-size: cover;
  background-color: white;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
  overflow: hidden;

  .center {
    width: 600px !important;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3rem !important;
  }
  h3 {
    cursor: pointer;
    font-size: 2rem;
    word-break: break-all;
    font-weight: var(--nanum-semi-bold);
  }
  .skill {
    display: flex;
    gap: 0.6rem;
  }
  .date {
    font-size: 1.6rem;
  }
  ${tablet} {
    width: 100% !important;
    height: 300px;
    .center {
      width: 85% !important;
    }
  }
`;

export default function AboutPortfolioCard({ portfolio }) {
  const { author, created_At, id, isEmploy, language, likes, tag, title, titleImg } = portfolio;
  const { toPortfolioDetail } = useNav();
  return (
    <StyleAboutPortfolioCard $background={titleImg || img}>
      {isEmploy && <EmployBadge />}
      <Filter $background="#00000080" />
      <LanguageTag language={language} size={'2rem'} />
      <div className="center">
        <h3 onClick={() => toPortfolioDetail(id)}>{title}</h3>
        <div className="skill">
          {tag.map((tag) => (
            <Tag key={tag} text={tag} type="portfolios" />
          ))}
        </div>
        <div className="action row">
          <Like likes={likes} postId={id} className="likes" />
          <DateUser date={created_At} user={author} size={'1.3rem'} />
        </div>
      </div>
    </StyleAboutPortfolioCard>
  );
}
