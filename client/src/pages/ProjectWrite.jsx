import React from 'react';
import { styled } from 'styled-components';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import { StyleBorderButton } from '../components/common/Buttons';
import  useForm  from '../hooks/useForm';
import DateSelect from '../components/project/DateSelect';
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
`

export default function ProjectWrite() {
  const today = new Date(); // 현재 날짜.
  const oneWeekLater = new Date(today.setDate(today.getDate() + 7));
  const {toProject} = useNav();

  //수정시에 initialState의 값만 조절해주면 됌
  const initialState = {
    title:'',
    language : 'JAVA',
    totalPeople : 2,
    closed_At : oneWeekLater,
    tags : [],
    body : '',
    description : '',
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
    totalPeople : {
      min : 2,
      max : 2,
    },
    closed_At : {
      min : 1,
      max : 1,
    },
    body : {
      min : 100,
      max : 500,
    },
    description : {
      min : 0,
      max : 200,
    }
  }
  
  const [dataForm,setDataForm,errors] = useForm(initialState, validationRules);

  const width = '100%';
  const height = '30rem';
  //테스트용 언어 옵션들
  const languagesOptions = [
    {value : 'JAVA', label : 'JAVA'},
    {value : 'JAVASCRIPT', label : 'JAVASCRIPT'},
    {value : 'C++', label : 'C++'},
    {value : 'C#', label : 'C#'},
    {value : 'RUBY', label : 'RUBY'},
    {value : 'GO', label : 'GO'},
  ]

  const totalPeopleOptions = [
    {value : 2, label : 2},
    {value : 3, label : 3},
    {value : 4, label : 4},
    {value : 5, label : 5},
    {value : 6, label : 6},
    {value : 7, label : 7},
    {value : 8, label : 8},
    {value : 9, label : 9},
    {value : 10, label : 10},
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
      <WriteHeader text={'프로젝트 헤더 부분'} />
      <div className='row'>
        <div className='input-container col'>
          <Input
            label={'프로젝트 제목'}
            error={errors.title}
            width={'100%'}
            onChange={(e)=>{
              console.log(e);
              setDataForm(e.target.value, 'title')}}
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
            text={'모집할 인원을 선택해주세요.'}
            component={<Select
              width={width}
              options={totalPeopleOptions}
              value={dataForm.totalPeople}
              onClickHandler={(e)=>setDataForm(e, 'totalPeople')}
            />}
          />

          <SelectBox
            text={'프로젝트 마감 날짜를 선택 해 주세요. (모집 시작은 작성일 기준입니다.)'}
            component={<div className='data-select-container row'>
              <DateSelect defaultDate={oneWeekLater} width={width} setDataForm={setDataForm}/>
            </div>}
          />
          
          <EnterTag width="100%" height="3.5rem" placeholder="태그는 최대 3개까지 등록이 가능합니다." dataForm={dataForm} setDataForm={setDataForm}/>
          
          <Input
            label={'기획서'}
            error={errors.body}
            width={width}
            height={height}
            type={'textarea'}
            onChange={(e)=>setDataForm(e.target.value, 'body')}
            placeholder={'최소 100 ~ 500글자까지 입력 가능합니다. (필수)'}
          />

          <Input
            label={'상세 요강'}
            error={errors.description}
            width={width}
            height={height}
            type={'textarea'}
            onChange={(e)=>setDataForm(e.target.value, 'description')}
            placeholder={'최소 100 ~ 500글자까지 입력 가능합니다. (필수)'}
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
        <StyleBorderButton onClick={toProject}>취소</StyleBorderButton>
      </div>
    </StyleProjectWrite>
  );
}
