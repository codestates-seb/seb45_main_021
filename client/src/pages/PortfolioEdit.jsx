import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import useForm from '../hooks/useForm';
import Page from './../components/common/Page';
import useNav from '../hooks/useNav';
import EnterTag from '../components/PfPjPublic/EnterTag';
import WriteDescription from '../components/PfPjPublic/WriteHeader';
import SelectBox from '../components/PfPjPublic/SelectBox';
import useError from '../hooks/useError';
import { checkValidations } from '../utils/checkValidations';
import ProGress from '../components/common/ProGress';
import ToggleButton from '../components/common/ToggleButton';
import languages from '../static/languages';
import { portfolioWriteInitData, portfolioWriteRule } from '../static/portfolioInit';
import { shapingApiData } from '../utils/shapingApiData';
import { useParams } from 'react-router-dom';
import api from '../hooks/useAxiosInterceptor';
import Modal from '../components/common/Modal';
import { StyleBorderButton } from '../components/common/Buttons';
import { useSelector } from 'react-redux';
import useSubmitWriteEdit from '../hooks/useSubmitWriteEdit';
import StylePortfolioWrite from '../components/common/PortfolioWriteCommon';
import NotFound from './NotFound';

export default function PortfolioEdit() {
  const { toPortfolio } = useNav();
  const { portfolioId } = useParams();
  const [dataForm, handleInputChange, clearForm, setDataForm] = useForm(portfolioWriteInitData);
  const [errors, handleErrorChange, clearError, setErrors] = useError({}, portfolioWriteRule);
  const [showModal, setShowModal] = useState(false);
  const [apiResult, isSuccess, submitHandler, setApiResult] = useSubmitWriteEdit();
  const [isCancel, setIsCancel] = useState(false);
  const [firstApiSuccess, setFirstApiSuccess] = useState(true);
  const loginUserData = useSelector((state) => state.user);
  const {
    userInfo: { memberId },
  } = useSelector((state) => state.user);
  const width = '100%';
  const height = '40rem';

  useEffect(() => {
    api
      .get(`/portfolios/${portfolioId}`)
      .then((res) => {
        if (res.data.data.memberId !== memberId) {
          toPortfolio();
          alert('수정 권한이 없습니다');
        }
        setDataForm(shapingApiData(res.data.data));
        setFirstApiSuccess(true);
      })
      .catch((err) => {
        setShowModal(true);
        if (err.message === 'Request failed with status code 404') {
          setFirstApiSuccess('404');
        } else {
          setFirstApiSuccess(false);
        }
      });
  }, []);

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
    <>
      {firstApiSuccess === '404' ? (
        <NotFound />
      ) : (
        firstApiSuccess === true && (
          <StylePortfolioWrite className="col">
            {showModal && (
              <Modal
                type={isCancel ? 'confirm' : 'alert'}
                setIsOpen={setShowModal}
                title={'알림'}
                body={
                  firstApiSuccess ? apiResult : '서버와의 통신에 실패했습니다. 다시 시도해 주세요.'
                }
                confirmHandler={() =>
                  !firstApiSuccess || isSuccess || isCancel ? toPortfolio() : setShowModal(false)
                }
              />
            )}
            <div className="write-wrapper">
              <WriteDescription type="portfolio" state="edit" />
              <div className="input-container col">
                <div className="progress-input">
                  <Input
                    label={'포트폴리오 제목'}
                    width={'100%'}
                    onChange={(e) => {
                      handleInputChange(null, e.target.value, 'title');
                      handleErrorChange(null, e.target.value, 'title', checkValidations);
                    }}
                    placeholder={'최소 10 글자 최대 30글자까지 입력 가능 합니다. (필수)'}
                    type="text"
                    maxLength={30}
                    defaultValue={dataForm.title}
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
                        defaultLabel={dataForm.lang}
                        onClickHandler={(e) => {
                          handleInputChange(null, e, 'language');
                          handleErrorChange(null, e, 'language', checkValidations);
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
                  height="3.5rem"
                  placeholder="태그는 최대 3개까지 등록이 가능합니다."
                  handleInputChange={handleInputChange}
                  defaultTags={
                    dataForm.tags.length === 1 && dataForm.tags[0] === '' ? [] : dataForm.tags
                  }
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
                    placeholder={'최소 200 ~ 1000글자까지 입력 가능합니다. (필수)'}
                    maxLength={1000}
                    error={errors.body}
                    defaultValue={dataForm.body}
                  />
                  <ProGress
                    className={'margin-top-remove'}
                    width={'100%'}
                    height={'1.2rem'}
                    fontSize={'1.2rem'}
                    comPleteNum={portfolioWriteRule.body.max}
                    proGressNum={dataForm.body.length ?? 0}
                    error={dataForm.body.length < 100 ? true : false}
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
                  setWillDeleteImgs={true}
                  clearError={clearError}
                  defaultImgs={dataForm.titleImage}
                />

                <FileInput
                  className="body-image"
                  name={'이미지'}
                  width={'100%'}
                  height={'200px'}
                  number={10}
                  dataForm={dataForm}
                  handleInputChange={handleInputChange}
                  setWillDeleteImgs={true}
                  defaultImgs={dataForm.images}
                />
              </div>
            </div>
            <div className="button-box">
              <StyleBorderButton
                onClick={() => {
                  setShowModal(true);
                  submitHandler(
                    dataForm,
                    errors,
                    setErrors,
                    'portfolio',
                    loginUserData.userInfo.memberId,
                    portfolioId,
                  );
                }}
              >
                수정
              </StyleBorderButton>
              <StyleBorderButton
                onClick={() => {
                  setShowModal(true);
                  setIsCancel(true);
                  setApiResult('작성 취소시 작성한 내용은 저장되지 않습니다.');
                }}
              >
                취소
              </StyleBorderButton>
            </div>
          </StylePortfolioWrite>
        )
      )}
    </>
  );
}
