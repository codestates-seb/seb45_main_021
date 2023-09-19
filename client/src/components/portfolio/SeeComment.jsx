import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { StyleBorderButton, StyleBottomButton } from '../common/Buttons';
import Input from '../common/Input';
import ProGress from '../common/ProGress';
import api from '../../hooks/useAxiosInterceptor'
import { useSelector } from 'react-redux';
import useNav from '../../hooks/useNav';
import defaultImg from '../../static/images/userDefaultImg.jpeg'
import { dateFormatter } from '../../utils/dateFormatter';
import Modal from '../common/Modal';

const StyleSeeComment = styled.div`
    min-width:35rem;
    margin:2rem 0;
    background-color:rgba(42,42,42, 0.8);
    padding:2rem;
    gap:1rem;
    border-radius: 5px;
    p {
        font-size:1.6rem;
    }
    h3 {
        padding:5px 7px;
        font-size:1.2rem;
    }
    .button {
        &:hover {
            cursor: pointer;
        }
    }
    .row {
        width:100%;
        gap:1rem;
        justify-content:end;
        align-items:center;
    }
    .author-wrapper {
        width:auto;
        padding:2px;
        justify-content:center;
        align-items:center;
        * {
            cursor:pointer;
        }

        > img {
            width:3rem;
            height:3rem;
            border-radius:50%;
            object-fit:cover;
        }
        &:hover {
            cursor:pointer;
        }
    }
`

export const BorderLine = styled.div`
    width:100%;
    height:2px;
    border-radius:5px;
    border:1.5px solid var(--black-100);
    margin:1.3rem 0;
`

export default function SeeComment({
    isAdmin,
    detailData,
    commentData,
    updateHandler,
}) {
    const {toProfile} = useNav();
    const [customText,setCustomText] = useState(commentData.body);
    const [isEdit, setIsEdit] = useState(false);
    const loginUserData = useSelector(state=>state.user);
    const [showModal,setShowModal] = useState(false);

    const cancelEditHandler = () => {
        setCustomText(commentData.body);
        setIsEdit(false);
    }

    const inputHandler = (e) => {
        const inputText = e.target.value;

        if (inputText.length <= 200) {
        setCustomText(inputText);
        }
    }

    const EditHandler = () => {
        const body = {
            body : customText
        }
        api.patch(`/comments/${commentData.commentId}`,body)
        .then((res)=>{
            updateHandler()
            setIsEdit(false);
        })
        .catch(err=>{
            setShowModal(true);
        })
    }

    const deleteHandler = () => {
        api.delete(`/comments/${commentData.commentId}`)
        .then((res)=>{
            updateHandler()
        })
        .catch(err=>{
            setShowModal(true);
        })
    }

    const keyDownHandler = (e) => {
        if(e.code === 'Enter' || e.code === 'NumpadEnter') {
            EditHandler()
        }
    }

    return (
        <StyleSeeComment
            className='col'
            $isEdit={isEdit}
        >
            {showModal && 
            <Modal
                setIsOpen={setShowModal}
                type='alert'
                title='알림'
                body='다시 시도해 주세요.'
                confirmHandler={()=>setShowModal(false)}
            />}
            {isEdit ?
                <>
                    <Input 
                        type='textarea'
                        defaultValue={commentData.body}
                        onChangeHandler={inputHandler}
                        height={'8rem'}
                        onKeyDown={keyDownHandler}
                    />
                    <ProGress
                        top={'-1.7rem'}
                        width={'100%'}
                        height={'1rem'}
                        comPleteNum={200}
                        proGressNum={customText.length}
                    />
                </>
                :
                <>
                    <p>{commentData.body}</p>
                    <BorderLine/>
                </>
            }
            
            <div className='row'>
                {isEdit ? 
                    <>
                        <StyleBottomButton className='button' onClick={EditHandler}>작성</StyleBottomButton>
                        <StyleBottomButton className='button' onClick={cancelEditHandler}>취소</StyleBottomButton>
                    </>
                :
                    <>
                        <div className='row author-wrapper' onClick={()=>toProfile(commentData.memberId)}>
                            {/* <img src={commentData.img.length === 0 ? defaultImg : commentData.img} alt='작성자이미지'></img> */}
                            <StyleBottomButton>{commentData.userName}</StyleBottomButton>
                        </div>
                        <h3>{dateFormatter(commentData.createdAt)}</h3>
                        {commentData.memberId === loginUserData.userInfo?.memberId &&
                            <StyleBottomButton
                                className='button'
                                onClick={()=>setIsEdit(true)}
                            >수정</StyleBottomButton>}
                        {(isAdmin || (commentData.memberId === loginUserData.userInfo?.memberId)) &&
                            <StyleBottomButton
                                className='button'
                                onClick={deleteHandler}
                            >삭제</StyleBottomButton>}
                    </>
                }
                
            </div>            
        </StyleSeeComment>
    );
}