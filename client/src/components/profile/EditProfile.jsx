import React from 'react';
import Input from '../common/Input';
import { GoIssueClosed } from 'react-icons/go';
import { AiOutlineCloseCircle, AiOutlineClose } from 'react-icons/ai';

export default function EditProfile({
  editProfile,
  setEditProfile,
  isEdit,
  setIsEdit,
  handleTagKeyDown,
  handleEditProfile,
  Tag,
}) {
  return (
    <>
      <div className="col gap">
        <h3>프로필 변경</h3>
        <Input
          label="한줄소개"
          width="100%"
          height="6rem"
          fontSize=".3rem"
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
          height="2.5rem"
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
          height="2.5rem"
          type="text"
          value={editProfile.age.value}
          onChange={(e) => setEditProfile({ ...editProfile, age: { value: e.target.value } })}
        />
        <div className="row">
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
              height="2.5rem"
              type="text"
              value={editProfile.tag.curString}
              onChange={(e) =>
                setEditProfile({
                  ...editProfile,
                  tag: { value: [...editProfile.tag.value], curString: e.target.value },
                })
              }
              onKeyDown={handleTagKeyDown}
            />
            <div className="row tagGap">
              {editProfile.tag.value.map((el, i) => (
                <Tag key={i}>
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
  );
}
