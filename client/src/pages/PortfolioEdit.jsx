import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import useForm from '../hooks/useForm';
import Page from './../components/common/Page';
import useNav from '../hooks/useNav';
import EnterTag from '../components/PfPjPublic/EnterTag';
import WriteHeader from '../components/PfPjPublic/WriteHeader';
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
import { StyleProjectWrite } from './ProjectWrite';
import NotFound from './NotFound';

// const StyleProjectWrite = styled(Page)`
//   height: auto;
//   background-color: transparent;
//   padding-top: 6rem;
//   font-size: 1.6rem;

//   .margin-top-remove {
//     margin-top: -20px !important;
//   }
//   .input-container {
//     flex: 5;
//     height: 100%;
//     margin-right: 3rem;
//     > div {
//       margin-bottom: 3rem;
//     }
//   }
//   .imgs-container {
//     flex: 6;
//     height: auto;
//     > div {
//       margin-bottom: 6rem;
//     }
//   }
//   .submit-box {
//     width: 100%;
//     margin-bottom: 10rem;
//     display: flex;
//     button {
//       font-size: 1.6rem;
//       padding: 5px 15px;
//       margin-right: 5rem;
//     }
//   }
//   .data-select-container {
//     gap: 1rem;
//     div {
//       flex: 1;
//     }
//   }
//   .error {
//     color: var(--error);
//     margin-top: 1rem;
//   }
// `;

export default function PortfolioEdit() {
  const { toPortfolio } = useNav();
  const { portfolioId } = useParams();
  const [dataForm, handleInputChange, clearForm, setDataForm] = useForm(portfolioWriteInitData);
  const [errors, handleErrorChange, clearError, setErrors] = useError({}, portfolioWriteRule);
  const [showModal, setShowModal] = useState(false);
  const [apiResult, isSuccess, submitHandler] = useSubmitWriteEdit();
  const [firstApiSuccess, setFirstApiSuccess] = useState(true);
  const loginUserData = useSelector((state) => state.user);
  const {
    userInfo: { memberId },
  } = useSelector((state) => state.user);
  const width = '100%';
  const height = '70rem';

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
          <StyleProjectWrite className="col">
            {showModal && (
              <Modal
                type={'alert'}
                setIsOpen={setShowModal}
                title={'알림'}
                body={
                  firstApiSuccess ? apiResult : '서버와의 통신에 실패했습니다. 다시 시도해 주세요.'
                }
                confirmHandler={() =>
                  !firstApiSuccess || isSuccess ? toPortfolio() : setShowModal(false)
                }
              />
            )}
            <WriteHeader type="portfolio" state="edit" />
            <div className="write-wrapper row">
              <div className="input-container col">
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
                  className={'margin-top-remove'}
                  width={'100%'}
                  height={'1.2rem'}
                  fontSize={'1.2rem'}
                  comPleteNum={portfolioWriteRule.title.max}
                  proGressNum={dataForm.title.length ?? 0}
                  error={dataForm.title.length < 10 ? true : false}
                />

                <SelectBox
                  text={'사용할 언어를 선택 해주세요.'}
                  component={
                    <Select
                      width={width}
                      options={languagesOptions}
                      defaultLabel={dataForm.lang}
                      onClickHandler={(e) => {
                        handleInputChange(null, e, 'language');
                        handleErrorChange(null, e, 'language', checkValidations);
                      }}
                    />
                  }
                  error={errors.lang}
                  name="언어"
                />

                <SelectBox
                  text={'포트폴리오에 댓글 허용 여부'}
                  component={
                    <ToggleButton
                      width="10rem"
                      height="5rem"
                      onClickHandler={() => {
                        handleInputChange(null, dataForm.isComment ? 0 : 1, 'isComment');
                      }}
                      defaultValue={dataForm.isComment}
                      hideError={true}
                    />
                  }
                  hideError={true}
                  margin="3rem"
                  customText={dataForm.isComment ? '허용됨' : '허용되지 않음'}
                />

                <SelectBox
                  text={'구직용, 재직용 임시'}
                  component={
                    <ToggleButton
                      width="10rem"
                      height="5rem"
                      onClickHandler={() => {
                        handleInputChange(null, dataForm.isEmploy ? 0 : 1, 'isEmploy');
                      }}
                      defaultValue={dataForm.isEmploy}
                      hideError={true}
                    />
                  }
                  hideError={true}
                  margin="3rem"
                  customText={dataForm.isEmploy ? '구직을 위한 포트폴리오' : '일반 포트폴리오'}
                />

                <EnterTag
                  width="100%"
                  height="3.5rem"
                  placeholder="태그는 최대 3개까지 등록이 가능합니다."
                  handleInputChange={handleInputChange}
                  defaultTags={
                    dataForm.tags.length === 1 && dataForm.tags[0] === '' ? [] : dataForm.tags
                  }
                />

                <Input
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

              <div className="imgs-container col">
                <FileInput
                  name={'타이틀 이미지'}
                  width={'100%'}
                  height={'55rem'}
                  number={1}
                  dataForm={dataForm}
                  handleInputChange={handleInputChange}
                  handleErrorChange={handleErrorChange}
                  setWillDeleteImgs={true}
                  clearError={clearError}
                  defaultImgs={dataForm.titleImage}
                />

                <FileInput
                  name={'이미지'}
                  width={'100%'}
                  height={'55rem'}
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
              <StyleBorderButton>취소</StyleBorderButton>
            </div>
          </StyleProjectWrite>
        )
      )}
    </>
  );
}
