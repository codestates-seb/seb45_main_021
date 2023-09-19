import React, { useState } from 'react';
import styled from 'styled-components'
import Input from '../common/Input';
import { StyleBackgroundButton, StyleBorderButton } from '../common/Buttons';
import ProGress from '../common/ProGress';
import api from '../../hooks/useAxiosInterceptor'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { updateUser } from '../../redux/userForm/userSlice';

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

export default function WriteComment({
    updateHandler,
}) {
    const [comments,setComments] = useState('');
    const {portfolioId} = useParams();
    const loginUserdata = useSelector(state=>state.user);

    const submitHandler = () => {
        const body = {
            memberId : loginUserdata.userInfo.memberId,
            portfolioId : portfolioId,
            body : comments 
        }
        api.post('/comments',body)
        .then(res=>{
            updateHandler();
            setComments('');
        })
        .catch(err=>{
        })
    }

    const commentsHandler = (e) => {
        setComments(e.target.value);
    }

    const keyDownHandler = (e) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            e.preventDefault();
            submitHandler();
        }
    }

    return (
        <StyleWriteComment className='col'>
            <Input 
                label={'댓글 작성'}
                fontSize={'1.6rem'}
                height={'8rem'}
                maxLength={200}
                type='textarea'
                value={comments}
                onChangeHandler={commentsHandler}
                // onKeyDown={keyDownHandler}
            />
            <ProGress
                comPleteNum={200}
                proGressNum={comments.length}
                top='-1.8rem'
                width='100%'
                height='1rem'
            />
            <div className='submit-box row'>
                <StyleBackgroundButton
                    $width={'15rem'}
                    $fontSize={'1.6rem'}
                    onClick={submitHandler}
                >작성</StyleBackgroundButton>
            </div>
        </StyleWriteComment>
    );
}


