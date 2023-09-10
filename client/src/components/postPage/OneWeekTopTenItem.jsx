import React from 'react';
import useNav from '../../hooks/useNav';
import { styled } from 'styled-components';

const StyleOneWeekTopTenItem = styled.div`
  font-size: 1.3rem;
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
  const { title, id } = item;
  const { toProjectDetail, toPortfolioDetail } = useNav();
  const toDetail = () => {
    pageType === 'project' ? toProjectDetail(id) : toPortfolioDetail(id);
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
