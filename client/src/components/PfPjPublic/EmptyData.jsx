import React from 'react';
import styled from 'styled-components'

const StyleEmptyData = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    width:${props=>props.$width};
    height:${props=>props.$height};
    > p {
        font-size:${props=>props.$fontSize}
    }
`

export default function EmptyData({
    text,
    width='100%',
    height='100%',
    fontSize='1.6rem'
}) {
    return (
        <StyleEmptyData
            $width={width}
            $height={height}
            $fontSize={fontSize}
        >
            <p>{text}</p>
        </StyleEmptyData>
    );
}

