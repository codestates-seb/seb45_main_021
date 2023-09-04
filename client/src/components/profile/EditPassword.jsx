import React from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Input from '../common/Input';
import { StyleBorderButton } from '../common/Buttons';

export default function EditPassword({
  editPassword,
  setEditPassword,
  isEdit,
  setIsEdit,
  handleEditPassword,
}) {
  return (
    <>
      <div className="col gap">
        <h3>비밀번호 변경</h3>
        <form className="col gap">
          <Input
            type="password"
            autoComplete="off"
            label="현재 비밀번호"
            fontSize="2rem"
            width="100%"
            height="4rem"
            value={editPassword.prevPassword}
            onChange={(e) => setEditPassword({ ...editPassword, prevPassword: e.target.value })}
          />
          <Input
            type="password"
            autoComplete="off"
            label="새로운 비밀번호"
            fontSize="2rem"
            width="100%"
            height="4rem"
            value={editPassword.newPassword}
            onChange={(e) => setEditPassword({ ...editPassword, newPassword: e.target.value })}
          />
          <Input
            type="password"
            autoComplete="off"
            label="새로운 비밀번호 재확인"
            fontSize="2rem"
            width="100%"
            height="4rem"
            value={editPassword.newPassword2}
            onChange={(e) => setEditPassword({ ...editPassword, newPasswordCheck: e.target.value })}
          />

          <StyleBorderButton
            $hoverEvent="background-color:black"
            $fontSize="30px"
            $radius="5px"
            onClick={handleEditPassword}
          >
            변경
          </StyleBorderButton>
        </form>
      </div>
      <div className="editProfile">
        <AiOutlineCloseCircle
          size="30"
          color="var(--error)"
          onClick={() => setIsEdit({ ...isEdit, password: false })}
        />
      </div>
    </>
  );
}
