import React, { useState } from 'react';
import { styled } from 'styled-components';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';

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
    margin-top:16rem;
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
    height:100%;
    div {
      margin-bottom:3rem;
    }
  }
`
/*
프로젝트 전송 폼
title : 프로젝트 제목
totalPeople : 모집 희망 인원
closed_At : 모집 기간
language : 언어,
tag : [ 검색 키워드 ]  [Array]
body : 기획서 100~500글자
description : 상세요강
imgs : 이미지url
titleImg : 이미지url
이미지 토탈 최대 7장
author : 로그인 유저 정보  [Object]
*/

/*
포트폴리오 전송 폼
title : 포트폴리오 제목
language : 언어,
tag : 검색 키워드 [Array] 
body : 포트폴리오 내용 200~1000글자
author : 로그인 유저 정보 {Object}
imgs : 이미지url
titleImg : 이미지url
이미지 토탈 최대 10장
isComment : 댓글 작성 여부  true / false
isEmploy : 취업을 위한 여부 true / false
*/

/*
title : 제목 동일 - 최대 30글자
language : 언어 - 한개만 선택
tag : 검색 키워드 [Array] - 최대 2개 선택
body : 플젝-기획서, 포폴-포폴내용
author : 작성자 정보
titleImg : 타이틀이미지
imgs : 이미지들
*/

export default function ProjectWrite() {
  const [dataForm,setDataForm] = useState({
    title:'',
    language : '',
    totalPeople : '',
    closed_At : '',
    tag : [],
    body : '',
    description : '',
    titleImg : '',
    imgs : '',
    author : {}
  });
  const width = '100%';
  const height = '30rem';
  console.log(dataForm);

  const titleInputHandler = (e) => {
    setDataForm((prev) => {return {...prev, title : e.target.value}});
  }
  
  const bodyInputHandler = (e) => {
    setDataForm({...dataForm, body : e.target.value});
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight+'px';
  }

  const LanguageHandler = (language) => {
    setDataForm({...dataForm, language : language});
  }

  const totalPeopleHandler = (totalPeople) => {
    setDataForm({...dataForm, totalPeople : totalPeople});
  }

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
    <StyleProjectWrite className='column'>
      <div className='header'>
      </div>
      <div className='row'>
        <div className='input-container column'>
          <Input
            label={'프로젝트 제목'}
            error={'최소 10 글자 최대 30글자까지 입력 가능 합니다. (필수)'}
            width={'100%'}
            onChange={titleInputHandler}
            placeholder={'최소 10 글자 최대 30글자까지 입력 가능 합니다. (필수)'}
          />
          <p>사용할 언어를 선택 해주세요.</p>
          <Select
            width={width}
            options={languagesOptions}
            itemValue={'-'}
            onClick={LanguageHandler}
          />
          {/* Select디브는 position이 relative라 요소가 겹침 margin-box로 해결함 */}
          <div className='margin-box'/>
          <p>모집할 인원을 선택해주세요.</p>
          <Select
            width={width}
            options={totalPeopleOptions}
            itemValue={'-'}
            onClick={totalPeopleHandler}
          />
          {/* Select디브는 position이 relative라 요소가 겹침 margin-box로 해결함 */}
          <div className='margin-box'/>
          <Input
            label={'기획서'}
            error={'최소 100 ~ 500글자까지 입력 가능합니다. (필수)'}
            width={width}
            height={height}
            type={'textarea'}
            onChange={bodyInputHandler}
            placeholder={'최소 100 ~ 500글자까지 입력 가능합니다. (필수)'}
          />
          <Input
            label={'상세 요강'}
            error={'최소 100 ~ 500글자까지 입력 가능합니다. (필수)'}
            width={width}
            height={height}
            type={'textarea'}
            placeholder={'최소 100 ~ 500글자까지 입력 가능합니다. (필수)'}
          />
        </div>
        <div className='imgs-container column'>
          <FileInput
            name={'타이틀 이미지'}
            width={'100%'}
            height={'30rem'}
            labelSize={'5rem'}
          />
          <FileInput
            name={'이미지'}
            width={'100%'}
            height={'30rem'}
            labelSize={'5rem'}
          />
        </div>
      </div>
    </StyleProjectWrite>
  );
}
