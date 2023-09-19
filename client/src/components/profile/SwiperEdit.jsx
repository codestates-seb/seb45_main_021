import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import Input from '../common/Input';
import { StyleBorderButton } from '../common/Buttons';
import { AiOutlineClose, AiOutlineCloseCircle } from 'react-icons/ai';
import api from '../../hooks/useAxiosInterceptor';
import ProGress from '../common/ProGress';
import { useParams } from 'react-router-dom';
import { isValidPhone } from './isValid';
import Modal from '../common/Modal';
import { isValidTag } from './isValid';

const SwiperCard = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 10px;
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
  margin-top: 8px;
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
  });
  const { memberId } = useParams();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if (type === 'new') {
      setTemp({
        tell: { value: '', error: '' },
        aboutMe: { value: '', error: '' },
        tags: { value: [], error: '', curString: '' },
      });
    }
  }, []);

  const handleClickSubmit = () => {
    console.log(temp);
    const isvalidPhone = isValidPhone(temp.tell.value.replace(/-/g, ''));
    if (type === 'fetch') {
      if (
        isvalidPhone &&
        temp.aboutMe.value.length <= 200 &&
        temp.abooutMe.value.trim().length > 0
      ) {
        api
          .patch(`/projectcards/${data.projectCardId}`, {
            tags: temp.tags.value,
            tell: temp.tell.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
            aboutMe: temp.aboutMe.value,
          })
          .then((el) => {
            setIsSubmit(true);
            const tem = trueData.projectCard;
            const index = tem.findIndex((ele) => ele.projectCardId === data.projectCardId);
            tem[index] = {
              ...tem[index],
              working: trueData.profile.working,
              tags: { value: temp.tags.value, error: '', curString: '' },
              tell: temp.tell.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
              aboutMe: temp.aboutMe.value,
            };
            setData({ ...trueData, projectCard: tem });
            handleClickCancel();
          });
      } else {
        if (!isvalidPhone) {
          setTemp({
            ...temp,
            tell: { ...temp.tell, error: '-를 제외한 전화번호를 입력해주세요.' },
          });
        }
        if (temp.aboutMe.value.length > 200) {
          setTemp({
            ...temp,
            abooutMe: { ...temp.abooutMe.slice(0, 200), error: '200 글자 이하로 입력해주세요.' },
          });
        }
        if (!temp.abooutMe.value.trim().length > 0) {
          setTemp({
            ...temp,
            abooutMe: { ...temp.aboutMe, error: '비워둘 수 없습니다.' },
          });
        }
      }
    } else if (type === 'new') {
      if (
        isvalidPhone &&
        temp.aboutMe.value.length <= 200 &&
        temp.aboutMe.value.trim().length > 0
      ) {
        api
          .post(`/projectcards/${memberId}`, {
            tags: temp.tags.value,
            tell: temp.tell.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
            aboutMe: temp.aboutMe.value,
          })
          .then((el) => {
            setIsSubmit(true);
            const idx = trueData.projectCard.findIndex(
              (item) => !item.hasOwnProperty('projectCardId'),
            );
            const tem = trueData.projectCard;
            tem[idx] = {
              projectCardId: el.data.projectCardId,
              working: trueData.profile.working,
              userImgUrl: trueData.profile.userImgUrl,
              tags: { value: temp.tags.value, error: '', curString: '' },
              tell: temp.tell.value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'),
              aboutMe: temp.aboutMe.value,
            };
            setData({ ...trueData, projectCard: tem });
            handleClickCancel();
          });
      } else {
        if (!isvalidPhone) {
          setTemp({
            ...temp,
            tell: { ...temp.tell, error: '-를 제외한 전화번호를 입력해주세요.' },
          });
        }
        if (temp.aboutMe.value.length > 200) {
          setTemp({
            ...temp,
            abooutMe: { ...temp.abooutMe, error: '200 글자 이하로 입력해주세요.' },
          });
        }
        if (!temp.aboutMe.value.trim().length > 0) {
          setTemp({
            ...temp,
            aboutMe: { ...temp.aboutMe, error: '비워둘 수 없습니다.' },
          });
        }
      }
    }
  };

  const handleClickCancel = () => {
    handler('all');
  };

  const handleTagKeyDown = (e) => {
    if (e.code !== 'Enter' && e.code !== 'NumpadEnter') return;
    // e.preventDefault();
    if (
      temp.tags.curString.split(' ').join('').length <= 10 &&
      temp.tags.curString.split(' ').join('').length > 0
    ) {
      if (
        temp.tags.value?.length <= 2 &&
        temp.tags.value.filter((el) => el.toLowerCase() === temp.tags.curString.toLowerCase())
          .length === 0 &&
        isValidTag(temp.tags.curString)
      ) {
        setTemp({
          ...temp,
          tags: {
            value: [...temp.tags.value, e.target.value.split(' ').join('')],
            error: '',
            curString: '',
          },
        });
        setTimeout(() => {
          e.target.value = '';
        }, 0);
      } else if (!isValidTag(temp.tags.curString)) {
        setTemp({
          ...temp,
          tags: {
            ...temp.tags,
            error: '한글은 자음과 모음만 등록할 수 없습니다.',
            curString: '',
          },
        });
      } else {
        setTemp({
          ...temp,
          tags: {
            ...temp.tags,
            error: '중복은 허용하지 않습니다.',
            curString: '',
          },
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
        borderRadius="10px"
        maxLength={200}
        placeholder="200글자까지 작성이 가능합니다."
        value={temp.aboutMe.value || ''}
        error={temp.aboutMe.error}
        onChange={(e) => setTemp({ ...temp, aboutMe: { ...temp.aboutMe, value: e.target.value } })}
      />
      <ProGress comPleteNum={200} proGressNum={temp.aboutMe.value?.length} fontSize="1.5rem" />
      <Input
        label="연락처"
        width="100%"
        type="text"
        maxLength={11}
        borderRadius="10px"
        placeholder="- 없이 숫자만 입력해주세요."
        value={type === 'new' ? temp.tell.value || '' : temp.tell.value.replace(/-/g, '') || ''}
        error={temp.tell.error}
        onChange={(e) => setTemp({ ...temp, tell: { ...temp.tell, value: e.target.value } })}
      />
      <ProGress comPleteNum={11} proGressNum={temp.tell.value?.length} fontSize="1.5rem" />
      <div className="tagwrapper">
        <Input
          label="태그"
          width="100%"
          height="3.5rem"
          type="text"
          borderRadius="10px"
          maxLength={10}
          placeholder="태그는 최대 중복제외 3개까지 등록이 가능합니다."
          error={temp.tags.error}
          onChange={(e) =>
            setTemp({
              ...temp,
              tags: { ...temp.tags, curString: e.target.value },
            })
          }
          onKeyDown={handleTagKeyDown}
        />
        <ProGress comPleteNum={3} proGressNum={temp.tags.value.length} fontSize="1.5rem" />
        <div className="row gap">
          {temp.tags.value.map((el, i) => (
            <Tag key={i}>
              {el}
              <AiOutlineClose
                size={15}
                color={'var(--error)'}
                onClick={() =>
                  setTemp({
                    ...temp,
                    tags: {
                      value: temp.tags.value.filter((_, idx) => i !== idx),
                      error: '',
                      curString: '',
                    },
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
          $radius="10px"
          $fontSize="4rem"
          onClick={handleClickSubmit}
        >
          {`${type === 'fetch' ? '수정' : '생성'}`}
        </StyleBorderButton>
      </div>
    </SwiperCard>
  );
}
