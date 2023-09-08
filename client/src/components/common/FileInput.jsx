import React, { useEffect, useState } from 'react';
import { styled } from 'styled-components';
import {HiX} from 'react-icons/hi'

const StyleFileInput = styled.div`
    margin:5px 0 5px 0;
`

const FileInputContainer = styled.div`
    position:relative;
    margin-top:7px;
    border: 1.2px solid var(--black-100);
    border-radius : 3px;
    height:${props=>props.$height};
    width:${props=>props.$width};
    display:flex;
    align-items:center;
    justify-content:center;
    input {
        display:none;
    }
`

const ImgContainer = styled.div`
    background-color:var(--black-700);
    position:relative;
    border-radius : 3px;
    width: 100%;
    height:90%;
    overflow-x:scroll;
    overflow-y:hidden;
    align-items:center;
    justify-content:${props=>props.$imgsNum === 1 ? 'center' : 'start'};
`

const ImgBox = styled.div`
    position:relative;
    height: 100%;
    width:auto;
    &:hover{
        opacity:0.3;
    }
    > img {
        width: auto;
        height: 100%; /* 이미지를 100% 높이로 설정하여 부모에 맞추기 */
        object-fit: cover;
    }
    svg {
        position:absolute;
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        left: 0;
        right:  0; 
        bottom: 0;
        top:0;
        opacity:0;
        color:white;
        :hover{
            cursor:pointer;
        }
        &:hover{
            opacity:1;
        }
    }
`

const TextLabel = styled.div`
    background-color:transparent;
`

const DragDropBox = styled.label`
    position:absolute;
    z-index: 1;
    width:100%;
    height:90%;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:var(--black-300);
    border-radius: 3px;
    opacity:${props=>props.$isDrag ? 1 : 0.5};
    transition: all 0.2s;
    visibility:${props=>props.$isDrag || props.$number === 0 ? 'visible' : 'hidden'};
    &:hover {
        opacity : 1;
        cursor: pointer;
    }   
`

const AddImageButton = styled.label`
    position: relative;
    border: 2px solid var(--black-100);
    border-radius: 20px;
    opacity: 0.8;
    transition: all 0.2s;
    overflow: hidden;
    ::after {
        position: absolute;
        content: '';
        width: 100%;
        left: -100%;
        top: 0;
        height: 100%;
        background-color: #ffffff23;
        transition: all 0.2s;
        z-index: -1;
    }

    &:hover {
        opacity: 1;
        cursor: pointer;
    }

    &:hover:after {
        left: 0;
    }

    left: 0;
    bottom:-2rem;
    padding: 1rem;
    border-radius: 3px;
`;

const MiddleLine = styled.div`
    height:90%;
    margin:0 3rem;
    border:3px solid var(--black-300);
    border-radius:3px;
`
//width 퍼센테이지로 주면 스크롤 다 깨짐 씨이이발

/**
 * - jpg, jpeg, png 파일 전용 미리보기 폼
 * @param {string} name - 폼의 제목. 필수입력
 * @param {string} width - 폼의 가로길이. 퍼센테이지로 입력시 비율깨질수있음 
 * @param {string} height - 폼의 세로길이. 이미지는 세로길이에 맞춰서 비율이 유지됨
 * @param {string} number - 입력받을 사진파일의 개수. 필수입력
 * @param {string} dataForm - 저장할 state데이터. 필수입력필요
 * @param {string} setDatForm - state의 세터함수. 필수입력필요
 * @returns 
 */

export default function FileInput({
    name,
    width,
    height,
    number,
    handleInputChange,
    handleErrorChange,
    clearError,
    defaultImgs = [],
}) {
    const [imgs,setImgs] = useState([]);
    const [isDrag, setIsDrag] = useState(false);

    useEffect(()=>{
        setImgs([...defaultImgs]);
    },[defaultImgs])
    
    const saveImgToFile = (files) => {
        const formData = new FormData();
        try {
            for(let i = 0; i < files.length; i++) {
                formData.append('file',files[i]);
            }
            handleInputChange(null,formData, number===1 ? 'titleImg' : 'imgs');
            if(number === 1) {
                clearError('titleImg');
            }
        } catch {
            alert('사진 첨부실패');
        }
    };

    //이미지를 url주소로 바꿔주는 함수 미리보기에 사용
    const readImgToUrl = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                resolve(e.target.result);
            };
        })
    }

    //이미지를 url주소로 바꾸고 imgs에 넣어주는 함수
    const fileChanger = async (file) => {
        if (file && file.length <= (number - imgs.length)) {
            const tempUrls = [];
            for(let i = 0; i < file.length; i++) {
                const imgUrl = await readImgToUrl(file[i]);
                tempUrls.unshift(imgUrl);
            }
            setImgs([ ...tempUrls, ...imgs]);
        } else {
            alert('정상적인 파일 또는 개수를 맞춰서 올려주세요.');
        }
    }

    //fileChanger로 imgs에 넣고 saveImgToFile로 dataForm에 저장
    const fileClickHandler = (e) => {
        const selectedFile = Array.from(e.target.files);
        fileChanger(selectedFile);
        saveImgToFile(selectedFile);
    };

    //imgs에 클릭된 index를 조회하면서 데이터 지움
    const deleteImgHandler = (idx) => {
        const newImgs = imgs.filter((el,id)=>id!==idx);
        setImgs(newImgs);
        if(number===1){
            handleErrorChange(null,true,'titleImg');
        }
    }

    const dragEnterHandler = (e) => {
        e.preventDefault();
        setIsDrag(true);
    }

    const dragOverHandler = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        setIsDrag(true);
    }

    const dragLeaveHandler = (e) => {
        e.preventDefault();
        setIsDrag(false);
    }

    const dragDropHandler = (e) => {
        e.preventDefault();
        setIsDrag(false);
        const files = Array.from(e.dataTransfer.files);
        for(let i = 0; i < files.length; i++) {
            if(files[i].type !== 'image/png' && files[i].type !== 'image/jpeg' && files[i].type !== 'image/jpg') {
                //파일형식이 정해진 형식이 아닌경우
                alert('파일형식을 맞춰주세요.');
                return;
            }
        }
        saveImgToFile(files)
        fileChanger(files)
    }

    return (
        <StyleFileInput>
            <TextLabel>{`${name} ${imgs.length} / ${number}`}</TextLabel>
            <FileInputContainer
                $width={width}
                $height={height}
                onDragEnter={dragEnterHandler}
                onDragOver={dragOverHandler}
                onDragLeave={dragLeaveHandler}
            >
                
                <input
                    type='file'
                    id={name}
                    multiple
                    accept=".png, .jpg, .jpeg"
                    onChange={fileClickHandler}
                />
                <ImgContainer 
                    className='row'
                    $imgsNum={imgs.length}
                >
                    {imgs.map((el,idx)=>
                        <React.Fragment key={idx}>
                            {idx !== 0 && <MiddleLine />}
                            <ImgBox>
                                <img src={el} alt='미리보기 사진'/>
                                <HiX onClick={()=>deleteImgHandler(idx)}/>
                            </ImgBox>
                        </React.Fragment>
                    )}       
                </ImgContainer>
                <DragDropBox
                    htmlFor={name}
                    $isDrag={isDrag}
                    $number={imgs.length}
                    onDragEnter={dragEnterHandler}
                    onDragOver={dragOverHandler}
                    onDragLeave={dragLeaveHandler}
                    onDrop={dragDropHandler}
                >
                    사진 업로드
                </DragDropBox>
            </FileInputContainer>
            {imgs.length !== number && <AddImageButton htmlFor={name}>사진 업로드</AddImageButton>}
        </StyleFileInput>
    );
}

