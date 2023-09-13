import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { styled } from 'styled-components';
import Modal from './Modal';
import useNav from '../../hooks/useNav';
import { useSelector } from 'react-redux';
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

export default function Like({ likes, size, unLikePost, likePost, postId }) {
  const { isLogin, userInfo } = useSelector((state) => state.user);
  const [userLikes, setUserLikes] = useState([1, 3, 4, 5, 6, 7, 8, 9, 10]);
  const isUserLiked = userLikes.includes(+postId);
  const [isOpen, setIsOpen] = useState(false);
  const { toSignin } = useNav();
  // ?? 여기서 해당 유저 정보 객체에 하트 리스트를 업데이트 한다고해서 리스트에 있는 하트가 업데이트 되는가?
  // 만약 안된다면 어떻게 할 것인가?

  const unLikePostHandler = () => {
    setUserLikes((prevLikes) => prevLikes.filter((id) => +id !== +postId));
    // 서버에다가 좋아요 해제 요청
    // unLikePost();
  };
  const likePostHandler = () => {
    setUserLikes((prevLikes) => [...prevLikes, +postId]);
    // 서버에다가 좋아요 업데이트 요청
    // likePost();
  };
  const likeUpdateHandler = () => {
    if (!isLogin) setIsOpen(true);
    else isUserLiked ? unLikePostHandler() : likePostHandler();
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
      <span>{likes}</span>
    </StyleLike>
  );
}
