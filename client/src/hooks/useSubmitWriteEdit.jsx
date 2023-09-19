import React, { useState } from 'react';
import { writeSubmitHandler } from '../utils/writeSubmitHandler';

export default function useSubmitWriteEdit() {
    const [apiResult, setApiResult] = useState('전송 중');
    const [isSuccess, setIsSuccess] = useState(false);

    const submitHandler = (dataForm, errors, setErrors, type, memberId, postId) => {
        writeSubmitHandler(dataForm,errors,setErrors,type, memberId, postId)
        .then(()=>{
            setApiResult(`${postId ? '수정' : '작성'} 완료. 확인 버튼 클릭시 이전 페이지로 돌아갑니다.`)
            setIsSuccess(true);
        })
        .catch((err)=>{
            setApiResult(err==='formError' ? '필수 입력 양식을 다시 확인해 주세요.' : '서버와의 통신에 실패했습니다. 다시 시도해 주세요.');
            setIsSuccess(false);
        })
    }

    return [apiResult, isSuccess, submitHandler];
}

