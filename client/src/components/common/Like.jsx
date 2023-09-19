import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { styled } from 'styled-components';
import Modal from './Modal';
import useNav from '../../hooks/useNav';
import { useDispatch, useSelector } from 'react-redux';
import { heartListUpdate } from '../../redux/userForm/userSlice';
import api from '../../hooks/useAxiosInterceptor';

const StyleLike = styled.div`
  display: flex;
  font-size: ${(props) => props.$size || '2rem'};
  flex: 1;
  gap: 0.5rem;
  align-items: end;
  svg {
    cursor: pointer;
  }
  span {
    font-weight: 900;
  }
`;

/**
 * 좋아요 버튼과, 좋아요 개수를 보여주는 컴포넌트입니다
 * @param {Array} likes - 좋아요 목록 입니다
 * @param {string} size - font size입니다
 * @param {Function} unlikePost - 좋아요를 취소하는 함수입니다
 * @param {Function} likePost - 좋아요를 등록하는 함수입니다
 * @returns {JSX.Element}
 */

export default function Like({ heartCount, size, postId, type, likeUpdateSuccess }) {
  const { isLogin, userInfo, likeList } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const listType = type === 'projects' ? 'projectList' : 'portfolioList';
  const isUserLiked =
    type === 'projects'
      ? likeList.projectList.includes(postId)
      : likeList.portfolioList.includes(postId);
  const [isOpen, setIsOpen] = useState(false);
  const { toSignin } = useNav();
  const likeUpdateHandler = async () => {
    if (!isLogin) setIsOpen(true);
    else {
      try {
        await api.post(`/${type === 'projects' ? 'project' : 'portfolio'}/hearts/${postId}`, {
          memberId: userInfo.memberId,
        });
        const updatedList = isUserLiked
          ? likeList[listType].filter((item) => item !== postId)
          : [...likeList[listType], postId];
        dispatch(heartListUpdate({ ...likeList, [listType]: updatedList }));
        likeUpdateSuccess(postId, isUserLiked ? 'decrease' : 'increase');
      } catch (e) {
        console.error('좋아요 등록에 실패했습니다.', e);
      }
    }
  };

  return (
    <StyleLike $size={size}>
      {isOpen && (
        <Modal
          setIsOpen={setIsOpen}
          title="로그인이 필요한 서비스입니다."
          body="로그인 페이지로 이동하시겠습니까?"
          confirmHandler={toSignin}
        />
      )}
      <FaRegHeart
        onClick={likeUpdateHandler}
        color={isUserLiked ? '#ff0000' : 'var(--black-100)'}
      />
      <span>{heartCount}</span>
    </StyleLike>
  );
}
