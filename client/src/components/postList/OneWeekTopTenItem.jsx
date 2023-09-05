import React from 'react';
import useNav from '../../hooks/useNav';
import { styled } from 'styled-components';

const StyleOneWeekTopTenItem = styled.div`
  font-size: 1.3rem;
  display: flex;
  font-weight: var(--nanum-semi-bold);
  gap: 3px;
  text-align: start !important;
  &:not(:last-child) {
    margin-bottom: 25px;
  }
  .title {
    cursor: pointer;
    border-bottom: 1px solid transparent;
    &:hover {
      border-color: var(--black-100);
    }
  }
`;
export default function OneWeekTopTenItem({ item, ranking, type }) {
  const { title, id } = item;
  const { toProjectDetail, toPortfolioDetail } = useNav();
  const toDetail = () => {
    type === 'project' ? toProjectDetail(id) : toPortfolioDetail(id);
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