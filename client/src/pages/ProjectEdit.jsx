import React, { useEffect, useState } from 'react';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import { StyleBorderButton } from '../components/common/Buttons';
import useForm from '../hooks/useForm';
import useNav from '../hooks/useNav';
import EnterTag from '../components/PfPjPublic/EnterTag';
import WriteDescription from '../components/PfPjPublic/WriteHeader';
import SelectBox from '../components/PfPjPublic/SelectBox';
import useError from '../hooks/useError';
import { checkValidations } from '../utils/checkValidations';
import ProGress from '../components/common/ProGress';
import languages from '../static/languages';
import api from '../hooks/useAxiosInterceptor';
import { projectWriteInitData, projectWriteRule } from '../static/projectInit';
import { shapingApiData } from '../utils/shapingApiData';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Modal from '../components/common/Modal';
import useSubmitWriteEdit from '../hooks/useSubmitWriteEdit';
import { StyleProjectWrite } from './ProjectWrite';
import NotFound from './NotFound';


export default function ProjectEdit() {
  const { toProject } = useNav();
  const { projectId } = useParams();
  const [dataForm, handleInputChange, clearForm, setDataForm] = useForm(projectWriteInitData);
  const [errors, handleErrorChange, clearError, setErrors] = useError({}, projectWriteRule);
  const [showModal, setShowModal] = useState(false);
  const [apiResult, isSuccess, submitHandler, setApiResult] = useSubmitWriteEdit();
  const [isCancel, setIsCancel] = useState(false);
  //false면 프론트측 에러 true면 백측에러
  const [firstApiSuccess, setFirstApiSuccess] = useState(true);
  const loginUserData = useSelector((state) => state.user);
  const {
    userInfo: { memberId },
  } = useSelector((state) => state.user);

  useEffect(() => {
    api
      .get(`/projects/${projectId}`)
      .then((res) => {
        if (res.data.memberId !== memberId) {
          toProject();
          alert('수정 권한이 없습니다');
        }
        setDataForm(shapingApiData(res.data));
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

  const width = '100%';
  const height = '30rem';

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
                type={isCancel ? 'confirm' : 'alert'}
                setIsOpen={setShowModal}
                title={'알림'}
                body={
                  firstApiSuccess ? apiResult : '서버와의 통신에 실패했습니다. 다시 시도해 주세요.'
                }
                confirmHandler={() =>
                  !firstApiSuccess || isSuccess || isCancel ? toProject() : setShowModal(false)
                }
              />
            )}
            <div className='write-wrapper'>
              <WriteDescription type="project" state="edit" />
              <div className="input-container col">
                <div className="progress-input">
                  <Input
                    label={'프로젝트 제목'}
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
                    comPleteNum={projectWriteRule.title.max}
                    proGressNum={dataForm.title.length ?? 0}
                    error={dataForm.title.length < 10 ? true : false}
                  />
                </div>
                <div className='selectors col'>
                  <SelectBox
                    className="lang-selector"
                    text={'언어 선택'}
                    component={
                      <Select
                        width={width}
                        options={languagesOptions}
                        defaultLabel={dataForm.lang}
                        onClickHandler={(e) => {
                          handleInputChange(null, e, 'lang');
                          handleErrorChange(null, e, 'lang', checkValidations);
                        }}
                      />
                    }
                  />
                </div>

                <EnterTag
                  width="100%"
                  height="3.5rem"
                  placeholder="태그는 최대 3개까지 등록이 가능합니다."
                  defaultTags={
                    dataForm.tags.length === 1 && dataForm.tags[0] === '' ? [] : dataForm.tags
                  }
                  handleInputChange={handleInputChange}
                />
                <div className='progress-textarea'>
                  <Input
                    label={'기획서'}
                    width={width}
                    height={height}
                    type={'textarea'}
                    onChange={(e) => {
                      handleInputChange(null, e.target.value, 'body');
                      handleErrorChange(null, e.target.value, 'body', checkValidations);
                    }}
                    placeholder={'최소 100 ~ 500글자까지 입력 가능합니다. (필수)'}
                    maxLength={500}
                    defaultValue={dataForm.body}
                  />
                  <ProGress
                    className={'margin-top-remove'}
                    width={'100%'}
                    height={'1.2rem'}
                    fontSize={'1.2rem'}
                    comPleteNum={projectWriteRule.body.max}
                    proGressNum={dataForm.body.length ?? 0}
                    error={dataForm.body.length < 100 ? true : false}
                  />
                </div>
                <div className='progress-textarae'>
                  <Input
                    label={'상세 요강'}
                    width={width}
                    height={height}
                    type={'textarea'}
                    onChange={(e) => {
                      handleInputChange(null, e.target.value, 'description');
                      handleErrorChange(null, e.target.value, 'description', checkValidations);
                    }}
                    placeholder={'최대 200글자까지 입력 가능합니다. (선택)'}
                    maxLength={200}
                    defaultValue={dataForm.description}
                  />
                  <ProGress
                    className={'margin-top-remove'}
                    width={'100%'}
                    height={'1.2rem'}
                    fontSize={'1.2rem'}
                    comPleteNum={projectWriteRule.description.max}
                    proGressNum={dataForm.description.length ?? 0}
                    error={dataForm.description.length > 200 ? true : false}
                  />
                </div>
                  <FileInput
                    name={'타이틀 이미지'}
                    width={'100%'}
                    height={'200px'}
                    number={1}
                    dataForm={dataForm}
                    handleInputChange={handleInputChange}
                    handleErrorChange={handleErrorChange}
                    clearError={clearError}
                    defaultImgs={dataForm.titleImage}
                    setWillDeleteImgs={true}
                  />

                  <FileInput
                    name={'이미지'}
                    width={'100%'}
                    height={'200px'}
                    number={7}
                    dataForm={dataForm}
                    handleInputChange={handleInputChange}
                    defaultImgs={dataForm.images}
                    setWillDeleteImgs={true}
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
                    'project',
                    loginUserData.userInfo.memberId,
                    projectId,
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
          </StyleProjectWrite>
        )
      )}
    </>
  );
}
