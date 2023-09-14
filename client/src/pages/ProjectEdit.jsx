import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
import { StyleBorderButton } from '../components/common/Buttons';
import  useForm  from '../hooks/useForm';
import DateSelect from '../components/project/DateSelect';
import Page from './../components/common/Page';
import useNav from '../hooks/useNav';
import EnterTag from '../components/PfPjPublic/EnterTag';
import WriteHeader from '../components/PfPjPublic/WriteHeader';
import SelectBox from '../components/PfPjPublic/SelectBox';
import useError from '../hooks/useError';
import { checkValidations } from '../utils/checkValidations';
import ProGress from '../components/common/ProGress';
import languages from '../static/languages'
import api from '../hooks/useAxiosInterceptor';
import { projectErrorInitData, projectWriteInitData, projectWriteRule } from '../static/projectInit';
import SubmitModalBox from '../components/PfPjPublic/SubmitModalBox';
import { writeSubmitHandler } from '../utils/writeSubmitHandler';
import { apiWriteDataCheckError, shapingApiData } from '../utils/shapingApiData';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { custom } from '../static/theme';
import Modal from '../components/common/Modal';
import { useStepContext } from '@mui/material';

const StyleProjectWrite = styled(Page)`
  height:auto;
  background-color: transparent;
  padding-top:6rem;
  font-size:1.6rem;

  .margin-top-remove {
    margin-top:-20px !important;
  }

  .input-container {
    width:40%;
    height:auto;
    margin-right:3rem;
    > div {
      margin-bottom:3rem;
    }
  }
  .imgs-container {
    width:60%;
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
  ${custom(900)}{
    .write-wrapper{
      flex-direction: column;
    }
    .input-container {
      width:100%;
    }
    .imgs-container {
      width:100%;
    }
  }
`

// const responseData = {
//   view : 0,
//   memberId : 7,
//   projectId : 41,
//   userName : '박찬섭',
//   userImgUrl : null,
//   title : '안녕하세요wtrgdrgdhtfth',
//   totalPeople : 6,
//   createdAt : String(new Date()),
//   modifiedAt : String(new Date()),
//   closedAt : String(new Date()),
//   body : '기획안 gfukukfhukhfkfhjukvhjm,hjmvhjmhjmvhj,vhj,vhj,vhj,vhj,vhj,vhj,hvj,vhjhjv입니다기획안 gfukukfhukhfkfhjukvhjm,hjmvhjmhjmvhj,vhj,vhj,vhj,vhj,vhj,vhj,hvj,vhjhjv입니다기획안 gfukukfhukhfkfhjukvhjm,hjmvhjmhjmvhj,vhj,vhj,vhj,vhj,vhj,vhj,hvj,vhjhjv입니다',
//   joinPeople : 'null',
//   requestPeople : 'null',
//   description : '즐겁게 해보실 분',
//   lang : 'react',
//   images : [
//     {
//       imageId : 10,
//       imageUrl : 'https://source.unsplash.com/random'
//     },
//     {
//       imageId : 11,
//       imageUrl : 'https://source.unsplash.com/random'
//     },
//     {
//       imageId : 12,
//       imageUrl : 'https://source.unsplash.com/random'
//     }
//   ],
//   projectTitleImage : {
//     projectTitleImageId : 6,
//     imageUrl : 'https://source.unsplash.com/random',
//   },
//   tags : ['테1스트','태스1트','태스3트'],
//   heartCount : 6,
// }

export default function ProjectEdit() {
  const {toProject} = useNav();
  const [dataForm, handleInputChange, clearForm, setDataForm] = useForm(projectWriteInitData);
  const [errors, handleErrorChange, clearError, setErrors] = useError({}, projectWriteRule);
  const {projectId} = useParams();
  const loginUserData = useSelector(state=>state.user);
  const [showModal, setShowModal] = useState(false);
  const [apiResult, setApiResult] = useState(false);
  //false면 프론트측 에러 true면 백측에러
  const [whichError, setWhichError] = useState(false);
  const [firstResult, setFirstResult] = useState(true);

  useEffect(()=>{
    api.get(`/projects/${projectId}`)
    .then(res=>{
      setDataForm(shapingApiData(res.data))
    })
    .catch(err=>{
      setShowModal(true);
      setWhichError(true);
      setFirstResult(false);
    });
  },[])

  const width = '100%';
  const height = '30rem';

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
        title={apiResult ? '수정 완료' : `${whichError ? '통신 에러' : '입력 형식 오류'}`}
        body={apiResult ? '확인 버튼 클릭시 프로젝트리스트 화면으로 넘어갑니다.' : `${whichError ? '서버와의 통신에 실패했습니다. 다시 시도해 주세요.' : '필수 입력 양식을 다시 확인해 주세요.'}`}
        confirmHandler={apiResult ? ()=>{toProject()} : firstResult ? ()=>{setShowModal(false)} : ()=>{toProject()}}
      />}
      <WriteHeader type='project' state='edit'/>
      <div className='write-wrapper row'>
        <div className='input-container col'>

          <Input
            label={'프로젝트 제목'}
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
            comPleteNum={projectWriteRule.title.max}
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
                onClickHandler={(e)=>{
                  handleInputChange(null,e,'lang')
                  handleErrorChange(null,e,'lang',checkValidations)
                }}
              />}
            error={errors.lang}
            name='언어'
          />

          {/* <SelectBox
            text={'프로젝트 마감 날짜를 선택 해 주세요. (모집 시작은 작성일 기준입니다.)'}
            component={<div className='data-select-container row'>
              <DateSelect
                defaultDate={dataForm.closedAt}
                width={width}
                handleInputChange={handleInputChange}
                handleErrorChange={handleErrorChange}/>
            </div>}
            error={errors.closedAt}
            name='마감 날짜'
          /> */}
          
          <EnterTag
            width="100%"
            height="3.5rem"
            placeholder="태그는 최대 3개까지 등록이 가능합니다."
            defaultTags={dataForm.tags}
            handleInputChange={handleInputChange}
          />
          
          <Input
            label={'기획서'}
            width={width}
            height={height}
            type={'textarea'}
            onChange={(e)=>{
              handleInputChange(null,e.target.value, 'body')
              handleErrorChange(null,e.target.value, 'body',checkValidations)
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

          <Input
            label={'상세 요강'}
            width={width}
            height={height}
            type={'textarea'}
            onChange={(e)=>{
              handleInputChange(null,e.target.value, 'description')
              handleErrorChange(null,e.target.value, 'description', checkValidations)
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
            defaultImgs={dataForm.projectTitleImage}
            setWillDeleteImgs={true}
          />

          <FileInput
            name={'이미지'}
            width={'100%'}
            height={'65rem'}
            number={7}
            dataForm={dataForm}
            handleInputChange={handleInputChange}
            defaultImgs={dataForm.images}
            setWillDeleteImgs={true}
          />

        </div>
      </div>
      <SubmitModalBox
        submitTitle={'수정 확인'}
        submitMessage={'수정 하기 전 내용은 복구 할 수 없습니다.'}
        submitCheckHandler={()=> {
          writeSubmitHandler(dataForm, errors, setErrors,'project',loginUserData.userInfo.memberId,projectId)
          .then(()=>setApiResult(true))
          .catch((err)=>{
            setWhichError(err==='formError' ? false : true);
            setApiResult(false)})
          .finally(()=>setShowModal(true))
        }}
        cancelTitle={'취소 확인'}
        cancelMessage={'취소시 수정한 내용은 저장되지 않습니다.'}
        cancelCheckHandler ={toProject}
      />
    </StyleProjectWrite>
  );
}