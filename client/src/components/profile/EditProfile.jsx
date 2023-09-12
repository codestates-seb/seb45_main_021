import React from 'react';
import Input from '../common/Input';
import { AiOutlineClose } from 'react-icons/ai';
import Tag from '../common/Tag';
import { styled } from 'styled-components';
import CheckBox from '../common/CheckBox';
import ProGress from '../common/ProGress';
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
    margin-top: 5px;
  }
`;

export default function EditProfile({ editProfile, setEditProfile, handleTagKeyDown }) {
  const handleEditDeploy = (target) => {
    setEditProfile({ ...editProfile, working: { value: target } });
  };
  return (
    <>
      <Container>
        <h3>프로필 변경</h3>
        <Input
          label="한줄소개"
          width="100%"
          height="10rem"
          placeholder="200 글자까지 가능합니다."
          fontSize="6rem"
          type="textarea"
          value={editProfile.aboutMe.value}
          error={editProfile.aboutMe.error}
          onChange={(e) =>
            setEditProfile({ ...editProfile, aboutMe: { value: e.target.value, error: '' } })
          }
        />
        <ProGress
          comPleteNum={200}
          proGressNum={editProfile.aboutMe.value.length}
          fontSize="1.5rem"
        />
        <Input
          label="이름"
          width="100%"
          height="3rem"
          placeholder="한글 이름을 적어주세요."
          type="text"
          value={editProfile.userName.value}
          error={editProfile.userName.error}
          onChange={(e) =>
            setEditProfile({ ...editProfile, userName: { value: e.target.value, error: '' } })
          }
        />
        <ProGress
          comPleteNum={5}
          proGressNum={editProfile.userName.value.length}
          fontSize="1.5rem"
        />
        <Input
          label="나이"
          width="100%"
          height="3rem"
          placeholder="숫자로 적어주세요."
          type="text"
          value={editProfile.age.value}
          onChange={(e) => setEditProfile({ ...editProfile, age: { value: e.target.value } })}
        />
        <ProGress
          comPleteNum={3}
          proGressNum={editProfile.age.value.toString().length}
          fontSize="1.5rem"
        />
        <div style={{ marginBottom: '10px' }}>
          <CheckBox
            label="재직중이십니까 ?"
            value={editProfile.working.value}
            onChange={handleEditDeploy}
            boxSize="20px"
            fontSize="15px"
          />
        </div>
        <div className="col gap">
          <div className="col bottom">
            <Input
              label="태그"
              height="3rem"
              type="text"
              placeholder="태그는 최대 중복제외 3개까지 등록이 가능합니다."
              value={editProfile.tag.curString}
              error={editProfile.tag.error}
              onChange={(e) => {
                setEditProfile({
                  ...editProfile,
                  tag: { value: [...editProfile.tag.value], curString: e.target.value },
                });
              }}
              onKeyDown={handleTagKeyDown}
            />
            <ProGress
              comPleteNum={3}
              proGressNum={editProfile.tag.value.length}
              fontSize="1.5rem"
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
