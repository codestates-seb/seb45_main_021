import React from 'react';
import useNav from '../../hooks/useNav';
import { styled } from 'styled-components';

const StyleOneWeekTopTenItem = styled.div`
  font-size: 1.4rem;
  display: flex;
  font-weight: var(--nanum-semi-bold);
  gap: 3px;
  text-align: start !important;
  padding-top: 2px;
  display: flex;
  padding-top: 13px;
  .title {
    cursor: pointer;
  }
`;

export default function OneWeekTopTenItem({ item, ranking, pageType }) {
  const { projectId, portfolioId, title } = item;
  const { toProjectDetail, toPortfolioDetail } = useNav();

  const toDetail = () => {
    pageType === 'projects' ? toProjectDetail(projectId) : toPortfolioDetail(portfolioId);
  };

  return (
    <StyleOneWeekTopTenItem>
      <span>{ranking}.</span>
      <span className="title" onClick={toDetail}>
        {title}
      </span>
    </StyleOneWeekTopTenItem>
  );
}
