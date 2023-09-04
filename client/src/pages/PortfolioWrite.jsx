import React from 'react';
import { styled } from 'styled-components';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import { StyleBorderButton } from '../components/common/Buttons';
import  useForm  from '../hooks/useForm';
import Page from './../components/common/Page';
import useNav from '../hooks/useNav';
import EnterTag from '../components/project/EnterTag';
import WriteHeader from '../components/project/WriteHeader';
import SelectBox from '../components/project/SelectBox';

const StyleProjectWrite = styled(Page)`
  height:auto;
  background-color: var(--backgroundColor);
  margin-top:6rem;
  padding-top:2rem;
  font-size:1.6rem;
  * {
    border-radius:4px;
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

  .comments-allow {
    gap:1rem;
  }
`

export default function PortfolioWrite() {
  const {toPortfolio} = useNav();

  const initialState = {
    title:'',
    language : 'JAVA',
    isComments : false,
    tags : [],
    body : '',
    titleImg : '',
    imgs : new FormData(),
    author : {}
  }

  const validationRules = {
    title : {
      min : 10,
      max : 30,
    },
    language : {
      min : 1,
      max : 1,
    },
    body : {
      min : 200,
      max : 1000,
    },
  }
  
  const [dataForm,setDataForm,errors] = useForm(initialState, validationRules);

  const width = '100%';
  const height = '90rem';
  console.log(dataForm);

  //테스트용 언어 옵션들
  const languagesOptions = [
    {value : 'JAVA', label : 'JAVA'},
    {value : 'JAVASCRIPT', label : 'JAVASCRIPT'},
    {value : 'C++', label : 'C++'},
    {value : 'C#', label : 'C#'},
    {value : 'RUBY', label : 'RUBY'},
    {value : 'GO', label : 'GO'},
  ]

  //errors에 하나라도 있으면 오류 뱉음
  const subMitHandler = () => {
    if(Object.keys(errors).length) {
      console.log('유효성검사에 문제가 존재함');
    } else {
      console.log('유효성검사에 문제없음');
    }
  }

  return (
    <StyleProjectWrite className='col'>
      <WriteHeader text={'포트폴리오 헤더 부분'}/>
      <div className='row'>
        <div className='input-container col'>

          <Input
            label={'포트폴리오 제목'}
            error={errors.title}
            width={'100%'}
            onChange={(e)=>setDataForm(e.target.value, 'title')}
            placeholder={'최소 10 글자 최대 30글자까지 입력 가능 합니다. (필수)'}
          />

          <SelectBox
            text={'사용할 언어를 선택 해주세요.'}
            component={<Select
              width={width}
              options={languagesOptions}
              value={dataForm.language}
              onClickHandler={(e)=>setDataForm(e, 'language')}
            />}
          />

          <SelectBox
            text={'포트폴리오에 댓글 허용 여부'}
            component={<div className='comments-allow col'>
              <StyleBorderButton onClick={()=>setDataForm(true,'isComments')}>허용함</StyleBorderButton>
              <StyleBorderButton onClick={()=>setDataForm(false,'isComments')}>허용하지 않음</StyleBorderButton>
            </div>}
            margin={false}
          />
          
          <EnterTag width="100%" height="3.5rem" placeholder="태그는 최대 3개까지 등록이 가능합니다." dataForm={dataForm} setDataForm={setDataForm}/>
          
          <Input
            label={'포트폴리오 본문'}
            error={errors.body}
            width={width}
            height={height}
            type={'textarea'}
            onChange={(e)=>setDataForm(e.target.value, 'body')}
            placeholder={'최소 200 ~ 1000글자까지 입력 가능합니다. (필수)'}
          />
        </div>

        <div className='imgs-container col'>
          <FileInput
            name={'타이틀 이미지'}
            width={'70rem'}
            height={'65rem'}
            number={1}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />

          <FileInput
            name={'이미지'}
            width={'70rem'}
            height={'65rem'}
            number={7}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />
        </div>
      </div>
      <div className='submit-box'>
        <StyleBorderButton onClick={subMitHandler}>게시</StyleBorderButton>
        <StyleBorderButton onClick={toPortfolio}>취소</StyleBorderButton>
      </div>
    </StyleProjectWrite>
  );
}
