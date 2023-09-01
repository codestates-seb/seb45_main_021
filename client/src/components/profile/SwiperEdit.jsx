import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Input from '../common/Input';
import { StyleBorderButton } from '../common/Buttons';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';

const SwiperCard = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 3rem;
  padding: 2rem;
  transition: all 0.4s;
  position: relative;
  display: flex;
  gap: 10rem;
  .btn {
    position: absolute;
    right: 2rem;
    left: 2rem;
    bottom: 2rem;
  }
  .cancel {
    display: flex;
    position: absolute;
    top: 2rem;
    right: 2rem;
    svg {
      cursor: pointer;
    }
  }
  .gap {
    gap: 1rem;
  }
  h3 {
    font-size: 5rem;
    padding: 2rem 0;
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

export default function SwiperEdit({ data, idx, handler, type }) {
  const [temp, setTemp] = useState({ ...data, curString: '' });

  useEffect(() => {
    if (temp.tags === undefined) {
      setTemp({ call: '', tags: [], aboutMe: '', title: '' });
    }
  }, []);

  const handleClickSubmit = () => {
    console.log('제출');
  };

  const handleClickCancel = () => {
    handler('all');
  };

  const handleTagKeyDown = (e) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();
    if (temp.tags?.length <= 2) {
      setTemp({
        ...temp,
        tags: [...temp.tags, temp.curString],
        curString: '',
      });
    }
  };

  return (
    <SwiperCard className="col">
      <div className="cancel">
        <AiOutlineCloseCircle color={'var(--error)'} size={40} onClick={handleClickCancel} />
      </div>
      <h3>{`카드 ${type === 'fetch' ? '수정' : '생성'}`}</h3>
      <Input
        label="제목"
        width="100%"
        placeholder="타인에게 보여줄 카드 제목을 정해주세요."
        value={temp.title || ''}
        onChange={(e) => setTemp({ ...temp, title: e.target.value })}
      />
      <Input
        label="자기소개"
        width="100%"
        placeholder="200글자까지 작성이 가능합니다."
        value={temp.aboutMe || ''}
        onChange={(e) => setTemp({ ...temp, aboutMe: e.target.value })}
      />
      <Input
        label="연락처"
        width="100%"
        placeholder="- 없이 숫자만 입력해주세요."
        value={temp.call || ''}
        onChange={(e) => setTemp({ ...temp, call: e.target.value })}
      />
      <div className="tagwrapper">
        <Input
          label="태그"
          width="100%"
          height="3.5rem"
          placeholder="태그는 최대 3개까지 등록이 가능합니다."
          value={temp.curString || ''}
          onChange={(e) =>
            setTemp({
              ...temp,
              curString: e.target.value,
            })
          }
          onKeyDown={handleTagKeyDown}
        />
        <div className="row gap">
          {temp.tags?.map((el, i) => (
            <Tag key={i}>
              {el}
              <AiOutlineClose
                size={15}
                color={'var(--error)'}
                onClick={() =>
                  setTemp({
                    ...temp,
                    tags: temp.tags.filter((_, idx) => i !== idx),
                  })
                }
              />
            </Tag>
          ))}
        </div>
      </div>
      <div className="btn">
        <StyleBorderButton
          $width="100%"
          $borderColor="green"
          $color="green"
          $fontSize="4rem"
          onClick={handleClickSubmit}
        >
          전송
        </StyleBorderButton>
      </div>
    </SwiperCard>
  );
}
