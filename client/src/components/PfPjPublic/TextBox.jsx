import React from 'react';
import styled from 'styled-components'

const StyleTextBox = styled.div`
    width: 100%;
    .textbox-title {
        font-size:2rem;
        margin-bottom:1rem;
        font-weight: var(--nanum-semi-bold);
    }

    .row {
        gap:1rem;
    }

    p {
        line-height:1.3;
        font-size:1.6rem;
        overflow-wrap: break-word;
        word-break: break-all;
    }
`

export default function TextBox({
    title,
    component,
}) {
    return (
        <StyleTextBox className='col'>
            <h4 className='textbox-title'>{title}</h4>
            <div className='row'>{component}</div>            
        </StyleTextBox>
    );
}

