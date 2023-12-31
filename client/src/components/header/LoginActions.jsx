import React from 'react';
import useNav from '../../hooks/useNav';
import { StyleBorderButton } from '../common/Buttons';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../redux/userForm/userSlice';
import userDefaultImg from '../../static/images/userDefaultImg.jpeg';

export default function LoginActions({ userInfo }) {
  const { memberId, userImgUrl } = userInfo;
  const { toProfile, toAbout } = useNav();
  const dispatch = useDispatch();

  return (
    <>
      <img
        src={userImgUrl ? userImgUrl : userDefaultImg}
        alt="user profile"
        onClick={() => toProfile(memberId)}
        style={{
          cursor: 'pointer',
          marginRight: '5px',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          border: '1px solid var(--black-400)',
          objectFit: 'cover',
        }}
      />
      <StyleBorderButton
        onClick={() => {
          dispatch(deleteUser());
          toAbout();
        }}
      >
        로그아웃
      </StyleBorderButton>
    </>
  );
}
