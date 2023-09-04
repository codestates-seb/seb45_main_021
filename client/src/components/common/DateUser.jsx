import React from 'react';
import { styled } from 'styled-components';
import { dateFormatter } from '../../utils/dateFormatter';
import useNav from '../../hooks/useNav';
/**
 * 날짜를 입력받아, 2000년 0월 0일 포맷으로 리턴하는 함수입니다
 * @param {string} date - 좋아요 목록 입니다
 * @param {object} user - 유저 정보 입니다
 * @param {string} size - font size입니다

 * @returns {JSX.Element}
 */
const StyleDateUser = styled.div`
  font-size: ${(props) => props.$size || '1.6rem'};
  display: flex;
  align-items: end;
  font-weight: 700;
  gap: 1rem;
  .user {
    cursor: pointer;
  }
`;
export default function DateUser({ date, size, user }) {
  const { id, name } = user;
  const { toProfile } = useNav();
  return (
    <StyleDateUser $size={size}>
      <span className="user" onClick={() => toProfile(id)}>
        {name}
      </span>
      <span>{dateFormatter(date)}</span>
    </StyleDateUser>
  );
}
