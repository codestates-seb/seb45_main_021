import React, { useState } from 'react';
import { styled } from 'styled-components';
import useNav from '../../hooks/useNav';
import { useParams } from 'react-router-dom';
import api from '../../hooks/useAxiosInterceptor';
import { deleteUser } from '../../redux/userform/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';
import Withdrawal from './Withdrawal';
import ShowProfile from './ShowProfile';
import { isValidPassword } from './isValid';

const StyleProfileContainer = styled.div`
  display: flex;
  gap: 5rem;
  padding: 1rem;
  padding-top: 3rem;
  font-size: 2rem;
  .label {
    font-size: 1.5rem;
  }
  .withdrawal {
    position: relative;
    height: 30vh;
    h3 {
      color: var(--error);
    }
    button {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
    }
    svg {
      position: absolute;
      top: 0;
      right: 0;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .alignItem {
    align-items: center;
  }
  .tagGap {
    gap: 1rem;
  }
  .imgWrapper {
    position: relative;
    width: 50%;
    height: 100%;
  }
  .userImg {
    width: 100%;
    border-radius: 20px;
    &:hover {
      filter: brightness(0.8);
    }
  }
  .editImg {
    position: absolute;
    width: 50px;
    height: 50px;
    bottom: 10px;
    right: 10px;
    border-radius: 50%;
    background-color: var(--black-100);
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
    width: 100%;
    border: 1px solid var(--black-100);
    border-radius: 10px;
    padding: 2rem;
    justify-content: space-between;
    gap: 2rem;
    position: relative;
    .editProfile {
      position: absolute;
      top: 2rem;
      right: 2rem;
      gap: 0.5rem;
      display: flex;
      svg {
        cursor: pointer;
        transition: all 0.1s;
        &:active {
          transform: translateY(2px);
        }
      }
    }

    h3 {
      font-size: 3rem;
      font-weight: 700;
    }
    .editwrapper {
      position: absolute;
      bottom: 0;
      right: 0;
      color: var(--error);
      gap: 3rem;
      padding: 1rem 0;
    }

    .gap {
      gap: 2rem;
    }
    .infoInner {
      position: relative;
      padding-left: 3rem;
      width: 100%;
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

export default function ProfileCard({ id, data }) {
  const { toAbout, toProfile } = useNav();
  const [isEdit, setIsEdit] = useState({ profile: false, password: false, withDrawal: false });
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
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleTagKeyDown = (e) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();
    if (editProfile.tag.value.length <= 2) {
      setEditProfile({
        ...editProfile,
        tag: {
          value: [...editProfile.tag.value, editProfile.tag.curString],
          curString: '',
        },
      });
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
        {!isEdit.profile && !isEdit.password && !isEdit.withDrawal && (
          <ShowProfile
            profile={profile}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setProfile={setProfile}
          />
        )}
        {isEdit.profile && user.isLogin && Number(memberId) === user.userInfo.memberId && (
          <EditProfile
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            handleTagKeyDown={handleTagKeyDown}
            handleEditProfile={handleEditProfile}
          />
        )}
        {isEdit.password && user.isLogin && Number(memberId) === user.userInfo.memberId && (
          <EditPassword
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            editPassword={editPassword}
            setEditPassword={setEditPassword}
            handleEditPassword={handleEditPassword}
          />
        )}
        {isEdit.withDrawal && user.isLogin && Number(memberId) === user.userInfo.memberId && (
          <Withdrawal
            handleClickWithdrawal={handleClickWithdrawal}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
          />
        )}
      </div>
    </StyleProfileContainer>
  );
}
