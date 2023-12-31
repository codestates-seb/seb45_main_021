import React, { useEffect, useRef, useState } from 'react';
import { styled } from 'styled-components';
import { HiX } from 'react-icons/hi';
import Modal from './Modal';

const StyleFileInput = styled.div``;

const FileInputContainer = styled.div`
  position: relative;
  margin-top: 7px;
  border: 1.2px solid var(--black-100);
  border-radius: 3px;
  height: ${(props) => props.$height};
  width: ${(props) => props.$width};
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    display: none;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  border-radius: 3px;
  width: 100%;
  height: 200px;
  overflow: scroll;
  overflow-y: hidden;
  align-items: center;
  justify-content: ${(props) => (props.$imgsNum === 1 ? 'center' : 'start')};
  &::-webkit-scrollbar {
    height: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #000000; /* 스크롤바 색상 설정 */
    border-radius: 5px; /* 스크롤바 모양 설정 */
  }
  &::-webkit-scrollbar-track {
    background-color: var(--black-100) !important;
    padding: 10px;
  }
`;

const ImgBox = styled.div`
  padding: 2px;
  position: relative;
  height: 100%;
  &:hover {
    opacity: 0.3;
  }
  > img {
    width: auto;
    height: 100%;
    object-fit: cover;
  }
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    opacity: 0;
    /* color:white; */
    :hover {
      cursor: pointer;
    }
    &:hover {
      opacity: 1;
    }
  }
`;

const TextLabel = styled.div`
  background-color: transparent;
  font-size: 1.6rem;
  font-weight: var(--nanum-semi-bold);
`;

const DragDropBox = styled.label`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  font-weight: var(--nanum-semi-bold);
  background-color: ${(props) => (props.$isDrag ? 'var(--black-800)' : 'transparent')};
  cursor: pointer;
  border-radius: 3px;
  transition: all 0.2s;
  visibility: ${(props) => (props.$isDrag || props.$number === 0 ? 'visible' : 'hidden')};
  &:hover {
    background-color: var(--black-800);
  }
`;

const AddImageButton = styled.label`
  position: relative;
  border: 2px solid var(--black-100);
  border-radius: 20px;
  opacity: 0.8;
  transition: all 0.2s;
  overflow: hidden;
  font-size: 1.4rem;
  font-weight: var(--nanum-semi-bold);
  left: 0;
  bottom: -2rem;
  padding: 5px 7px;
  border-radius: 3px;
  cursor: pointer;
`;

const MiddleLine = styled.div`
  height: 90%;
  margin: 0 1rem;
  border: 1px solid var(--black-300);
  border-radius: 1px;
`;
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
  dataForm,
  defaultImgs = [],
  setWillDeleteImgs,
  ...rest
}) {
  const [imgs, setImgs] = useState([]);
  const [isDrag, setIsDrag] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const input = useRef();
  const fileKey = number === 1 ? 'titleImageFile' : 'imageFile';
  const willDeleteKey = number === 1 ? 'titleImageUrl' : 'imageUrls';
  //사용자가 드래그또는클릭으로 사진을 업로드시 미리보기 화면은 readImgToUrl을통해 img의 소스에 넣어서 보여주느것
  //서버에 보낼때 단순 추가일경우 파일을 보냄 수정시에 이미 존재하는 이미지를 지우고싶다면 받아온 url을 보내면 될것
  //서버에 이미지를 추가적으로 넣고싶다 그러면 파일 삭제하고싶다 그러면 url로 보냄
  useEffect(() => {
    if (defaultImgs.length) {
      setImgs(defaultImgs);
    }
  }, [defaultImgs]);

  const saveImgToFile = (files) => {
    const formData = new FormData();
    try {
      for (let i = 0; i < files.length; i++) {
        formData.append(fileKey, files[i]);
      }
      handleInputChange(null, formData, fileKey);
      if (number === 1) {
        clearError('titleImageFile');
      }
    } catch {
      alert('사진 첨부실패');
    }
  };

  //이미지를 url주소로 바꿔주는 함수 미리보기에 사용
  const readImgToUrl = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        resolve(e.target.result);
      };
    });
  };

  //이미지를 url주소로 바꾸고 imgs에 넣어주는 함수
  const fileChanger = async (file) => {
    if (file && file.length <= number - imgs.length) {
      const tempUrls = [];
      for (let i = 0; i < file.length; i++) {
        const imgUrl = await readImgToUrl(file[i]);
        tempUrls.unshift(imgUrl);
      }
      setImgs([...tempUrls, ...imgs]);
    } else {
      setShowModal(true);
    }
  };

  //fileChanger로 imgs에 넣고 saveImgToFile로 dataForm에 저장
  const fileClickHandler = (e) => {
    const selectedFile = Array.from(e.target.files);
    fileChanger(selectedFile);
    saveImgToFile(selectedFile);
  };

  //imgs에 클릭된 index를 조회하면서 데이터 지움
  const deleteImgHandler = (idx) => {
    const newImgs = imgs.filter((el, id) => id !== idx);
    setImgs(newImgs);
    if (setWillDeleteImgs) {
      if (number === 1) {
        if (dataForm.titleImage[0] === imgs[idx]) {
          handleInputChange(null, imgs[idx], willDeleteKey);
        }
      } else {
        for (let i = 0; i < dataForm.images.length; i++) {
          if (imgs[idx] === dataForm.images[i]) {
            const tempArr = [...dataForm.imageUrls];
            tempArr.push(imgs[idx]);
            handleInputChange(null, tempArr, willDeleteKey);
            return;
          }
        }
      }
    }
    if (input.current) {
      input.current.value = null;
    }
    const tempFiles = dataForm[fileKey].getAll(fileKey);
    const newForm = dataForm[fileKey];
    newForm.delete(fileKey);
    for (let i = 0; i < tempFiles.length; i++) {
      if (i !== idx) {
        newForm.append(fileKey, tempFiles[i]);
      }
    }
    handleInputChange(null, newForm, fileKey);
    if (number === 1) {
      handleErrorChange(null, true, fileKey);
    }
  };

  const dragEnterHandler = (e) => {
    e.preventDefault();
    setIsDrag(true);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDrag(true);
  };

  const dragLeaveHandler = (e) => {
    e.preventDefault();
    setIsDrag(false);
  };

  const dragDropHandler = (e) => {
    e.preventDefault();
    setIsDrag(false);
    const files = Array.from(e.dataTransfer.files);
    for (let i = 0; i < files.length; i++) {
      if (
        files[i].type !== 'image/png' &&
        files[i].type !== 'image/jpeg' &&
        files[i].type !== 'image/jpg'
      ) {
        //파일형식이 정해진 형식이 아닌경우
        // alert('파일형식을 맞춰주세요.');
        setShowModal(true);
        return;
      }
    }
    saveImgToFile(files);
    fileChanger(files);
  };

  return (
    <StyleFileInput {...rest}>
      {showModal && (
        <Modal
          setIsOpen={setShowModal}
          title={'파일 형식 오류'}
          body={'파일 확장자 또는 파일 개수가 맞는지 확인 해 주세요.'}
          type="alert"
          confirmHandler={() => setShowModal(false)}
        />
      )}
      <TextLabel>{`${name} ${imgs.length} / ${number}`}</TextLabel>
      <FileInputContainer
        $width={width}
        $height={height}
        onDragEnter={dragEnterHandler}
        onDragOver={dragOverHandler}
        onDragLeave={dragLeaveHandler}
      >
        <input
          ref={input}
          type="file"
          id={name}
          multiple
          accept=".png, .jpg, .jpeg"
          onChange={fileClickHandler}
        />
        <ImgContainer className="row" $imgsNum={imgs.length}>
          {imgs.map((el, idx) => (
            <React.Fragment key={idx}>
              {idx !== 0 && <MiddleLine />}
              <ImgBox>
                <img src={el} alt="미리보기 사진" />
                <HiX onClick={() => deleteImgHandler(idx)} />
              </ImgBox>
            </React.Fragment>
          ))}
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
          이미지를 드래그 혹은 업로드 하세요
        </DragDropBox>
      </FileInputContainer>
      {imgs.length !== number && <AddImageButton htmlFor={name}>사진 업로드</AddImageButton>}
    </StyleFileInput>
  );
}
