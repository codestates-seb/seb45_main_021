import React from 'react';
import { styled } from 'styled-components';
import { LiaPlusSolid } from 'react-icons/lia';
import { StyleBorderButton } from '../common/Buttons';
import { useSelector } from 'react-redux';
import api from '../../hooks/useAxiosInterceptor';
import Tag from '../common/Tag';
import userDefaultImg from '../../static/images/userDefaultImg.jpeg';
import Skeleton from '@mui/material/Skeleton';

const SwiperCard = styled.div`
  width: 100%;
  min-height: 500px;
  border: 1px solid white;
  border-radius: 10px;
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
    font-size: 3rem;
    padding: 2rem 0;
  }
  .about {
    font-size: 2rem;
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
  &:hover {
    background-color: #80808027;
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

const AboutMeWrapper = styled.div`
  height: 100%;
  h3 {
    font-weight: 700;
    font-size: 2rem;
  }
  p {
    font-size: 1rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: auto;
  justify-content: space-between;
`;

export default function SwiperItem({
  activePage,
  data,
  idx,
  handler,
  idxHandler,
  isLoading,
  setData,
  trueData,
}) {
  const userImg = useSelector((state) => state.user.userInfo.userImgUrl);
  const handleEdit = (type) => {
    idxHandler(idx);
    handler(type);
  };
  const deleteHandler = () => {
    api.delete(`/projectcards/${data.projectCardId}`).then((el) => {
      window.alert('삭제가 완료되었습니다.');
      const temp = trueData.projectCard;
      temp[idx] = {
        tags: { value: [], error: '', curString: '' },
        working: trueData.profile.working,
        userImgUrl: trueData.profile.userImgUrl,
      };
      setData({
        ...trueData,
        projectCard: temp,
      });
    });
  };
  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="100%" style={{ borderRadius: '3rem' }} />
      ) : (
        <>
          {data.tell ? (
            <SwiperCard className="col gap" $active={activePage === idx ? true : false}>
              <InfoWrapper className="row gap">
                <img className="userImg" src={!userImg ? userDefaultImg : userImg} alt="" />
                <div className="col gap">
                  <div className="col gap">
                    <p className="label">연락처</p>
                    <p>{data.tell}</p>
                    <p className="label">상태</p>
                    <p>{data.working ? '재직중' : '구직중'}</p>
                  </div>
                  <div className="col gap">
                    {data.tags.value.length !== 0 && (
                      <>
                        <p className="label">기술</p>
                        <div className="row gap">
                          {data.tags.value.map((el, i) => (
                            <Tag key={i} text={el} />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </InfoWrapper>
              <AboutMeWrapper className="gap">
                <h3>소개</h3>
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
      )}
    </>
  );
}
