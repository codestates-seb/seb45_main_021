import React from 'react';
import { styled } from 'styled-components';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import { StyleBorderButton } from '../components/common/Buttons';
import  useForm  from '../hooks/useForm';
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
import { portFolioErrorInitData, portFolioWriteInitData, portFolioWriteRule } from '../static/portFolioInit';
import SubmitBox from '../components/PfPjPublic/SubmitBox';

const StyleProjectWrite = styled(Page)`
  height:auto;
  background-color: transparent;
  padding-top:6rem;
  font-size:1.6rem;

  .margin-top-remove {
    margin-top:-20px !important;
  }
  .input-container {
    flex:5;
    height:100%;
    margin-right:3rem;
    > div {
      margin-bottom:3rem;
    }
  }
  .imgs-container {
    flex:6;
    height:auto;
    > div {
      margin-bottom:6rem;
    }
  }
  .submit-box {
    width:100%;
    margin-bottom:10rem;
    display:flex;
    button {
      font-size:1.6rem;
      padding:5px 15px;
      margin-right:5rem;
    }
  }
  .data-select-container {
    gap:1rem;
    div {
      flex:1;
    }
  }
  .error {
    color:var(--error);
    margin-top:1rem;
  }
`

export default function PortfolioWrite() {
  const {toPortfolio} = useNav();
  const [dataForm,handleInputChange] = useForm(portFolioWriteInitData);
  const [errors, handleErrorChange, clearError, setErrors ] = useError(portFolioErrorInitData , portFolioWriteRule);

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

  //errors에 하나라도 있으면 오류 뱉음
  const subMitHandler = () => {
    if(Object.keys(errors).length) {
      console.log('유효성검사에 문제가 존재함');
      const newError = {...errors};
      for (let key in newError) {
        newError[key] = true;
      }
      setErrors(newError);
      window.scrollTo(0,0);
    } else {
      console.log('유효성검사에 문제없음');
      console.log(dataForm);
    }
  }

  return (
    <StyleProjectWrite className='col'>
      <WriteHeader text={'포트폴리오 헤더 부분'}/>
      <div className='row'>
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
            comPleteNum={portFolioWriteRule.title.max}
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
                handleInputChange(null,e,'language')
                handleErrorChange(null,e,'language',checkValidations)
              }}
            />}
            error={errors.language}
            name='언어'
          />

          <SelectBox
            text={'포트폴리오에 댓글 허용 여부'}
            component={
              <ToggleButton
                width='10rem'
                height='5rem'
                onClickHandler={()=>{
                  handleInputChange(null, !dataForm.isComments, 'isComments')
                }}
                defaultValue={dataForm.isComments}
                hideError={true}
              />
            }
            hideError={true}
            customText={dataForm.isComments ? '허용됨' : '허용되지 않음'}
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
            comPleteNum={portFolioWriteRule.body.max}
            proGressNum={dataForm.body.length ?? 0}
            error={dataForm.body.length < 100 ? true : false}
          />

        </div>

        <div className='imgs-container col'>
          <FileInput
            name={'타이틀 이미지'}
            width={'70rem'}
            height={'65rem'}
            number={1}
            dataForm={dataForm}
            handleInputChange={handleInputChange}
            handleErrorChange={handleErrorChange}
            clearError={clearError}
          />

          <FileInput
            name={'이미지'}
            width={'70rem'}
            height={'65rem'}
            number={7}
            dataForm={dataForm}
            handleInputChange={handleInputChange}
          />
        </div>
      </div>
      <SubmitBox
        submitTitle={'작성 확인'}
        submitMessage={'댓글 허락하지 않음 선택 시 기존의 댓글들도 보이지 않습니다.'}
        submitCheckHandler={subMitHandler}
        cancelTitle={'취소 확인'}
        cancelMessage={'취소시 작성한 내용은 저장되지 않습니다.'}
        cancelCheckHandler ={toPortfolio}
      />
    </StyleProjectWrite>
  );
}
