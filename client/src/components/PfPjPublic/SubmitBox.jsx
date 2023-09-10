import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../common/Modal';
import { StyleBorderButton } from '../common/Buttons';

const StyleSubmitBox = styled.div`
    width:100%;
    margin-bottom:10rem;
    display:flex;
    button {
      font-size:1.6rem;
      padding:5px 15px;
      margin-right:5rem;
    }
`

export default function SubmitBox({
    submitTitle,
    submitMessage,
    submitCheckHandler,
    cancelTitle,
    cancelMessage,
    cancelCheckHandler,
}) {
    const [isCancelModalOn, setIsCancelModalOn] = useState(false);
    const [isConfirmWrite, setIsConfirmWrite] = useState(false);
    return (
        <StyleSubmitBox>
        <StyleBorderButton onClick={()=>setIsConfirmWrite(!isConfirmWrite)}>
          <p>게시</p>
          {isConfirmWrite &&
            <Modal
              setIsOn={()=>setIsConfirmWrite(!isConfirmWrite)}
              type='confirm'
              title={submitTitle}
              message={submitMessage}
              cancelHandler={()=>setIsConfirmWrite(false)}
              checkHandler={submitCheckHandler}
          />}
        </StyleBorderButton>
        <StyleBorderButton onClick={()=>setIsCancelModalOn(!isCancelModalOn)}>
          <p>취소</p>
          {isCancelModalOn &&
            <Modal
              setIsOn={()=>setIsCancelModalOn(!isCancelModalOn)}
              type='confirm'
              title={cancelTitle}
              message={cancelMessage}
              cancelHandler={()=>setIsCancelModalOn(false)}
              checkHandler={cancelCheckHandler}
          />}
        </StyleBorderButton>

        </StyleSubmitBox>
    );
}

