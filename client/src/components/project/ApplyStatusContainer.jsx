import React from 'react';
import styled from 'styled-components'
import ApplyCard from './ApplyCard';

const StyleApplyStatus = styled.div`
    position:absolute;
    width:650px;
    max-height:500px;
    overflow-y:scroll;
    background-color:rgba(0,0,0, 1);
    left:-40rem;
    top:5rem;
`

export default function ApplyStatusContainer({
    requestPeople
}) {
    return (
        <StyleApplyStatus className='col'>
            {requestPeople.map((item, idx) => 
                <ApplyCard
                    key={idx}
                    cardData={item}
                />
            )}
        </StyleApplyStatus>
    );
}

