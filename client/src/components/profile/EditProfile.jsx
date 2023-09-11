import React from 'react';
import Input from '../common/Input';
import { AiOutlineClose } from 'react-icons/ai';
import Tag from '../common/Tag';
import { styled } from 'styled-components';

const Container = styled.div`
  h3 {
    font-weight: 700;
    font-size: 1.8rem;
    padding-bottom: 22px;
  }
  .label {
    font-size: 1.5rem;
    margin-bottom: 10px;
    font-weight: 700;
  }
  input[type='checkbox'] {
    width: 15px;
    height: 15px;
    vertical-align: middle;
    cursor: pointer;
  }
  .tagGap {
    gap: 1rem;
  }
`;

export default function EditProfile({ editProfile, setEditProfile, handleTagKeyDown }) {
  return (
    <>
      <Container>
        <h3>프로필 변경</h3>
        <Input
          label="한줄소개"
          width="100%"
          height="6rem"
          fontSize="6rem"
          type="textarea"
          value={editProfile.aboutMe.value}
          error={editProfile.aboutMe.error}
          onChange={(e) =>
            setEditProfile({ ...editProfile, aboutMe: { value: e.target.value, error: '' } })
          }
        />
        <Input
          label="이름"
          width="100%"
          height="3rem"
          type="text"
          value={editProfile.userName.value}
          error={editProfile.userName.error}
          onChange={(e) =>
            setEditProfile({ ...editProfile, userName: { value: e.target.value, error: '' } })
          }
        />
        <Input
          label="나이"
          width="100%"
          height="3rem"
          type="text"
          value={editProfile.age.value}
          onChange={(e) => setEditProfile({ ...editProfile, age: { value: e.target.value } })}
        />
        <div>
          <label className="label">
            구직중
            <input
              type="checkbox"
              checked={editProfile.working.value}
              onChange={(e) => setEditProfile({ ...editProfile, working: { value: true } })}
            />
          </label>
          <label className="label">
            재직중
            <input
              type="checkbox"
              checked={editProfile.working.value === false}
              onChange={(e) => setEditProfile({ ...editProfile, working: { value: false } })}
            />
          </label>
        </div>
        <div className="col gap">
          <div className="col tagGap">
            <Input
              label="태그"
              height="3rem"
              type="text"
              placeholder="태그는 최대 중복제외 3개까지 등록이 가능합니다."
              value={editProfile.tag.curString}
              onChange={(e) => {
                setEditProfile({
                  ...editProfile,
                  tag: { value: [...editProfile.tag.value], curString: e.target.value },
                });
              }}
              onKeyDown={handleTagKeyDown}
            />
            <div className="row tagGap">
              {editProfile.tag.value.map((el, i) => (
                <Tag
                  key={i}
                  edit={true}
                  text={
                    <>
                      {el}
                      <AiOutlineClose
                        size={15}
                        color={'var(--error)'}
                        onClick={() =>
                          setEditProfile({
                            ...editProfile,
                            tag: {
                              value: editProfile.tag.value.filter((_, idx) => i !== idx),
                              curString: editProfile.tag.curString,
                            },
                          })
                        }
                      />
                    </>
                  }
                ></Tag>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
