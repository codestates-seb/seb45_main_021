import React, { useEffect, useState } from 'react';
import { StyleDetailContainer } from '../../pages/ProjectDetail';
import WriteComment from './WriteComment';
import SeeComment from './SeeComment';
import { useSelector } from 'react-redux';

export default function Comment({
    isAdmin,
    detailData,
    updateHandler
}) {
    const loginUserData = useSelector(state=>state.user);
    return (
        <StyleDetailContainer
            id='comment'
            className='col'
        >
            {loginUserData.isLogin && 
            <WriteComment
                updateHandler={updateHandler}
            />}
            {detailData.comments.length !== 0 && detailData.comments.map((item,idx,arr)=>
                <SeeComment
                    key={arr.length-idx-1}
                    isAdmin={isAdmin}
                    detailData={detailData}
                    commentData={arr[arr.length-idx-1]}
                    updateHandler={updateHandler}
                />
            )}
        </StyleDetailContainer>
    );
}

