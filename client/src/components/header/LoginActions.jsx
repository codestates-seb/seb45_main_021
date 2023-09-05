import React from 'react';
import useNav from '../../hooks/useNav';
import { StyleBorderButton } from '../common/Buttons';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/userform/userSlice';
import userDefaultImg from '../../static/images/userDefaultImg.jpeg';

export default function LoginActions({ userInfo }) {
  const { memberId, imgUrl } = userInfo;
  const { toProfile } = useNav();
  const dispatch = useDispatch();
  return (
    <>
      <img
        src={imgUrl === '' ? userDefaultImg : imgUrl}
        alt="user profile"
        onClick={() => toProfile(memberId)}
      />
      <StyleBorderButton onClick={() => dispatch(deleteUser())}>로그아웃</StyleBorderButton>
    </>
  );
}
