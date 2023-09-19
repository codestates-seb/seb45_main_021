import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import useNav from '../../hooks/useNav';
import { useParams } from 'react-router-dom';
import api from '../../hooks/useAxiosInterceptor';
import { deleteUser } from '../../redux/userForm/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import ShowProfile from './ShowProfile';
import { isValidPassword, isValidTag } from './isValid';
import { desktop, mobile } from '../../static/theme';

const StyleProfileContainer = styled.div`
  display: flex;
  position: relative;
  padding-top: 2rem;
  .label {
    font-size: 2rem;
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
    object-fit:cover;
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
    width: 300px;
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
        font-size: 1.5rem;
        display: flex;
        justify-content: space-between;
        p {
          word-wrap: break-word;
          line-height: 1.3;
          overflow-wrap: break-word;
          font-family: var(--nanum);
        }
      }
    }
  }
`;

export default function ProfileCard({ id, data, isLoading }) {
  const { toAbout } = useNav();
  const { memberId } = useParams();
  const dispatch = useDispatch();
  const socialType = useSelector((state) => state.user.userInfo.socialType);
  const [profile, setProfile] = useState({
    email: data.email,
    userName: data.userName,
    userImgUrl: data.userImgUrl,
    working: data.working,
    age: data.age,
    tags: data.tags,
    aboutMe: data.aboutMe === null ? '' : data.aboutMe,
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
      error: '',
    },
    tags: {
      value: profile.tags,
      curString: '',
      error: '',
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
    newPasswordCheck: {
      value: '',
      error: '',
    },
  });

  const handleResetEditProfile = () => {
    setEditProfile({
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
        error: '',
      },
      tags: {
        value: profile.tags,
        curString: '',
        error: '',
      },
      working: {
        value: profile.working,
      },
    });
  };

  const handleResetEditPwd = () => {
    setEditPassword({
      prevPassword: {
        value: '',
        error: '',
      },
      newPassword: {
        value: '',
        error: '',
      },
      newPasswordCheck: {
        value: '',
        error: '',
      },
    });
  };

  useEffect(() => {
    setProfile({
      email: data.email,
      userName: data.userName,
      userImgUrl: data.userImgUrl,
      working: data.working,
      age: data.age,
      tags: data.tags,
      aboutMe: data.aboutMe === null ? '' : data.aboutMe,
      createdAt: data.createdAt,
    });
  }, [data]);

  const handleTagKeyDown = (e) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();
    if (
      editProfile.tags.curString.split(' ').join('').length <= 10 &&
      editProfile.tags.curString.split(' ').join('').length > 0
    ) {
      if (
        editProfile.tags.value.length <= 2 &&
        editProfile.tags.value.filter(
          (el) => el.toLowerCase() === editProfile.tags.curString.toLowerCase(),
        ).length === 0 &&
        isValidTag(editProfile.tags.curString)
      ) {
        setEditProfile({
          ...editProfile,
          tags: {
            ...editProfile.tags,
            value: [...editProfile.tags.value, editProfile.tags.curString.split(' ').join('')],
            error: '',
          },
        });
        setTimeout(() => {
          e.target.value = '';
        }, 0);
      } else if (!isValidTag(editProfile.tags.curString)) {
        setEditProfile({
          ...editProfile,
          tags: {
            ...editProfile.tags,
            curString: '',
            error: '한글은 자음과 모음만 등록할 수 없습니다.',
          },
        });
      } else {
        setEditProfile({
          ...editProfile,
          tags: {
            ...editProfile.tags,
            curString: '',
            error: '중복은 허용하지않습니다.',
          },
        });
      }
    }
  };

  const handleEditProfile = () => {
    let regExpPass = false;
    if (socialType === 'SPEC') {
      if (
        editProfile.aboutMe.value.length <= 200 &&
        editProfile.userName.value.length <= 5 &&
        editProfile.age.value.toString().length <= 3
      ) {
        regExpPass = true;
        const responseBody = {
          aboutMe: editProfile.aboutMe.value,
          userName: editProfile.userName.value,
          age: Number(editProfile.age.value),
          tags: editProfile.tags.value,
          isWorking: editProfile.working.value,
        };
        api
          .patch(`members/${memberId}`, responseBody)
          .then((el) => {
            alert('프로필 수정 성공');
            setProfile({
              ...profile,
              aboutMe: editProfile.aboutMe.value,
              userName: editProfile.userName.value,
              age: Number(editProfile.age.value),
              tags: editProfile.tags.value,
              working: editProfile.working.value,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      if (editProfile.aboutMe.value.length <= 200 && editProfile.age.value.toString().length <= 3) {
        regExpPass = true;
        const responseBody = {
          aboutMe: editProfile.aboutMe.value,
          userName: editProfile.userName.value,
          age: Number(editProfile.age.value),
          tags: editProfile.tags.value,
          isWorking: editProfile.working.value,
        };
        api
          .patch(`members/${memberId}`, responseBody)
          .then((el) => {
            alert('프로필 수정 성공');
            setProfile({
              ...profile,
              aboutMe: editProfile.aboutMe.value,
              userName: editProfile.userName.value,
              age: Number(editProfile.age.value),
              tags: editProfile.tags.value,
              working: editProfile.working.value,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }

    return regExpPass;
  };

  const handleEditPassword = (e) => {
    let regExpPass = false;
    if (
      editPassword.newPassword === editPassword.newPasswordCheck &&
      isValidPassword(editPassword.prevPassword) &&
      isValidPassword(editPassword.newPassword) &&
      isValidPassword(editPassword.newPasswordCheck)
    ) {
      regExpPass = true;
      api
        .patch(`/members/password/${memberId}`, {
          prevPassword: editPassword.prevPassword,
          newPassword: editPassword.newPassword,
        })
        .then((el) => {
          alert('비밀번호 변경이 완료되었습니다');
          setEditPassword({
            ...editPassword,
            prevPassword: { ...editPassword.prevPassword, error: '' },
            newPassword: { ...editPassword.newPassword, error: '' },
            newPasswordCheck: { ...editPassword.newPasswordCheck, error: '' },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (!(editPassword.newPassword === editPassword.newPasswordCheck)) {
      setEditPassword({
        ...editPassword,
        newPassword: { ...editPassword.newPassword, error: '새 비밀번호는 같아야 합니다.' },
        newPasswordCheck: {
          ...editPassword.newPasswordCheck,
          error: '새 비밀번호는 같아야 합니다.',
        },
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
    } else if (isValidPassword(editPassword.newPasswordCheck)) {
      setEditPassword({
        ...editPassword,
        newPasswordCheck: { ...editPassword.newPasswordCheck, error: '다시 입력해주세요' },
      });
    }
    return regExpPass;
  };

  const handleClickWithdrawal = async () => {
    try {
      await api.delete(`/members/${memberId}`);
      dispatch(deleteUser());
      alert('이용해주셔서 감사합니다.');
      toAbout();
    } catch (e) {
      console.log(e);
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
          handleResetEditProfile={handleResetEditProfile}
          handleResetEditPwd={handleResetEditPwd}
        />
      </div>
    </StyleProfileContainer>
  );
}
