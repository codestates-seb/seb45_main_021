import React, { useState } from 'react';
import { styled } from 'styled-components';
import { PiUploadSimple } from 'react-icons/pi';
import { FiEdit2 } from 'react-icons/fi';
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';
import Input from '../common/Input';
import { StyleBorderButton } from '../common/Buttons';
import useNav from '../../hooks/useNav';

const StyleProfileContainer = styled.div`
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
    curPassword: '',
    curPassword2: '',
    newPassword: '',
  });

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

  const handleEditPassword = (e) => {
    e.preventDefault();
    console.log('비밀번호 변경 요청 함수 실행');
    console.log(editPassword);
  };

  const handleClickWithdrawal = () => {
    console.log('회원탈퇴 요청');
    toAbout();
  };

  return (
    <StyleProfileContainer id={id} className="row">
      <div className="imgContainer">
        <img className="userImg" src={profile.userImg} alt="userImage" />
        <div className="editImg">
          <PiUploadSimple color="black" size="30" />
        </div>
      </div>
      <div className="infoContainer col">
        {!isEdit.profile && !isEdit.password && !isEdit.withDrawal && (
          <>
            <div className="col gap">
              <h3>프로필</h3>
              <p>{profile.aboutMe}</p>
              <div className="editProfile" onClick={() => setIsEdit({ ...isEdit, profile: true })}>
                <FiEdit2 size="30" />
              </div>
            </div>
            <div className="col infoInner">
              <div className="col info">
                <p>{`이메일 : ${profile.email}`}</p>
                <p>{`이름 : ${profile.userName}`}</p>
                <p>{`나이 : ${profile.age}`}</p>
                <div className="row tagGap alignItem">
                  <p>{`태그 :`}</p>
                  {profile.tags.map((el, i) => (
                    <Tag key={i}>{el}</Tag>
                  ))}
                </div>
                <p>{`가입일 : ${profile.created_At}`}</p>
              </div>
              <EditTagContainer className="row">
                <p onClick={() => setIsEdit({ ...isEdit, password: true })}>비밀번호 수정</p>
                <p onClick={() => setIsEdit({ ...isEdit, withDrawal: true })}>회원탈퇴</p>
              </EditTagContainer>
            </div>
          </>
        )}
        {isEdit.profile && (
          <>
            <div className="col gap">
              <h3>프로필 변경</h3>
              <Input
                label="한줄소개"
                width="100%"
                height="3.5rem"
                value={editProfile.aboutMe.value}
                error={editProfile.aboutMe.error}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, aboutMe: { value: e.target.value, error: '' } })
                }
              />
              <Input
                label="이름"
                width="100%"
                height="3.5rem"
                value={editProfile.userName.value}
                error={editProfile.userName.error}
                onChange={(e) =>
                  setEditProfile({ ...editProfile, userName: { value: e.target.value, error: '' } })
                }
              />
              <Input
                label="나이"
                width="100%"
                height="3.5rem"
                value={editProfile.age.value}
                onChange={(e) => setEditProfile({ ...editProfile, age: { value: e.target.value } })}
              />
              <div className="col gap">
                <div className="col tagGap">
                  <Input
                    label="태그"
                    height="3.5rem"
                    value={editProfile.tags.curString}
                    onChange={(e) =>
                      setEditProfile({
                        ...editProfile,
                        tags: { value: [...editProfile.tags.value], curString: e.target.value },
                      })
                    }
                    onKeyDown={handleTagKeyDown}
                  />
                  <div className="row tagGap">
                    {editProfile.tags.value.map((el, i) => (
                      <Tag key={i}>
                        {el}
                        <AiOutlineClose
                          size={15}
                          color={'var(--error)'}
                          onClick={() =>
                            setEditProfile({
                              ...editProfile,
                              tags: {
                                value: editProfile.tags.value.filter((el, idx) => i !== idx),
                                curString: editProfile.tags.curString,
                              },
                            })
                          }
                        />
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>

              <div className="editProfile">
                <GoIssueClosed size="30" color="green" onClick={handleEditProfile} />
                <AiOutlineCloseCircle
                  size="30"
                  color="var(--error)"
                  onClick={() => setIsEdit({ ...isEdit, profile: false })}
                />
              </div>
            </div>
          </>
        )}
        {isEdit.password && (
          <>
            <div className="col gap">
              <h3>비밀번호 변경</h3>
              <form className="col gap">
                <Input
                  type="password"
                  autoComplete="off"
                  label="현재 비밀번호"
                  fontSize="2rem"
                  width="100%"
                  height="4rem"
                  value={editPassword.curPassword}
                  onChange={(e) =>
                    setEditPassword({ ...editPassword, curPassword: e.target.value })
                  }
                />
                <Input
                  type="password"
                  autoComplete="off"
                  label="현재 비밀번호 재확인"
                  fontSize="2rem"
                  width="100%"
                  height="4rem"
                  value={editPassword.curPassword2}
                  onChange={(e) =>
                    setEditPassword({ ...editPassword, curPassword2: e.target.value })
                  }
                />
                <Input
                  type="password"
                  autoComplete="off"
                  label="새로운 비밀번호"
                  fontSize="2rem"
                  width="100%"
                  height="4rem"
                  value={editPassword.newPassword}
                  onChange={(e) =>
                    setEditPassword({ ...editPassword, newPassword: e.target.value })
                  }
                />

                <StyleBorderButton
                  $hoverEvent="background-color:black"
                  $fontSize="30px"
                  $radius="5px"
                  onClick={handleEditPassword}
                >
                  변경
                </StyleBorderButton>
              </form>
            </div>
            <div className="editProfile">
              <AiOutlineCloseCircle
                size="30"
                color="var(--error)"
                onClick={() => setIsEdit({ ...isEdit, password: false })}
              />
            </div>
          </>
        )}
        {isEdit.withDrawal && (
          <>
            <div className="col withdrawal">
              <div className="col gap">
                <h3>회원 탈퇴</h3>
                <p>회원 탈퇴는 돌이킬 수 없습니다. 선택에 유의해주세요.</p>
              </div>
              <StyleBorderButton
                $hoverEvent="background-color:black"
                $fontSize="30px"
                $radius="5px"
                $color="var(--error)"
                $borderColor="var(--error)"
                onClick={handleClickWithdrawal}
              >
                탈퇴
              </StyleBorderButton>
              <AiOutlineCloseCircle
                size="30"
                color="var(--error)"
                onClick={() => setIsEdit({ ...isEdit, withDrawal: false })}
              />
            </div>
          </>
        )}
      </div>
    </StyleProfileContainer>
  );
}
