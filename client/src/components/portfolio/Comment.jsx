import React from 'react';
import { StyleDetailContainer } from '../../pages/ProjectDetail';
import WriteComment from './WriteComment';
import SeeComment from './SeeComment';

export default function Comment({
    isAdmin,
    detailData,
    updateHandler
}) {
    return (
        <StyleDetailContainer
            id='comment'
            className='col'
        >
            <WriteComment
                updateHandler={updateHandler}
            />
            {detailData.comments.map((item,idx)=>
                <SeeComment
                    key={idx}
                    isAdmin={isAdmin}
                    text={item.body}
                    detailData={detailData}
                    commentData={item}
                />
            )}
        </StyleDetailContainer>
    );
}

