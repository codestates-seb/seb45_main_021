import React from 'react';
import styled from 'styled-components'
import ApplyCard from './ApplyCard';
import { BorderLine } from '../portfolio/SeeComment';

const StyleApplyStatus = styled.div`
    width:100%;
    overflow:auto;
    gap:2rem;
`

export default function ApplyStatusContainer({
    requestPeople,
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

