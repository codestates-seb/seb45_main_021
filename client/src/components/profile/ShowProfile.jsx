import React from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tag from '../common/Tag';

export default function ShowProfile({ profile, isEdit, setIsEdit, EditTagContainer }) {
  const user = useSelector((state) => state.user);
  const { userId } = useParams();
  return (
    <>
      <div className="col gap">
        <h3>프로필</h3>
        <p>{profile.aboutMe}</p>
        {user.isLogin && Number(userId) === user.userInfo.memberId && (
          <div className="editProfile" onClick={() => setIsEdit({ ...isEdit, profile: true })}>
            <FiEdit2 size="30" />
          </div>
        )}
      </div>
      <div className="col infoInner">
        <div className="col info">
          <p>{`이메일 : ${profile.email}`}</p>
          <p>{`이름 : ${profile.userName}`}</p>
          <p>{`나이 : ${profile.age}`}</p>
          <p>{`재직 여부 : ${profile.working ? '재직중' : '구직중'}`}</p>
          <div className="row tagGap alignItem">
            <p>{`태그 :`}</p>
            {profile.tag.map((el, i) => (
              <Tag key={i} text={el} />
            ))}
          </div>
          <p>{`가입일 : ${profile.createdAt}`}</p>
        </div>
        {user.isLogin && Number(userId) === user.userInfo.memberId && (
          <EditTagContainer className="row">
            {user.userInfo?.socialType === 'SPEC' && (
              <p onClick={() => setIsEdit({ ...isEdit, password: true })}>비밀번호 수정</p>
            )}
            <p onClick={() => setIsEdit({ ...isEdit, withDrawal: true })}>회원탈퇴</p>
          </EditTagContainer>
        )}
      </div>
    </>
  );
}
