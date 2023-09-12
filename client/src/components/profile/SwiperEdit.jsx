import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Input from '../common/Input';
import { StyleBorderButton } from '../common/Buttons';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import api from '../../hooks/useAxiosInterceptor';
import useNav from '../../hooks/useNav';
import { useParams } from 'react-router-dom';
import { isValidPhone } from './isValid';
import Modal from '../common/Modal';

const SwiperCard = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 3rem;
  padding: 2rem;
  transition: all 0.4s;
  position: relative;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
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
  border: 1px solid var(--black-400);
  border-radius: 5px;
  transition: all.2s;
  width: fit-content;
  height: fit-content;
  text-align: center;
  padding: 5px 10px;
  font-size: 1.2rem;
  svg {
    cursor: pointer;
  }
  &:hover {
    background-color: white;
    color: black;
  }
`;

export default function SwiperEdit({ data, idx, handler, type, setData, trueData }) {
  const [temp, setTemp] = useState({
    ...data,
    tell: { value: data.tell, error: '' },
    aboutMe: { value: data.aboutMe, error: '' },
    tags: data.tags,
    curString: '',
  });
  const { memberId } = useParams();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (type === 'new') {
      setTemp({
        tell: { value: '', error: '' },
        aboutMe: { value: '', error: '' },
        tags: [],
        curString: '',
      });
    }
    if (type === 'fetch' && temp.tags[0] === undefined) {
      setTemp({
        ...temp,
        tags: [],
      });
    }
  }, []);

  const handleClickSubmit = () => {
    const isvalidPhone = isValidPhone(temp.tell.value.replace(/-/g, ''));
    if (type === 'fetch') {
      if (isvalidPhone && temp.title.value.length <= 20 && temp.aboutMe.value.length <= 200) {
        api
          .patch(`/projectcards/${idx}`, {
            tags: temp.tags,
            tell: temp.tell.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
            aboutMe: temp.aboutMe.value,
          })
          .then((el) => {
            setIsSubmit(true);
            const tem = trueData.projectCard;
            tem[idx] = {
              tags: temp.tags,
              tell: temp.tell.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
              aboutMe: temp.aboutMe.value,
            };
            setData({ ...trueData, projectCard: tem });
            handleClickCancel();
          });
      } else if (!isvalidPhone) {
        setTemp({ ...temp, tell: { ...temp.tell, error: '-를 제외한 전화번호를 입력해주세요.' } });
      } else if (temp.aboutMe.value.length > 200) {
        setTemp({
          ...temp,
          abooutMe: { ...temp.abooutMe, error: '200 글자 이하로 입력해주세요.' },
        });
      }
    } else if (type === 'new') {
      if (isvalidPhone && temp.aboutMe.value.length <= 200) {
        api
          .post(`/projectcards/${memberId}`, {
            tags: temp.tags,
            tell: temp.tell.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
            aboutMe: temp.aboutMe.value,
          })
          .then((el) => {
            setIsSubmit(true);
            const idx = trueData.projectCard.findIndex((item) => Object.keys(item).length === 0);
            const tem = trueData.projectCard;
            tem[idx] = {
              tags: temp.tags,
              tell: temp.tell.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
              aboutMe: temp.aboutMe.value,
            };
            setData({ ...trueData, projectCard: tem });
            handleClickCancel();
          });
      } else if (!isvalidPhone) {
        setTemp({ ...temp, tell: { ...temp.tell, error: '-를 제외한 전화번호를 입력해주세요.' } });
      } else if (temp.aboutMe.value.length > 200) {
        setTemp({
          ...temp,
          abooutMe: { ...temp.abooutMe, error: '200 글자 이하로 입력해주세요.' },
        });
      }
    }
  };

  const handleClickCancel = () => {
    handler('all');
  };

  const handleTagKeyDown = (e) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    e.preventDefault();
    if (temp.curString.length <= 10 && temp.curString.length > 0) {
      if (
        temp.tags?.length <= 2 &&
        temp.tags.filter((el) => el.toLowerCase() === temp.curString.toLowerCase()).length === 0
      ) {
        setTemp({
          ...temp,
          tags: [...temp.tags, temp.curString],
          curString: '',
        });
      }
    }
  };

  return (
    <SwiperCard className="col">
      {isSubmit && (
        <Modal
          setIsOpen={setIsSubmit}
          type="alert"
          title={type === 'fetch' ? '수정완료' : '생성완료'}
        />
      )}
      <div className="cancel">
        <AiOutlineCloseCircle color={'var(--error)'} size={40} onClick={handleClickCancel} />
      </div>
      <h3>{`카드 ${type === 'fetch' ? '수정' : '생성'}`}</h3>
      <Input
        label="자기소개"
        width="100%"
        height="15rem"
        type="textarea"
        placeholder="200글자까지 작성이 가능합니다."
        value={temp.aboutMe.value || ''}
        error={temp.aboutMe.error}
        onChange={(e) => setTemp({ ...temp, aboutMe: { ...temp.aboutMe, value: e.target.value } })}
      />
      <Input
        label="연락처"
        width="100%"
        type="text"
        placeholder="- 없이 숫자만 입력해주세요."
        value={type === 'new' ? temp.tell.value || '' : temp.tell.value.replace(/-/g, '') || ''}
        error={temp.tell.error}
        onChange={(e) => setTemp({ ...temp, tell: { ...temp.tell, value: e.target.value } })}
      />
      <div className="tagwrapper">
        <Input
          label="태그"
          width="100%"
          height="3.5rem"
          type="text"
          placeholder="태그는 최대 중복제외 3개까지 등록이 가능합니다."
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
          {`${type === 'fetch' ? '수정' : '생성'}`}
        </StyleBorderButton>
      </div>
    </SwiperCard>
  );
}
