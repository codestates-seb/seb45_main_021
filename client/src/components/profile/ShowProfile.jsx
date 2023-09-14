import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Tag from '../common/Tag';
import userDefaultImg from '../../static/images/userDefaultImg.jpeg';
import { BsCamera } from 'react-icons/bs';
import api from '../../hooks/useAxiosInterceptor';
import { updateUser } from '../../redux/userForm/userSlice';
import Skeleton from '@mui/material/Skeleton';
import Modal from '../common/Modal';
import EditProfile from './EditProfile';
import EditPassword from './EditPassword';
import Profile from '../../pages/Profile';

export default function ShowProfile({
  profile,
  setProfile,
  isLoading,
  editProfile,
  setEditProfile,
  handleTagKeyDown,
  handleEditProfile,
  editPassword,
  setEditPassword,
  handleEditPassword,
  handleClickWithdrawal,
  handleResetEditProfile,
  handleResetEditPwd,
}) {
  const user = useSelector((state) => state.user);
  const fileInputRef = React.createRef();
  const dispatch = useDispatch();
  const { memberId } = useParams();
  const [isOpenEditInfo, setIsOpenEditInfo] = useState(false);
  const [isOpenEditPwd, setIsOpenEditPwd] = useState(false);
  const [isOPenWithdrawal, setIsOpenWithdrawal] = useState(false);

  const handleClickUserImg = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    console.log('유저 이미지 교체 요청');
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('uploadImg', file);
    api
      .patch(`/members/profileImg/${memberId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((el) => {
        setProfile({ ...profile, userImgUrl: el.data.userImgUrl });
        dispatch(updateUser({ userInfo: { ...user.userInfo, userImgUrl: el.data.userImgUrl } }));
      });
  };

  return (
    <>
      <div className="col gap">
        {isOpenEditInfo && user.isLogin && Number(memberId) === user.userInfo.memberId && (
          <Modal
            setIsOpen={setIsOpenEditInfo}
            confirmHandler={handleEditProfile}
            absoluteConfirm={true}
            cancelHandler={handleResetEditProfile}
            children={
              <EditProfile
                editProfile={editProfile}
                setEditProfile={setEditProfile}
                handleTagKeyDown={handleTagKeyDown}
              />
            }
          />
        )}
        {isOpenEditPwd && user.isLogin && Number(memberId) === user.userInfo.memberId && (
          <Modal
            setIsOpen={setIsOpenEditPwd}
            confirmHandler={handleEditPassword}
            absoluteConfirm={true}
            cancelHandler={handleResetEditPwd}
            children={
              <EditPassword editPassword={editPassword} setEditPassword={setEditPassword} />
            }
          />
        )}
        {isOPenWithdrawal && user.isLogin && Number(memberId) === user.userInfo.memberId && (
          <Modal
            setIsOpen={setIsOpenWithdrawal}
            confirmHandler={handleClickWithdrawal}
            title="회원탈퇴"
            body="회원탈퇴는 되돌릴 수 없습니다. 다시 한번 고민해주세요."
          />
        )}
        <div className="imgWrapper">
          {isLoading ? (
            <Skeleton
              variant="rounded"
              width="200px"
              height="200px"
              style={{ borderRadius: '20px' }}
              sx={{ bgcolor: 'grey.700' }}
              animation="wave"
            />
          ) : (
            <>
              <img
                className="userImg"
                src={!profile.userImgUrl ? userDefaultImg : profile.userImgUrl}
                alt="userImage"
              />
              {user.isLogin && Number(memberId) === user.userInfo.memberId && (
                <>
                  <input
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                  <div className="editImg" onClick={handleClickUserImg}>
                    <BsCamera color="black" size="30" />
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="col infoInner">
          <div className="col info">
            {isLoading ? (
              <>
                <div>
                  <Skeleton
                    variant="text"
                    width="40px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="100%"
                    height="60px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width="40px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="60px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width="40px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="60px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width="40px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="150px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width="40px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="60px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                </div>
                <div>
                  <Skeleton
                    variant="text"
                    width="40px"
                    height="30px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                  <Skeleton
                    variant="text"
                    width="150px"
                    height="40px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="label">소개</p>
                  <p>{!profile.aboutMe ? '아직 소개가 등록되지 않았습니다.' : profile.aboutMe}</p>
                </div>
                <div>
                  <p className="label">이름</p>
                  <p>{profile.userName}</p>
                </div>
                <div>
                  <p className="label">나이</p>
                  <p>{profile.age === 0 ? '아직 나이가 등록되지 않았습니다.' : `${profile.age}`}</p>
                </div>
                <div>
                  <p className="label">이메일</p>
                  <p>{profile.email}</p>
                </div>
                <div>
                  <p className="label">상태</p>
                  <p>{profile.working ? '재직중' : '구직중'}</p>
                </div>
                <div>
                  <p className="label">가입일</p>
                  <p>{profile.createdAt}</p>
                </div>
                <div>
                  <p className="label">태그</p>
                  <div className="row tagGap">
                    {profile.tags.map((el, i) => (
                      <Tag key={i} text={el} />
                    ))}
                    {profile.tags.length === 0 && '아직 태그가 등록되지 않았습니다.'}
                  </div>
                </div>
              </>
            )}
          </div>
          {user.isLogin && Number(memberId) === user.userInfo.memberId && (
            <div className="row edit editwrapper">
              {user.userInfo?.socialType === 'SPEC' &&
                (isLoading ? (
                  <Skeleton
                    width="100%"
                    height="50px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                ) : (
                  <p onClick={() => setIsOpenEditPwd(true)}>비밀번호 수정</p>
                ))}
              {isLoading ? (
                <>
                  <Skeleton
                    width="100%"
                    height="50px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                  <Skeleton
                    width="100%"
                    height="50px"
                    sx={{ bgcolor: 'grey.700' }}
                    animation="wave"
                  />
                </>
              ) : (
                <>
                  <p onClick={() => setIsOpenEditInfo(true)}>정보수정</p>
                  <p onClick={() => setIsOpenWithdrawal(true)}>탈퇴</p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
