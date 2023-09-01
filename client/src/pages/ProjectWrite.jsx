import React, { useState } from 'react';
import { styled } from 'styled-components';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import { StyleBorderButton } from '../components/common/Buttons';
import  useForm  from '../hooks/useWrite';
import DateSelect from '../components/common/DateSelect';

const StyleProjectWrite = styled.div`
  width:100%;
  height:auto;
  background-color: var(--backgroundColor);
  margin-top:6rem;
  padding-top:2rem;
  font-size:1.6rem;
  p {
    font-size:1.6rem;
    margin-bottom:1rem;
  }
  .header {
    height:20rem;
    background-color:var(--black-200);
    margin-bottom:10rem;
  }
  .margin-box {
    margin-top:9rem;
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
`

export default function ProjectWrite() {
  const time = new Date();
  const initialState = {
    title:'',
    language : '-',
    totalPeople : '-',
    year : time.getFullYear(),
    month : time.getMonth()+1,
    day : time.getDate(),
    closed_At : '',
    keyWord : [],
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
  //errors에 하나라도 있으면 
  const [dataForm,setDataForm,errors] = useForm(initialState, validationRules);
  const width = '100%';
  const height = '30rem';
  console.log(dataForm);
  console.log(errors);

  //테스트용
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

  return (
    <StyleProjectWrite className='col'>
      <div className='header'>
      </div>
      <div className='row'>
        <div className='input-container col'>
          <Input
            label={'프로젝트 제목'}
            error={errors.title}
            width={'100%'}
            onChange={(e)=>setDataForm(e.target.value, 'title')}
            placeholder={'최소 10 글자 최대 30글자까지 입력 가능 합니다. (필수)'}
          />
          <p>{'사용할 언어를 선택 해주세요.'}</p>
          <Select
            width={width}
            options={languagesOptions}
            itemValue={dataForm.language}
            onClickHandler={(e)=>setDataForm(e, 'language')}
          />
          {/* Select디브는 position이 relative라 요소가 겹침 margin-box로 해결함 */}
          <div className='margin-box'/>
          <p>{'모집할 인원을 선택해주세요.'}</p>
          <Select
            width={width}
            options={totalPeopleOptions}
            itemValue={dataForm.totalPeople}
            onClickHandler={(e)=>setDataForm(e, 'totalPeople')}
          />
          {/* Select디브는 position이 relative라 요소가 겹침 margin-box로 해결함 */}
          <div className='margin-box'/>
          <p>{'프로젝트 마감 날짜를 선택 해 주세요. (모집 시작은 작성일 기준입니다.)'}</p>
          {/* <div className='data-select-container row'>
            <Select
              width={width}
              options={totalPeopleOptions}
              itemValue={dataForm.year}
              onClickHandler={(e)=>setDataForm(e, 'year')}
            />
            <Select
              width={width}
              options={totalPeopleOptions}
              itemValue={dataForm.month}
              onClickHandler={(e)=>setDataForm(e, 'month')}
            />
            <Select
              width={width}
              options={totalPeopleOptions}
              itemValue={dataForm.day}
              onClickHandler={(e)=>setDataForm(e, 'day')}
            />
          </div> */}
          <DateSelect/>
          <div className='margin-box'/>
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
            height={'60rem'}
            deleteLabelSize={'5rem'}
            number={1}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />
          <FileInput
            name={'이미지'}
            width={'70rem'}
            height={'60rem'}
            deleteLabelSize={'5rem'}
            number={7}
            dataForm={dataForm}
            setDataForm={setDataForm}
          />
        </div>
      </div>
      <div className='submit-box'>
        <StyleBorderButton>게시</StyleBorderButton>
        <StyleBorderButton>취소</StyleBorderButton>
      </div>
    </StyleProjectWrite>
  );
}
