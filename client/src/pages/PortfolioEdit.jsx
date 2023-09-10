import React, { useEffect, useState } from 'react';
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

const DummyData = {
  id : 1,
  title : '내가 만든 포트폴리오',
  created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
  modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
  language : 'JAVA',
  tags : ['테스트태그', '의미없는 태그', '의미없는 태그2'],
  body : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  titleImg : '',
  imgs : ['https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random','https://source.unsplash.com/random'],
  author : {
    img : '',
    userName : '박찬섭', 
    id : 1,
  },
  isComments : true,
  comments : [{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : '이종범', 
    id : 1,
    body : ', consectetur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : '유명인', 
    id : 2,
    body : 'Lorem ipsum dolor sit amet, consectetㅁ;ㅈ으맞위맞ㅇur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",  
    img : '',
    userName : 'qkrckstjq', 
    id : 3,
    body : 'Lorem ipsum dolor sit amet, conseㅁ;ㅣㅏ주이ㅏㅁ쥬ㅜ이뮤ㅜㅈ이ㅏur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : 'qkrckstjqtqwe', 
    id : 4,
    body : 'Lorem ipsum do송ㅅ료ㅓㅗㄹ효ㅓㄹ허lor sit amet, consectetur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : 'dlfknkldf', 
    id : 5,
    body : 'Lorem ipsuㅊ호ㅓㅇㅊ효ㅓㅊ효ㅓㅕm dolor sit amet, consectetur'
  },{
    created_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    modified_At : "Wed Aug 30 2023 16:07:06 GMT+0900 (한국 표준시)",
    img : '',
    userName : '박찬SDRG섭', 
    id : 6,
    body : 'Lorem ipsum dolor sitㅊ허ㅏㅊ혀ㅏ쳐 amet, consectetur'
  }],
  likes : ["1", "2", "3", "4", "5"],
}

export default function PortfolioEdit() {
  const {toPortfolio} = useNav();
  const [dataForm,handleInputChange, clearForm, setDataForm] = useForm(portFolioWriteInitData);
  const [errors, handleErrorChange, clearError, setErrors ] = useError(portFolioErrorInitData , portFolioWriteRule);
  const [willDeletedImgs, setWillDeleteImgs] = useState({titleImg : [], imgs : [],});

  const width = '100%';
  const height = '70rem';

  useEffect(()=>{
    // api.get()
    //요청후
    setDataForm({...DummyData});
  },[])

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
            defaultValue={dataForm.title}
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
              defaultLabel={dataForm.language}
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
          
          <EnterTag
            width="100%"  
            height="3.5rem"
            placeholder="태그는 최대 3개까지 등록이 가능합니다."
            handleInputChange={handleInputChange}
            defaultTags={dataForm.tags}
          />
          
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
            defaultValue={dataForm.body}
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
            setWillDeleteImgs={setWillDeleteImgs}
            clearError={clearError}
            defaultImgs={dataForm.titleImg}
          />

          <FileInput
            name={'이미지'}
            width={'70rem'}
            height={'65rem'}
            number={7}
            dataForm={dataForm}
            handleInputChange={handleInputChange}
            setWillDeleteImgs={setWillDeleteImgs}
            defaultImgs={dataForm.imgs}
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
