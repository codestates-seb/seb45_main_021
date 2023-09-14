import React, { useState } from 'react';
import styled from 'styled-components'
import Input from '../common/Input';
import { StyleBorderButton } from '../common/Buttons';
import ProGress from '../common/ProGress';
import api from '../../hooks/useAxiosInterceptor'

const StyleWriteComment = styled.div`
    width:100%;
    .submit-box {
        margin-top:2rem;
        margin-left:auto;
    }

    .col {
        gap:1rem;
    }
`



export default function WriteComment() {
    const [comments,setComments] = useState('');

    //제출할때 
    const submitHandler = () => {
        console.log(comments)
        api.post('/portfolio/:id',)
        .then(res=>{
            console.log('성공')   
        })
        .catch(err=>{
            console.log('실패')
        })
    }

    const commentsHandler = (e) => {
        setComments(e.target.value);
    }

    return (
        <StyleWriteComment className='col'>
            <Input 
                label={'댓글 작성'}
                fontSize={'1.6rem'}
                height={'8rem'}
                maxLength={200}
                type='textarea'
                onChangeHandler={commentsHandler}
            />
            <ProGress
                comPleteNum={200}
                proGressNum={comments.length}
                top='-1.8rem'
                width='100%'
                height='1rem'
            />
            <div className='submit-box row'>
                <StyleBorderButton 
                    $width={'15rem'}
                    $fontSize={'1.6rem'}
                    onClick={submitHandler}
                >작성</StyleBorderButton>
            </div>
        </StyleWriteComment>
    );
}


