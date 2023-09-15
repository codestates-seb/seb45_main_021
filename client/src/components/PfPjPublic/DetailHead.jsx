import React from 'react';
import styled from 'styled-components';
import defaultImg from '../../static/images/userDefaultImg.jpeg';
import Like from '../common/Like';
import { dateFormatter } from '../../utils/dateFormatter';
import useNav from '../../hooks/useNav';
import { useSelector } from 'react-redux';
import useLikeUpdate from '../../hooks/useLikeUpdate';

const StyleDetailHead = styled.div`
  height: auto;
  padding-bottom: 1rem;
  position: relative;

  .project-detail {
    font-size: 3rem;
    color: var(--black-400);
    margin-bottom: 1rem;
  }

  .project-detail-title {
    font-size: 3rem;
    font-weight: var(--nanum-bold);
    /* font-family:var(); */
    color: var(--black-200);
    margin-bottom: 2rem;
  }

  > .row {
    font-size: 1.4rem;
    gap: 2rem;
    align-items: center;
  }

  .author-wrapper {
    padding: 2px 5px;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    * {
      cursor: pointer;
    }

    > img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      object-fit: cover;
    }
    &:hover {
      cursor: pointer;
      opacity: 0.4;
    }
  }

  & > svg {
    position: absolute;
    top: 0;
    right: 0;
    width: 3rem;
    height: 3rem;
    transition: 0s !important;
    & > path {
      transition: 0s !important;
    }
  }
`;

const Border = styled.div`
  margin-top: 1rem;
  border-bottom: 3px solid var(--black-300);
`;

export default function DetailHead({ type = 'project', height = '15rem', detailData, setter }) {
  const { toProfile, toProject, toPortfolio } = useNav();
  const options = useSelector((state) => state.filterOption);
  const { projectId, portfolioId, heartCount } = detailData;
  const likeUpdateSuccess = useLikeUpdate(options, `${type}s`);

  const detailLikeUpdate = (postId, updateType) => {
    likeUpdateSuccess(postId, updateType);
    const updatedHeartCount =
      updateType === 'increase' ? detailData.heartCount + 1 : detailData.heartCount - 1;
    setter((pre) => ({ ...pre, heartCount: updatedHeartCount }));
  };

  return (
    <StyleDetailHead className="col" $height={height}>
      <h2 className="project-detail">{type === 'project' ? 'PROJECT' : 'PORTFOLIO'}</h2>
      <h1 className="project-detail-title">{detailData.title}</h1>
      <div className="row">
        <div className="row author-wrapper" onClick={() => toProfile(detailData.memberId)}>
          <img
            src={detailData.userImgUrl ? detailData.userImgUrl : defaultImg}
            alt="작성자이미지"
          />
          <h3>{detailData.userName}</h3>
        </div>
        <h3>{dateFormatter(detailData.createdAt)}</h3>
        <Like
          heartCount={heartCount}
          size="1.6rem"
          postId={projectId || portfolioId}
          type={`${type}s`}
          likeUpdateSuccess={detailLikeUpdate}
        />
      </div>
      <Border />
      {/* <HiX
                onClick={()=>type==='project' ? toProject() : toPortfolio()}
            /> */}
    </StyleDetailHead>
  );
}
