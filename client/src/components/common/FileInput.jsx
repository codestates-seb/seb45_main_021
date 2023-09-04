import React, { useState } from 'react';
import { styled } from 'styled-components';
import {HiX} from 'react-icons/hi'

const StyleFileInput = styled.div`
    position:relative;
    z-index:10;
    border: 1.2px solid var(--black-100);
    border-radius : 3px;
    margin-top:1rem;
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
    background-color:var(--backgroundColor);
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

const TextLabel = styled.label`
    position: absolute;
    z-index:20;
    left:1rem;
    top:-1rem;
    background-color:var(--backgroundColor);
    padding:0 3px;
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
    opacity:${props=>props.$isDrag ? 1 : 0.3};
    transition: all 0.2s;
    visibility:${props=>props.$isDrag || props.$number === 0 ? 'visible' : 'hidden'};
    &:hover {
        opacity : 1;
        cursor: pointer;
    }   
`

const AddImageButton = styled.label`
    border: 2px solid var(--black-100);
    position:absolute;
    border-radius: 20px;
    overflow: hidden;
    opacity: 0.8;
    transition: all.2s;
    &:after {
        position: absolute;
        content: '';
        width: 100%;
        left: -100%;
        top: 0;
        height: 100px;
        background-color: #ffffff23;
        transition: all.2s;
        z-index: -1;
    }
    &:hover {
        opacity: 1;
    }
    &:hover:after {
        left: 0;
    }
    left:0;
    bottom:-5rem;
    padding:1rem;
    border-radius:3px;
`

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
    dataForm,
    setDataForm
}) {
    const [imgs,setImgs] = useState([]);
    const [isDrag, setIsDrag] = useState(false);
    
    const saveImgToFile = (files) => {
        const formData = new FormData();
        for(let i = 0; i < files.length; i++) {
            formData.append('file',files[i]);
        }
        setDataForm({...dataForm, imgs : formData})
      };

    const readImgToUrl = (file) => {
        return new Promise(resolve => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            reader.readAsDataURL(file);
        })
    }

    const fileChanger = async (file) => {
        if (file && file.length <= (number - imgs.length)) {
            const tempUrls = [];
            for(let i = 0; i < file.length; i++) {
                const imgUrl = await readImgToUrl(file[i]);
                tempUrls.unshift(imgUrl);
            }
            setImgs([ ...tempUrls,...imgs]);
        } else {
            //정상적이지 않은 수의 파일을 올리거나 개수 정해진 것 보다 많이 올릴경우
            alert('정상적인 파일 또는 개수를 맞춰서 올려주세요.');
        }
    }

    const fileClickHandler = (e) => {
        const selectedFile = Array.from(e.target.files);
        fileChanger(selectedFile);
        saveImgToFile(selectedFile);
    };

    const deleteImgHandler = (idx) => {
        const newImgs = imgs.filter((el,id)=>id!==idx);
        setImgs(newImgs);
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
        <StyleFileInput
            $width={width}
            $height={height}
            onDragEnter={dragEnterHandler}
            onDragOver={dragOverHandler}
            onDragLeave={dragLeaveHandler}
        >
            <TextLabel>{`${name} ${imgs.length} / ${number}`}</TextLabel>
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
            {imgs.length !== number && <AddImageButton htmlFor={name}>사진 업로드</AddImageButton>}
        </StyleFileInput>
    );
}

