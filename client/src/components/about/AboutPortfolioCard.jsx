import React from 'react';
import { styled } from 'styled-components';
import Filter from '../common/Filter';
import Like from '../common/Like';
import DateUser from '../common/DateUser';
import LanguageTag from '../common/LanguageTag';
import useNav from '../../hooks/useNav';
import Tag from '../common/Tag';
import EmployBadge from '../common/EmployBadge';

const StyleAboutPortfolioCard = styled.div`
  height: 350px;
  width: 100%;
  background-image: url(${(props) => props.$background.imageUrl});
  background-size: cover;
  background-color: white;
  margin: 0 auto;
  border-radius: 5px;
  position: relative;
  overflow: hidden;
  transition: all.2s;
  .center {
    width: 600px !important;
    height: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 3rem !important;
  }
  h3 {
    cursor: pointer;
    line-height: 1.2;
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
  width: 100% !important;
  .center {
    width: 85% !important;
  }
  .date-user {
    line-height: 1.2;
  }
`;

export default function AboutPortfolioCard({ portfolio, setPortfolios }) {
  const {
    lang,
    title,
    tags,
    heartCount,
    portfolioId,
    createdAt,
    isEmploy,
    userName,
    memberId,
    portfolioTitleImage,
  } = portfolio;
  const { toPortfolioDetail } = useNav();
  const likeUpdateSuccess = (postId, updateType) => {
    const updatedHeartCount = updateType === 'increase' ? heartCount + 1 : heartCount - 1;
    setPortfolios((pre) =>
      pre.map((post) =>
        post.portfolioId === postId ? { ...post, heartCount: updatedHeartCount } : post,
      ),
    );
  };
  return (
    <StyleAboutPortfolioCard $background={portfolioTitleImage} className="about-card">
      {isEmploy && <EmployBadge />}
      <Filter $background="#00000080" />
      <LanguageTag language={lang} size={'2rem'} />
      <div className="center">
        <h3 onClick={() => toPortfolioDetail(portfolioId)}>{title}</h3>
        <div className="skill">
          {tags.map((tag) => (tag ? <Tag key={tag} text={tag} type="portfolios" /> : ''))}
        </div>
        <div className="action row">
          <Like
            size="17px"
            heartCount={heartCount}
            postId={portfolioId}
            type="portfolios"
            likeUpdateSuccess={likeUpdateSuccess}
            className="likes"
          />
          <DateUser size="13px" date={createdAt} userName={userName} memberId={memberId} />
        </div>
      </div>
    </StyleAboutPortfolioCard>
  );
}
