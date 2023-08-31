import React from 'react';
import { styled } from 'styled-components';
import { LiaPlusSolid } from 'react-icons/lia';

const SwiperCard = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 3rem;
  padding: 2rem;
  transition: all 0.4s;
  position: relative;
  filter: ${(props) => (props.$active ? '1' : 'blur(2px)')};
  transform: ${(props) => (props.$active ? 'scale(1)' : 'scale(0.8)')};
`;

const SwiperNullCard = styled(SwiperCard)`
  svg {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

// isWorking: true,
// email: 'dbauddls12@naver.com',
// userImg: userDefaultImg,
// userName: '유명인',
// title: '안녕하세요 자신있는 개발자입니다.',
// aboutMe: '자기소개 이렇게 적는게 맞는걸까요오오오드용액 가버렷 컽컽컽 !!@!@',
// call: '010-1111-2222',
// tags: ['JavaScript', 'React', 'CSS'],

export default function SwiperItem({ activePage, data, idx, handler, idxHandler }) {
  const handleEdit = () => {
    idxHandler(idx);
    handler();
  };
  return (
    <>
      {data.userName ? (
        <SwiperCard className="col" $active={activePage === idx ? true : false}>
          {data.userName}
        </SwiperCard>
      ) : (
        <SwiperNullCard $active={activePage === idx ? true : false}>
          <LiaPlusSolid onClick={handleEdit} size={'10rem'} />
        </SwiperNullCard>
      )}
    </>
  );
}
