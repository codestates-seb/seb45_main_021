import { FaRegHeart } from 'react-icons/fa';
import { styled } from 'styled-components';

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

export default function Like({ likes, size, unlikePost, likePost }) {
  const user = null; // 종범이형이 만든 유저 객체의 아이디 뽑아오는 함수
  const isUserLiked = likes.includes(user);

  const likeUpdateHandler = () => {
    if (!user) {
      // user가 존재하지 않는다면, 로그인이 필요한 서비스 모달 띄우기
    } else {
      isUserLiked ? unlikePost() : likePost();
    }
  };

  return (
    <StyleLike $size={size}>
      <FaRegHeart
        onClick={likeUpdateHandler}
        color={isUserLiked ? '#ff0000' : 'var(--black-100)'}
      />
      <span>{likes.length}</span>
    </StyleLike>
  );
}
