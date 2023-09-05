import React from 'react';
import { styled } from 'styled-components';
import TextBox from './TextBox';
import Tag from '../common/Tag';
import { dateFormatter } from '../../utils/dateFormatter';
import { StyleBorderButton } from '../common/Buttons';


const StyleDetailBody = styled.div`
    .post-data-box {
        flex:4;
        height:auto;
    }

    .sticky-box {
        /* position:sticky; */
        top:60px;
    }

    .image-data-box {
        padding-left:3rem;
        flex:6;
        gap:3rem;
        > img {
            width:100%;
            object-fit:cover;
        }
    }
`

export default function DetailBody({detailData}) {
    return (
        <StyleDetailBody className='row'>
            <div className='post-data-box col'>
                <div className='sticky-box'>
                    <TextBox
                        title={'개발 언어'}
                        component={
                            detailData.tag.map(item=>
                                <Tag key={item} text={item} type={'project'}/>
                            )
                        }
                    />
                    <TextBox
                        title={'프로젝트 마감 날짜'}
                        component={
                            <p>{`${dateFormatter(detailData.created_At)} ~ ${dateFormatter(detailData.closed_At)}`}</p>
                        }
                    />
                    <TextBox
                        title={'프로젝트 설명'}
                        component={
                            <p>{`${detailData.body}`}</p>
                        }
                    />
                    <TextBox
                        title={'상세 요강'}
                        component={
                            <p>{`${detailData.description}`}</p>
                        }
                    />
                    <TextBox
                        title={'모집 현황'}
                        component={
                            <p>{`${detailData.totalPeople}명 / ${detailData.joinPeople.length}명`}</p>
                        }
                    />
                    <StyleBorderButton>프로젝트 신청하기</StyleBorderButton>
                </div>
            </div>
            <div className='image-data-box col'>
                {detailData.imgs.map((url,idx)=>
                    <img key={idx} src={url} alt='이미지'></img>
                )}
            </div>

        </StyleDetailBody>
    );
}

