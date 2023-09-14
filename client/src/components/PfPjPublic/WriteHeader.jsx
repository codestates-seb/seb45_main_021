import { styled } from "styled-components";

const StyleWriteHeader = styled.div`
    height:${props => props.$height};
    margin-bottom:${props => props.$marginBottom};
    gap:10%;
    .title-box {
        flex:1;
        width:100%;
        > p {
            font-size:2rem;
            font-weight: var(--nanum-semi-bold);
        }    
    }
    .body-box {
        flex:5;
        width:100%;
        gap:5%;
        > p {
            font-size:1.6rem;
            font-weight: var(--nanum-semi-bold);
        } 
    }
`

export default function WriteHeader({
    text,
    height='20rem',
    marginBottom='10rem',
    type,
    state='write',
}) {
    const defaultWriteData = {
        project : {
            title : '프로젝트 모집글 작성시 주의사항',
            body : ['모집 마감일, 인원은 최초 작성 후 수정시 변경할 수 없습니다.','타이틀 이미지는 필수로 기입해야 하지만 일반 이미지는 선택사항입니다.','검색 키워드는 선택 입력 사항입니다.','이미지 파일 형식은 .jpg, .jpeg, .png 형식만 업로드 가능합니다']
        },
        portfolio : {
            title : '포트폴리오 작성시 주의사항',
            body : ['댓글 허용시 달리는 모든 댓글은 작성자 본인이 지울 수 있습니다.','댓글 허용 여부는 최초 작성 후에도 수정이 가능합니다.','타이틀 이미지는 필수로 기입해야 하지만 일반 이미지는 선택사항입니다.','검색 키워드는 선택 입력 사항입니다.','이미지 파일 형식은 .jpg, .jpeg, .png 형식만 업로드 가능합니다']
        }
    }

    const defaultEditData = {
        project : {
            title : '프로젝트 모집글 수정시 주의사항',
            body : ['수정을 완료하면 이후 수정 이전으로 복구할 수 없습니다.','타이틀 이미지는 필수로 기입해야 하지만 일반 이미지는 선택사항입니다.','검색 키워드는 선택 입력 사항입니다.','이미지 파일 형식은 .jpg, .jpeg, .png 형식만 업로드 가능합니다']
        },
        portfolio : {
            title : '포트폴리오 수정시 주의사항',
            body : ['수정을 완료하면 이후 수정 이전으로 복구할 수 없습니다.','타이틀 이미지는 필수로 기입해야 하지만 일반 이미지는 선택사항입니다.','검색 키워드는 선택 입력 사항입니다.','이미지 파일 형식은 .jpg, .jpeg, .png 형식만 업로드 가능합니다']
        }
    }

    return (
        <StyleWriteHeader
            className="col"
            $height={height}
            $marginBottom={marginBottom}
        > 
            <div className="title-box">
                <p>{state !== 'edit' ? defaultWriteData[type].title : defaultEditData[type].title}</p>
            </div>
            <div className="body-box col">
                {state !== 'edit'
                ?
                defaultWriteData[type].body.map((item,idx)=>
                    <p key={idx}>{`${idx+1}. ${item}`}</p>
                )
                :
                defaultEditData[type].body.map((item,idx)=>
                    <p key={idx}>{`${idx+1}. ${item}`}</p>
                )
            }
            </div>
        </StyleWriteHeader>
    );
}

