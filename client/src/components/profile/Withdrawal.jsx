import React from 'react';
import { StyleBorderButton } from '../common/Buttons';
import { AiOutlineCloseCircle } from 'react-icons/ai';

export default function Withdrawal({ handleClickWithdrawal, isEdit, setIsEdit }) {
  return (
    <>
      <div className="col withdrawal">
        <div className="col gap">
          <h3>회원 탈퇴</h3>
          <p>회원 탈퇴는 돌이킬 수 없습니다. 선택에 유의해주세요.</p>
        </div>
        <StyleBorderButton
          $hoverEvent="background-color:black"
          $fontSize="30px"
          $radius="5px"
          $color="var(--error)"
          $borderColor="var(--error)"
          onClick={handleClickWithdrawal}
        >
          탈퇴
        </StyleBorderButton>
        <AiOutlineCloseCircle
          size="30"
          color="var(--error)"
          onClick={() => setIsEdit({ ...isEdit, withDrawal: false })}
        />
      </div>
    </>
  );
}
