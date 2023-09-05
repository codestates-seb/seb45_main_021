import React from 'react';
import { styled } from 'styled-components';
import { LiaPlusSolid } from 'react-icons/lia';
import { StyleBorderButton } from '../common/Buttons';
import { useParams } from 'react-router-dom';
import api from '../../hooks/useAxiosInterceptor';
import useNav from '../../hooks/useNav';

const SwiperCard = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid white;
  border-radius: 3rem;
  padding: 2rem;
  transition: all 0.4s;
  position: relative;
  display: flex;
  gap: 2rem;
  filter: ${(props) => (props.$active ? '1' : 'blur(2px)')};
  transform: ${(props) => (props.$active ? 'scale(1)' : 'scale(0.8)')};
  .gap {
    gap: 1rem;
  }
  h3 {
    font-size: 5rem;
    padding: 3rem 0;
  }
  .about {
    font-size: 3rem;
  }
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

const InfoWrapper = styled.div`
  width: 100%;
  font-size: 2rem;
  .label {
    font-weight: 800;
  }
  .userImg {
    width: 40%;
    border-radius: 10px;
    &:hover {
      filter: brightness(0.8);
    }
  }
`;
const Tag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  position: relative;
  border-radius: 30px;
  width: fit-content;
  height: fit-content;
  background-color: var(--black-100);
  color: var(--black);
  text-align: center;
  padding: 5px 10px;
  font-size: 1.2rem;
`;

const AboutMeWrapper = styled.div`
  height: 100%;
  h3 {
    font-weight: 700;
  }
`;

const ButtonWrapper = styled.div`
  justify-content: space-between;
`;

export default function SwiperItem({ activePage, data, idx, handler, idxHandler }) {
  const { userId } = useParams();
  const { toProfile } = useNav();

  const handleEdit = (type) => {
    idxHandler(idx);
    handler(type);
  };
  const deleteHandler = () => {
    console.log('삭제요청');
    api.delete(`/projectcards/${idx}`).then((el) => {
      window.alert('삭제가 완료되었습니다.');
      toProfile(userId);
    });
  };
  return (
    <>
      {data.userName ? (
        <SwiperCard className="col gap" $active={activePage === idx ? true : false}>
          <InfoWrapper className="row gap">
            <img className="userImg" src={data.userImg} alt="" />
            <div className="col gap">
              <div className="col gap">
                <p className="label">제목</p>
                <p>{data.title}</p>
              </div>
              <div className="col gap">
                <p className="label">연락처</p>
                <p>{data.isWorking ? '재직중' : '구직중'}</p>
              </div>
              <div className="col gap">
                {data.tags.length !== 0 && (
                  <>
                    <p className="label">기술</p>
                    <div className="row gap">
                      {data.tags.map((el, i) => (
                        <Tag key={i}>{el}</Tag>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </InfoWrapper>
          <AboutMeWrapper className="gap">
            <h3>자기소개</h3>
            <p className="about">{data.aboutMe}</p>
          </AboutMeWrapper>
          <ButtonWrapper className="row gap">
            <StyleBorderButton
              onClick={() => handleEdit('fetch')}
              $width="50%"
              $borderColor="green"
            >
              수정
            </StyleBorderButton>
            <StyleBorderButton $width="50%" $borderColor="red" onClick={deleteHandler}>
              삭제
            </StyleBorderButton>
          </ButtonWrapper>
        </SwiperCard>
      ) : (
        <SwiperNullCard $active={activePage === idx ? true : false}>
          <LiaPlusSolid onClick={() => handleEdit('new')} size={'10rem'} />
        </SwiperNullCard>
      )}
    </>
  );
}
