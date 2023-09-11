import React, { useState } from 'react';
import { styled } from 'styled-components';
import useNav from '../../hooks/useNav';
import { useParams } from 'react-router-dom';
import api from '../../hooks/useAxiosInterceptor';
import { deleteUser } from '../../redux/userform/userSlice';
import { useDispatch } from 'react-redux';
import ShowProfile from './ShowProfile';
import { isValidPassword } from './isValid';
import { desktop, mobile } from '../../static/theme';

const StyleProfileContainer = styled.div`
  display: flex;
  position: relative;
  background-color: #00000046;
  padding-top: 2rem;
  .label {
    font-size: 2.5rem;
    margin-bottom: 10px;
    font-weight: 700;
  }

  .alignItem {
    align-items: center;
  }
  .tagGap {
    gap: 1rem;
  }
  .imgWrapper {
    position: relative;
    margin: auto auto;
  }
  .userImg {
    width: 200px;
    height: 200px;
    border-radius: 20px;
  }
  .editImg {
    position: absolute;
    width: 40px;
    height: 40px;
    bottom: -15px;
    right: -15px;
    border-radius: 50%;
    background-color: #b7b7b7e4;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s;
    cursor: pointer;
    &:active {
      transform: translateY(2px);
    }
    svg {
      cursor: pointer;
    }
  }
  .ProfileEdit {
    width: 100%;
    height: 100%;
  }
  .infoContainer {
    position: relative;
    ${desktop} {
      width: 260px;
    }
    @media (max-width: 850px) {
      width: 100%;
    }
    ${mobile} {
      width: 100%;
    }
    gap: 2rem;
    position: relative;
    h3 {
      font-size: 3rem;
      font-weight: 700;
    }
    .editwrapper {
      color: var(--error);
      gap: 2rem;
      justify-content: space-between;
      p {
        cursor: pointer;
        margin-top: 2rem;
        font-size: 2rem;
        font-weight: 700;
      }
    }
    .gap {
      gap: 1rem;
    }
    .infoInner {
      position: relative;
      padding: 1rem;
      .info {
        height: 100%;
        gap: 2rem;
        font-size: 2rem;
        display: flex;
        justify-content: space-between;
        p {
          word-wrap: break-word;
          overflow-wrap: break-word;
          font-family: var(--nanum);
        }
      }
    }
  }
`;

export default function ProfileCard({ id, data, isLoading }) {
  const { toAbout, toProfile } = useNav();
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    email: data.email,
    userName: data.userName,
    userImg: data.userImg,
    working: data.working,
    age: data.age,
    tag: data.tag,
    aboutMe: data.aboutMe,
    createdAt: data.createdAt,
  });
  const [editProfile, setEditProfile] = useState({
    aboutMe: {
      value: profile.aboutMe,
      error: '',
    },
    userName: {
      value: profile.userName,
      error: '',
    },
    age: {
      value: profile.age,
    },
    tag: {
      value: profile.tag,
      curString: '',
    },
    working: {
      value: profile.working,
    },
  });
  const [editPassword, setEditPassword] = useState({
    prevPassword: {
      value: '',
      error: '',
    },
    newPassword: {
      value: '',
      error: '',
    },
    newPassword2: {
      value: '',
      error: '',
    },
  });

  const handleTagKeyDown = (e) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();
    if (editProfile.tag.curString.length <= 10 && editProfile.tag.curString.length > 0) {
      if (
        editProfile.tag.value.length <= 2 &&
        editProfile.tag.value.filter(
          (el) => el.toLowerCase() === editProfile.tag.curString.toLowerCase(),
        ).length === 0
      ) {
        setEditProfile({
          ...editProfile,
          tag: {
            value: [...editProfile.tag.value, editProfile.tag.curString],
            curString: '',
          },
        });
      }
    }
  };

  const handleEditProfile = () => {
    console.log('프로필 수정 요청');
    try {
      const responseBody = {
        aboutMe: editProfile.aboutMe.value,
        userName: editProfile.userName.value,
        age: editProfile.age.value,
        tag: editProfile.tag.value,
        working: editProfile.working.value,
      };
      api.patch(`members/${memberId}`, responseBody).then(() => {
        console.log('프로필 수정 성공');
        toProfile(memberId);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditPassword = async (e) => {
    e.preventDefault();
    console.log('비밀번호 수정 요청');
    try {
      if (
        editPassword.newPassword === editPassword.newPassword2 &&
        isValidPassword(editPassword.prevPassword) &&
        isValidPassword(editPassword.newPassword) &&
        isValidPassword(editPassword.newPassword2)
      ) {
        setEditPassword({
          ...editPassword,
          prevPassword: { ...editPassword.prevPassword, error: '' },
          newPassword: { ...editPassword.newPassword, error: '' },
          newPassword2: { ...editPassword.newPassword, error: '' },
        });
        api
          .patch(`/members/password/${memberId}`, {
            prevPassword: editPassword.prevPassword,
            newPassword: editPassword.newPassword,
          })
          .then((el) => {
            alert('비밀번호 변경이 완료되었습니다');
          });
      } else if (!(editPassword.newPassword === editPassword.newPassword2)) {
        setEditPassword({
          ...editPassword,
          newPassword: { ...editPassword.newPassword, error: '새 비밀번호는 같아야 합니다.' },
          newPassword2: { ...editPassword.newPassword, error: '새 비밀번호는 같아야 합니다.' },
        });
      } else if (!isValidPassword(editPassword.prevPassword)) {
        setEditPassword({
          ...editPassword,
          prevPassword: { ...editPassword.prevPassword, error: '다시 입력해주세요' },
        });
      } else if (!isValidPassword(editPassword.newPassword)) {
        setEditPassword({
          ...editPassword,
          newPassword: { ...editPassword.newPassword, error: '다시 입력해주세요' },
        });
      } else if (isValidPassword(editPassword.newPassword)) {
        setEditPassword({
          ...editPassword,
          newPassword2: { ...editPassword.newPassword2, error: '다시 입력해주세요' },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickWithdrawal = () => {
    console.log('회원탈퇴 요청');
    if (window.confirm('정말 탈퇴하시겠습니까 ?')) {
      api.delete(`/members/${memberId}`).then((el) => console.log(el));
      dispatch(deleteUser());
      alert('이용해주셔서 감사합니다.');
      toAbout();
    }
  };

  return (
    <StyleProfileContainer id={id}>
      <div className="infoContainer col">
        <ShowProfile
          profile={profile}
          setProfile={setProfile}
          isLoading={isLoading}
          editProfile={editProfile}
          setEditProfile={setEditProfile}
          handleTagKeyDown={handleTagKeyDown}
          handleEditProfile={handleEditProfile}
          editPassword={editPassword}
          setEditPassword={setEditPassword}
          handleEditPassword={handleEditPassword}
          handleClickWithdrawal={handleClickWithdrawal}
        />
      </div>
    </StyleProfileContainer>
  );
}
