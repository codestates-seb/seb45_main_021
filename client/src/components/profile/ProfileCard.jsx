import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { PiUploadSimple } from 'react-icons/pi';
import useNav from '../../hooks/useNav';
import { useParams } from 'react-router-dom';
import api from '../../hooks/useAxiosInterceptor';
import { updateUser, deleteUser } from '../../redux/userform/userslice';
import { useSelector, useDispatch } from 'react-redux';
import EditPassword from './EditPassword';
import EditProfile from './EditProfile';
import Withdrawal from './Withdrawal';
import ShowProfile from './ShowProfile';
import { isValidPassword } from './isValid';
import userDefaultImg from '../../static/images/userDefaultImg.jpeg';

const StyleProfileContainer = styled.div`
  display: flex;
  padding-top: 3rem;
  gap: 5rem;
  font-size: 2rem;
  .label {
    font-size: 1.5rem;
  }
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
    font-size: 1.6rem;
    gap: 1rem;
  }
  .imgContainer {
    width: 40%;
    position: relative;
    .userImg {
      width: 100%;
      height: 100%;
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

    .gap {
      gap: 1rem;
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
  margin-top: 2rem;
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
  const { toAbout, toProfile } = useNav();
  const [isEdit, setIsEdit] = useState({ profile: false, password: false, withDrawal: false });
  const [profile, setProfile] = useState({
    email: data.email,
    userName: data.userName,
    userImg: data.userImg,
    isWorking: data.isWorking,
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
    isWorking: {
      value: profile.isWorking,
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
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
    console.log('프로필 수정 요청');
    try {
      const responseBody = {
        aboutMe: editProfile.aboutMe.value,
        userName: editProfile.userName.value,
        age: editProfile.age.value,
        tags: editProfile.tags.value,
        isWorking: editProfile.isWorking.value,
      };
      api.patch(`members/${userId}`, responseBody).then(() => {
        console.log('프로필 수정 성공');
        toProfile(userId);
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
          .patch(`/members/password/${userId}`, {
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
      api.delete(`/members/${userId}`).then((el) => console.log(el));
      dispatch(deleteUser());
      alert('이용해주셔서 감사합니다.');
      toAbout();
    }
  };

  const fileInputRef = React.createRef();

  const handleClickUserImg = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    console.log('유저 이미지 교체 요청');
    const file = e.target.files[0];
    api.patch(`/members/profileImg/${userId}`).then((el) => {
      setProfile({ ...profile, userImg: el.data.imgUrl });
      dispatch(updateUser({ userInfo: { ...user.userInfo, imgUrl: el.data.imgUrl } }));
    });
    console.log(file);
  };

  return (
    <StyleProfileContainer id={id} className="row">
      <div className="imgContainer">
        <img
          className="userImg"
          src={profile.userImg ? profile.userImg : userDefaultImg}
          alt="userImage"
        />
        {user.isLogin && Number(userId) === user.userInfo.memberId && (
          <>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              className="hidden"
              onChange={handleFileChange}
              ref={fileInputRef}
            />
            <div className="editImg" onClick={handleClickUserImg}>
              <PiUploadSimple color="black" size="30" />
            </div>
          </>
        )}
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
        {isEdit.profile && user.isLogin && Number(userId) === user.userInfo.memberId && (
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
        {isEdit.password && user.isLogin && Number(userId) === user.userInfo.memberId && (
          <EditPassword
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            editPassword={editPassword}
            setEditPassword={setEditPassword}
            handleEditPassword={handleEditPassword}
          />
        )}
        {isEdit.withDrawal && user.isLogin && Number(userId) === user.userInfo.memberId && (
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
