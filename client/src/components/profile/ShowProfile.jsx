import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Tag from '../common/Tag';
import userDefaultImg from '../../static/images/userDefaultImg.jpeg';
import { BsCamera } from 'react-icons/bs';
import api from '../../hooks/useAxiosInterceptor';
import { updateUser } from '../../redux/userForm/userSlice';
import Skeleton from '@mui/material/Skeleton';
import { mobile } from '../../static/theme';

export default function ShowProfile({ profile, isEdit, setIsEdit, setProfile, isLoading }) {
  const user = useSelector((state) => state.user);
  const fileInputRef = React.createRef();
  const dispatch = useDispatch();
  const { memberId } = useParams();

  const handleClickUserImg = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    console.log('유저 이미지 교체 요청');
    const file = e.target.files[0];
    api.patch(`/members/profileImg/${memberId}`).then((el) => {
      setProfile({ ...profile, userImg: el.data.imgUrl });
      dispatch(updateUser({ userInfo: { ...user.userInfo, imgUrl: el.data.imgUrl } }));
    });
    console.log(file);
  };

  return (
    <>
      <div>
        <h3>프로필</h3>
        {user.isLogin && Number(memberId) === user.userInfo.memberId && !isLoading && (
          <div className="editProfile" onClick={() => setIsEdit({ ...isEdit, profile: true })}>
            <FiEdit2 size="30" />
          </div>
        )}
      </div>
      <div className="row gap">
        <div className="imgWrapper">
          {isLoading ? (
            <Skeleton variant="circular" width="100%" height="100%" />
          ) : (
            <>
              <img
                className="userImg"
                src={profile.userImg ? profile.userImg : userDefaultImg}
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
                <Skeleton variant="text" width="100%" height="40px" />
                <Skeleton variant="text" width="200px" height="40px" />
                <Skeleton variant="text" width="200px" height="40px" />
                <Skeleton variant="text" width="300px" height="40px" />
                <Skeleton variant="text" width="200px" height="40px" />
                <Skeleton variant="text" width="200px" height="40px" />
                <Skeleton variant="text" width="200px" height="40px" />
              </>
            ) : (
              <>
                <div>
                  <p className="label">자기소개</p>
                  <p>{profile.aboutMe}</p>
                </div>
                <div>
                  <p className="label">이름</p>
                  <p>{profile.userName}</p>
                </div>
                <div>
                  <p className="label">나이</p>
                  <p>{profile.age}</p>
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
                    {profile.tag.map((el, i) => (
                      <Tag key={i} text={el} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
          {user.isLogin && Number(memberId) === user.userInfo.memberId && (
            <div className="row edit editwrapper">
              {user.userInfo?.socialType === 'SPEC' &&
                (isLoading ? (
                  <Skeleton width="100px" height="50px" />
                ) : (
                  <p onClick={() => setIsEdit({ ...isEdit, password: true })}>비밀번호 수정</p>
                ))}
              {isLoading ? (
                <Skeleton width="100px" height="50px" />
              ) : (
                <p onClick={() => setIsEdit({ ...isEdit, withDrawal: true })}>회원탈퇴</p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
