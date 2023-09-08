import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Tag from '../common/Tag';
import userDefaultImg from '../../static/images/userDefaultImg.jpeg';
import { BsCamera } from 'react-icons/bs';
import api from '../../hooks/useAxiosInterceptor';
import { updateUser } from '../../redux/userform/userSlice';

export default function ShowProfile({ profile, isEdit, setIsEdit, EditTagContainer, setProfile }) {
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
        {user.isLogin && Number(memberId) === user.userInfo.memberId && (
          <div className="editProfile" onClick={() => setIsEdit({ ...isEdit, profile: true })}>
            <FiEdit2 size="30" />
          </div>
        )}
      </div>
      <div className="row gap">
        <div className="imgWrapper">
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
        </div>
        <div className="col infoInner">
          <div className="col info">
            <p>{`이메일 : ${profile.email}`}</p>
            <p>{`이름 : ${profile.userName}`}</p>
            <p>{`나이 : ${profile.age}`}</p>
            <p>{`자기소개 : ${profile.aboutMe}`}</p>
            <p>{`재직 여부 : ${profile.working ? '재직중' : '구직중'}`}</p>
            <p>{`가입일 : ${profile.createdAt}`}</p>
            <div className="row tagGap alignItem">
              <p>{`태그 :`}</p>
              {profile.tag.map((el, i) => (
                <Tag key={i} text={el} />
              ))}
            </div>
          </div>
          {user.isLogin && Number(memberId) === user.userInfo.memberId && (
            <div className="row edit editwrapper">
              {user.userInfo?.socialType === 'SPEC' && (
                <p onClick={() => setIsEdit({ ...isEdit, password: true })}>비밀번호 수정</p>
              )}
              <p onClick={() => setIsEdit({ ...isEdit, withDrawal: true })}>회원탈퇴</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
