import React, { useState } from 'react';
import { styled } from 'styled-components';
import {FaPlus} from 'react-icons/fa'
import {HiOutlinePlus} from 'react-icons/hi'

const StyleFileInput = styled.div`
    width:${props=>props.$width};
    min-height:${props=>props.$height};
    position:relative;
    z-index:5;
    .file-box {
        position:absolute;
        z-index:10;
        top:0;
        left:0;
        background-color:var(--backgroundColor);
        border: 1.2px solid var(--black-100);
        border-radius : 3px;
        width:100%;
        height:100%;
    }
    img {
        width:100%;
        object-fit:contain;
    }
    input {
        display:none;
    }
`

const SvgLabel = styled.label`
    position: absolute;
    z-index:15;
    width:5rem;
    height:5rem;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    display:flex;
    justify-content:center;
    align-items:center;
    color: ${(props) => (props.$labelColor ? props.$labelColor : 'var(--black-100)')};
    font-size: 1.6rem;
    > svg {
        width:${props=>props.$labelSize};
        height:${props=>props.$labelSize};
        cursor:pointer;
        :hover {
            cursor:pointer;
        }
    }
`;

const TextLabel = styled.label`
    position: absolute;
    z-index:20;
    left:1rem;
    top:-1rem;
    background-color:var(--backgroundColor);
    padding-left: 3px;
    padding-right: 3px;
`

export default function FileInput({
    name,
    width,
    height,
    labelSize,
    number,
}) {
    const [images,setImages] = useState([]);
    console.log(images);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setImages([...images, e.target.result]);
          };
          reader.readAsDataURL(selectedFile);
        }
      };

    return (
        <StyleFileInput
            $width={width}
            $height={height}
        >
            <SvgLabel htmlFor={name} $labelSize={labelSize}>
                <HiOutlinePlus/>
            </SvgLabel>
            <TextLabel>{name}</TextLabel>
            <input
                type='file'
                id={name}
                accept='image/*'
                onChange={handleFileChange}
            />
            <div className='file-box'>
                {images.map((el,idx)=><img key={idx} src={el} alt='미리보기 사진'/>)}
            </div>
        </StyleFileInput>
    );
}

