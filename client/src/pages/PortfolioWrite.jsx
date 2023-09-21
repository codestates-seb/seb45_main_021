import React, { useState } from 'react';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import useForm from '../hooks/useForm';
import useNav from '../hooks/useNav';
import EnterTag from '../components/PfPjPublic/EnterTag';
import WriteDescription from '../components/PfPjPublic/WriteHeader';
import SelectBox from '../components/PfPjPublic/SelectBox';
import useError from '../hooks/useError';
import { checkValidations } from '../utils/checkValidations';
import ProGress from '../components/common/ProGress';
import ToggleButton from '../components/common/ToggleButton';
import languages from '../static/languages';
import {
  portfolioErrorInitData,
  portfolioWriteInitData,
  portfolioWriteRule,
} from '../static/portfolioInit';
import Modal from '../components/common/Modal';
import { useSelector } from 'react-redux';
import { StyleBackgroundButton } from '../components/common/Buttons';
import useSubmitWriteEdit from '../hooks/useSubmitWriteEdit';
import { tablet, desktop } from '../static/theme';

import styled from 'styled-components';

export const StylePortfolioWrite = styled.section`
  width: var(--inner);
  margin: var(--center);
  padding-top: 50px;
  .write-wrapper {
    display: flex;
    .input-container {
      gap: 15px;
      width: 1%;
      flex: 1;
    }
    gap: 100px;
    ${desktop} {
      flex-direction: column;
      .input-container {
        width: 100%;
        flex: 1;
      }
    }
  }
  .write-description {
    position: sticky;
    top: 50px;
    order: 1;
    ${desktop} {
      position: static;
      order: 0;
    }
  }
  input {
    border: none;
    border-bottom: 1px solid var(--black-600);
    padding-top: 10px;
    padding-left: 3px;
    border-radius: 0;
    transition: all.1s;
    font-weight: var(--nanum-semi-bold);
    font-size: 1.6rem;
    &:focus {
      border-color: var(--black-100);
    }
  }
  .progress-input {
    position: relative;
    .progress-bar {
      position: absolute;
      bottom: 25px;
    }
  }
  .selectors {
    position: relative;
    display: flex;
    gap: 30px;
    .lang-selector {
      flex: 1;
    }
  }
  .tag-container {
    margin-top: 30px;
    input {
      margin-bottom: -10px;
    }
  }
  .body-content {
    border: 1px solid var(--black-500);
    transition: all.1s;
    font-weight: var(--nanum-bold);
    font-size: 1.6rem;
    &:focus {
      border-color: var(--black-100);
    }
  }
  .progress-textarea {
    position: relative;
    .progress-bar {
      position: absolute;
      top: 10px;
    }
  }

  .body-image {
    margin-top: 40px;
  }
  .button-box {
    margin-top: 60px;
    display: flex;
    gap: 20px;
    button {
      width: 70px;
    }
  }
`;

export default function PortfolioWrite() {
  const { toPortfolio } = useNav();
  const [dataForm, handleInputChange] = useForm(portfolioWriteInitData);
  const [errors, handleErrorChange, clearError, setErrors] = useError(
    portfolioErrorInitData,
    portfolioWriteRule,
  );
  const [showModal, setShowModal] = useState(false);
  const [apiResult, isSuccess, submitHandler, setApiResult] = useSubmitWriteEdit();
  const [isCancel, setIsCancel] = useState(false);
  const loginUserData = useSelector((state) => state.user);

  const width = '100%';
  const height = '40rem';

  //테스트용 언어 옵션들
  const languagesOptions = (() => {
    const arr = [];
    arr.push({ value: '', label: '-' });
    for (let i = 0; i < languages.length; i++) {
      arr.push({ value: languages[i], label: languages[i] });
    }
    return arr;
  })();

  return (
    <StylePortfolioWrite className="col">
      {showModal && (
        <Modal
          type={isCancel ? 'confirm' : 'alert'}
          setIsOpen={setShowModal}
          title={'알림'}
          body={apiResult}
          confirmHandler={() => (isSuccess || isCancel ? toPortfolio() : setShowModal(false))}
        />
      )}
      <div className="write-wrapper">
        <WriteDescription type="portfolio" />
        <div className="input-container col">
          <div className="progress-input">
            <Input
              label={'포트폴리오 제목'}
              width={'100%'}
              onChange={(e) => {
                handleInputChange(null, e.target.value, 'title');
                handleErrorChange(null, e.target.value, 'title', checkValidations);
              }}
              placeholder={'10 - 30 글자를 입력해주세요'}
              type="text"
              maxLength={30}
            />
            <ProGress
              width={'100%'}
              fontSize={'1.3rem'}
              comPleteNum={portfolioWriteRule.title.max}
              proGressNum={dataForm.title.length ?? 0}
              error={dataForm.title.length < 10 ? true : false}
            />
          </div>
          <div className="selectors">
            <SelectBox
              className="lang-selector"
              text={'언어 선택'}
              component={
                <Select
                  height="37px"
                  width={width}
                  options={languagesOptions}
                  defaultLabel={'-'}
                  onClickHandler={(e) => {
                    handleInputChange(null, e, 'lang');
                    handleErrorChange(null, e, 'lang', checkValidations);
                  }}
                />
              }
            />
            <SelectBox
              className="comment-selector"
              text={'댓글작성 허용'}
              component={
                <ToggleButton
                  onClickHandler={() => {
                    handleInputChange(null, dataForm.isComment ? 0 : 1, 'isComment');
                  }}
                  defaultValue={dataForm.isComment}
                  hideError={true}
                />
              }
            />
            <SelectBox
              text={'구직용 여부'}
              component={
                <ToggleButton
                  onClickHandler={() => {
                    handleInputChange(null, dataForm.isEmploy ? 0 : 1, 'isEmploy');
                  }}
                  defaultValue={dataForm.isEmploy}
                  hideError={true}
                />
              }
              hideError={true}
            />
          </div>
          <EnterTag
            className="tag-container"
            width="100%"
            placeholder="태그는 최대 3개까지 등록이 가능합니다."
            dataForm={dataForm}
            handleInputChange={handleInputChange}
          />
          <div className="progress-textarea">
            <Input
              className="body-content"
              label={'포트폴리오 본문'}
              width={width}
              height={height}
              type={'textarea'}
              onChange={(e) => {
                handleInputChange(null, e.target.value, 'body');
                handleErrorChange(null, e.target.value, 'body', checkValidations);
              }}
              placeholder={'200 - 1000 글자를 입력해주세요'}
              maxLength={1000}
              error={errors.body}
            />
            <ProGress
              width={'100%'}
              height={'1.2rem'}
              fontSize={'1.2rem'}
              comPleteNum={portfolioWriteRule.body.max}
              proGressNum={dataForm.body.length ?? 0}
              error={dataForm.body.length < 200 ? true : false}
            />
          </div>
          <FileInput
            className="title-image"
            name={'타이틀 이미지'}
            width={'100%'}
            height={'200px'}
            number={1}
            dataForm={dataForm}
            handleInputChange={handleInputChange}
            handleErrorChange={handleErrorChange}
            clearError={clearError}
          />
          <FileInput
            className="body-image"
            name={'이미지'}
            width={'100%'}
            height={'200px'}
            number={10}
            dataForm={dataForm}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
      <div className="button-box">
        <StyleBackgroundButton
          onClick={() => {
            setShowModal(true);
            submitHandler(
              dataForm,
              errors,
              setErrors,
              'portfolio',
              loginUserData.userInfo.memberId,
            );
          }}
        >
          작성
        </StyleBackgroundButton>
        <StyleBackgroundButton
          onClick={() => {
            setShowModal(true);
            setIsCancel(true);
            setApiResult('작성 취소시 작성한 내용은 저장되지 않습니다.');
          }}
        >
          취소
        </StyleBackgroundButton>
      </div>
    </StylePortfolioWrite>
  );
}
