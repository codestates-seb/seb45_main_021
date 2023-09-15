import React, { useState } from 'react';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import  useForm  from '../hooks/useForm';
import useNav from '../hooks/useNav';
import EnterTag from '../components/PfPjPublic/EnterTag';
import WriteHeader from '../components/PfPjPublic/WriteHeader';
import SelectBox from '../components/PfPjPublic/SelectBox';
import useError from '../hooks/useError';
import { checkValidations } from '../utils/checkValidations';
import ProGress from '../components/common/ProGress';
import ToggleButton from '../components/common/ToggleButton';
import languages from '../static/languages';
import { portfolioErrorInitData, portfolioWriteInitData, portfolioWriteRule } from '../static/portfolioInit';
import Modal from '../components/common/Modal';
import { useSelector } from 'react-redux';
import { StyleBorderButton } from '../components/common/Buttons';
import {StyleProjectWrite} from '../pages/ProjectWrite';
import useSubmitWriteEdit from '../hooks/useSubmitWriteEdit';

export default function PortfolioWrite() {
  const {toPortfolio} = useNav();
  const [dataForm,handleInputChange] = useForm(portfolioWriteInitData);
  const [errors, handleErrorChange, clearError, setErrors ] = useError(portfolioErrorInitData , portfolioWriteRule);
  const [showModal, setShowModal] = useState(false);
  const [apiResult, isSuccess, submitHandler] = useSubmitWriteEdit();
  const loginUserData = useSelector(state=>state.user);

  const width = '100%';
  const height = '70rem';

  //테스트용 언어 옵션들
  const languagesOptions = (() => {
    const arr = [];
    arr.push({value : '', label : '-'});
    for(let i = 0; i < languages.length; i++) {
      arr.push({value: languages[i], label : languages[i]});
    }
    return arr;
  })()

  return (
    <StyleProjectWrite className='col'>
      {showModal && <Modal
        type={'alert'}
        setIsOpen={setShowModal}
        title={'알림'}
        body={apiResult}
        confirmHandler={() => isSuccess ? toPortfolio() : setShowModal(false)}
      />}
      <WriteHeader type='portfolio'/>
      <div className='write-wrapper row'>
        <div className='input-container col'>
          <Input
            label={'포트폴리오 제목'}
            width={'100%'}
            onChange={(e)=>{
              handleInputChange(null,e.target.value,'title');
              handleErrorChange(null,e.target.value,'title',checkValidations);
            }}
            placeholder={'최소 10 글자 최대 30글자까지 입력 가능 합니다. (필수)'}
            type='text'
            maxLength={30}
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
            component={<Select
              width={width}
              options={languagesOptions}
              defaultLabel={'-'}
              onClickHandler={(e)=>{
                handleInputChange(null,e,'lang')
                handleErrorChange(null,e,'lang',checkValidations)
              }}
            />}
            error={errors.lang}
            name='언어'
          />

          <SelectBox
            text={'포트폴리오에 댓글 허용 여부'}
            component={
              <ToggleButton
                width='10rem'
                height='5rem'
                onClickHandler={()=>{
                  handleInputChange(null, dataForm.isComment ? 0 : 1 , 'isComment')
                }}
                defaultValue={dataForm.isComment}
                hideError={true}
              />
            }
            hideError={true}
            customText={dataForm.isComment ? '허용됨' : '허용되지 않음'}
          />

          <SelectBox
            text={'구직용, 재직용 임시'}
            component={
              <ToggleButton
                width='10rem'
                height='5rem'
                onClickHandler={()=>{
                  handleInputChange(null, dataForm.isEmploy ? 0 : 1, 'isEmploy')
                }}
                defaultValue={dataForm.isEmploy}
                hideError={true}
              />
            }
            hideError={true}
            customText={dataForm.isEmploy ? '구직을 위한 포트폴리오' : '일반 포트폴리오'}
          />
          
          <EnterTag width="100%" height="3.5rem" placeholder="태그는 최대 3개까지 등록이 가능합니다." dataForm={dataForm} handleInputChange={handleInputChange}/>
          
          <Input
            label={'포트폴리오 본문'}
            width={width}
            height={height}
            type={'textarea'}
            onChange={(e)=>{
              handleInputChange(null,e.target.value, 'body')
              handleErrorChange(null,e.target.value,'body',checkValidations)
            }}
            placeholder={'최소 200 ~ 1000글자까지 입력 가능합니다. (필수)'}
            maxLength={1000}
            error={errors.body}
          />
          <ProGress
            className={'margin-top-remove'}
            width={'100%'}
            height={'1.2rem'}
            fontSize={'1.2rem'}
            comPleteNum={portfolioWriteRule.body.max}
            proGressNum={dataForm.body.length ?? 0}
            error={dataForm.body.length < 200 ? true : false}
          />

        </div>

        <div className='imgs-container col'>
          <FileInput
            name={'타이틀 이미지'}
            width={'100%'}
            height={'65rem'}
            number={1}
            dataForm={dataForm}
            handleInputChange={handleInputChange}
            handleErrorChange={handleErrorChange}
            clearError={clearError}
          />

          <FileInput
            name={'이미지'}
            width={'100%'}
            height={'65rem'}
            number={10}
            dataForm={dataForm}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
      <div className='button-box'>
        <StyleBorderButton
          onClick={()=>{
            setShowModal(true);
            submitHandler(dataForm,errors,setErrors,'portfolio',loginUserData.userInfo.memberId)
          }}
        >
          작성
        </StyleBorderButton>
        <StyleBorderButton>
          취소
        </StyleBorderButton>
      </div>
    </StyleProjectWrite>
  );
}
