import React, { useState } from 'react';
import { styled } from 'styled-components';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import FileInput from '../components/common/FileInput';
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
import { portfolioErrorInitData, portfolioWriteInitData, portfolioWriteRule } from '../static/portfolioInit';
import SubmitModalBox from '../components/PfPjPublic/SubmitModalBox';
import { writeSubmitHandler } from '../utils/writeSubmitHandler';
import Modal from '../components/common/Modal';
import { useSelector } from 'react-redux';

const StyleProjectWrite = styled(Page)`
  height:auto;
  background-color: transparent;
  padding-top:6rem;
  font-size:1.6rem;

  .write-wrapper {
    gap:3rem;
  }
  .margin-top-remove {
    margin-top:-20px !important;
  }
  .input-container {
    width:40%;
    height:100%;
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
  .error {
    color:var(--error);
    margin-top:1rem;
  }
  @media screen and (max-width:900px){
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

export default function PortfolioWrite() {
  const {toPortfolio} = useNav();
  const [dataForm,handleInputChange] = useForm(portfolioWriteInitData);
  const [errors, handleErrorChange, clearError, setErrors ] = useError(portfolioErrorInitData , portfolioWriteRule);
  const [showModal, setShowModal] = useState(false);
  const [apiResult, setApiResult] = useState(false);
  //false면 프론트측 에러 true면 백측에러
  const [whichError, setWhichError] = useState(false);
  const [isLoading ,setIsLoading] = useState(false);
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
        title={isLoading ? '' : apiResult ? '작성 완료' : `${whichError ? '통신 에러' : '입력 형식 오류'}`}
        body={isLoading ? '' : apiResult ? '확인 버튼 클릭시 포트폴리오 리스트 화면으로 넘어갑니다.' : `${whichError ? '서버와의 통신에 실패했습니다. 다시 시도해 주세요' : '필수 입력 양식을 다시 확인해 주세요.'}`}
        confirmHandler={() => {apiResult ? toPortfolio() : setShowModal(false)}}
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
                  handleInputChange(null, !dataForm.isComment, 'isComments')
                }}
                defaultValue={dataForm.isComment}
                hideError={true}
              />
            }
            hideError={true}
            customText={dataForm.isComment ? '허용됨' : '허용되지 않음'}
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
            error={dataForm.body.length < 100 ? true : false}
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
      <SubmitModalBox
        submitTitle={'작성 확인'}
        submitMessage={'댓글 허락시에 달리는 댓글은 작성자에 한해서 자유롭게 삭제 할 수 있습니다.'}
        submitCheckHandler={()=>{
            setShowModal(true);
            setIsLoading(true);
            writeSubmitHandler(dataForm,errors,setErrors,'portfolio',loginUserData.userInfo.memberId)
            .then(()=>setApiResult(true))
            .catch((err)=>{
              setWhichError(err==='formError' ? false : true);
              setApiResult(false)})
            .finally(()=>setIsLoading(false));
          }
        }
        cancelTitle={'취소 확인'}
        cancelMessage={'취소시 작성한 내용은 저장되지 않습니다.'}
        cancelCheckHandler ={toPortfolio}
      />
    </StyleProjectWrite>
  );
}
