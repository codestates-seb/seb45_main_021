import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { StyleBorderButton } from '../common/Buttons';
import Input from '../common/Input';
import ProGress from '../common/ProGress';
import api from '../../hooks/useAxiosInterceptor'
import { useSelector } from 'react-redux';
import useNav from '../../hooks/useNav';
import defaultImg from '../../static/images/userDefaultImg.jpeg'
import { dateFormatter } from '../../utils/dateFormatter';

const StyleSeeComment = styled.div`
    min-width:35rem;
    margin:2rem 0;
    background-color:rgba(42,42,42, 0.8);
    padding:2rem;
    gap:1rem;
    p {
        font-size:1.6rem;
    }
    h3 {
        font-size:1.2rem;
    }
    .button {
        &:hover {
            cursor: pointer;
            opacity:0.5;
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
            opacity:0.4;
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
}) {
    const {toProfile} = useNav();
    const [customText,setCustomText] = useState(commentData.body);
    const [isEdit, setIsEdit] = useState(false);
    const loginUserData = useSelector(state=>state.user);
    const userId = loginUserData?.userInfo?.id;

    const cancelEditHandler = () => {
        setCustomText(commentData.body);
        setIsEdit(false);
    }

    const EditHandler = () => {
        api.post(`/comments/${detailData.id}}`,)
    }

    const deleteHandler = () => {
        api.delete(`/comments/${detailData.id}}`,)
    }

    return (
        <>
        <StyleSeeComment
            className='col'
            $isEdit={isEdit}
        >
            {isEdit ?
                <>
                    <Input 
                        type='textarea'
                        defaultValue={commentData.body}
                        onChangeHandler={(e)=>setCustomText(e.target.value)}
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
                        <h3
                            className='button'
                            onClick={EditHandler}
                        >작성</h3>
                        <h3
                            className='button'
                            onClick={cancelEditHandler}
                        >취소</h3>
                    </>
                :
                    <>
                        <div className='row author-wrapper'
                            onClick={()=>toProfile(commentData.id)}
                        >
                        <img src={commentData.img.length === 0 ? defaultImg : commentData.img} alt='작성자이미지'></img>
                        <h3>{commentData.userName}</h3>
                        </div>
                        <h3>{dateFormatter(commentData.created_At)}</h3>
                        {detailData.author.id === userId || true &&
                            <h3 
                                className='button'
                                onClick={()=>setIsEdit(true)}
                            >수정</h3>}
                        {(isAdmin || detailData.author.id === userId) || true &&
                            <h3 
                                className='button'
                                onClick={deleteHandler}
                            >삭제</h3>}
                    </>
                }
                
            </div>            
        </StyleSeeComment>
        {/* <BorderLine/> */}
        </>
    );
}