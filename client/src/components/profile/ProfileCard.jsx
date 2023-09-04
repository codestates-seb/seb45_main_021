import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { PiUploadSimple } from 'react-icons/pi';
import useNav from '../../hooks/useNav';
import { useParams } from 'react-router-dom';
import api from '../../hooks/useAxiosInterceptor';
import { deleteUser } from '../../redux/userform/userslice';
import { useDispatch } from 'react-redux';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';
import Withdrawal from './Withdrawal';
import ShowProfile from './ShowProfile';

const StyleProfileContainer = styled.div`
  display: flex;
  gap: 5rem;
  font-size: 2rem;
  .withdrawal {
    position: relative;
    height: 100%;
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
  .imgContainer {
    width: 40%;
    position: relative;
    .userImg {
      width: 100%;
      border-radius: 10px;
      &:hover {
        filter: brightness(0.8);
      }
    }
    .editImg {
      position: absolute;
      top: -20px;
      right: -20px;
      width: 50px;
      height: 50px;
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
  }

  .infoContainer {
    width: 60%;
    border: 1px solid var(--black-100);
    border-radius: 10px;
    padding: 2.5rem;
    justify-content: space-between;
    gap: 2rem;
    position: relative;

    .editProfile {
      position: absolute;
      top: 2.5rem;
      right: 2.5rem;
      gap: 1rem;
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

    .gap {
      gap: 3rem;
    }
    .infoInner {
      position: relative;
      .info {
        gap: 2rem;
      }
    }
  }
`;

const EditTagContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  gap: 2rem;

  p {
    cursor: pointer;
    color: var(--error);
    &:hover {
      color: #ed5a5f;
    }
  }
`;

const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: relative;
  border-radius: 30px;
  width: fit-content;
  height: fit-content;
  background-color: var(--black-100);
  color: var(--black);
  text-align: center;
  padding: 5px 10px;
  font-size: 1.2rem;
  svg {
    cursor: pointer;
  }
`;

export default function ProfileCard({ id, data }) {
  const { toAbout } = useNav();
  const [isEdit, setIsEdit] = useState({ profile: false, password: false, withDrawal: false });
  const [profile, setProfile] = useState({
    email: data.email,
    userName: data.userName,
    userImg: data.userImg,
    age: data.age,
    tags: data.tags,
    aboutMe: data.aboutMe,
    created_At: data.created_At,
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
    tags: {
      value: profile.tags,
      curString: '',
    },
  });
  const [editPassword, setEditPassword] = useState({
    prevPassword: '',
    newPassword: '',
    newPassword2: '',
  });
  const { userId } = useParams();
  const dispatch = useDispatch();

  const handleTagKeyDown = (e) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();
    if (editProfile.tags.value.length <= 2) {
      setEditProfile({
        ...editProfile,
        tags: {
          value: [...editProfile.tags.value, editProfile.tags.curString],
          curString: editProfile.tags.curString,
        },
      });
    }
  };

  useEffect(() => {}, []);

  const handleEditProfile = () => {
    console.log('수정 요청 함수 실행');
    const responseBody = {
      aboutMe: editProfile.aboutMe.value,
      userName: editProfile.userName.value,
      age: editProfile.age.value,
      tags: editProfile.tags.value,
    };
    console.log(responseBody);
  };

  const handleEditPassword = async (e) => {
    e.preventDefault();
    try {
      api
        .patch(`/members/password/${userId}`, {
          prevPassword: editPassword.prevPassword,
          newPassword: editPassword.newPassword,
        })
        .then((el) => console.log(el));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickWithdrawal = () => {
    console.log('회원탈퇴 요청');
    api.delete(`/members/${userId}`).then((el) => console.log(el));
    dispatch(deleteUser());
    toAbout();
  };

  const handleClickUserImgUpload = () => {
    console.log('회원 이미지 업로드');
  };

  return (
    <StyleProfileContainer id={id} className="row">
      <div className="imgContainer">
        <img className="userImg" src={profile.userImg} alt="userImage" />
        <div className="editImg" onClick={handleClickUserImgUpload}>
          <PiUploadSimple color="black" size="30" />
        </div>
      </div>
      <div className="infoContainer col">
        {!isEdit.profile && !isEdit.password && !isEdit.withDrawal && (
          <ShowProfile
            profile={profile}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            Tag={Tag}
            EditTagContainer={EditTagContainer}
          />
        )}
        {isEdit.profile && (
          <EditProfile
            editProfile={editProfile}
            setEditProfile={setEditProfile}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            handleTagKeyDown={handleTagKeyDown}
            handleEditProfile={handleEditProfile}
            Tag={Tag}
          />
        )}
        {isEdit.password && (
          <EditPassword
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            editPassword={editPassword}
            setEditPassword={setEditPassword}
            handleEditPassword={handleEditPassword}
          />
        )}
        {isEdit.withDrawal && (
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
