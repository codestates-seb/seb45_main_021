import React from 'react';
import styled from 'styled-components'
import ApplyCard from './ApplyCard';
import { BorderLine } from '../portfolio/SeeComment';

const StyleApplyStatus = styled.div`
    position:absolute;
    width:650px;
    max-height:${props=>props.$isOn ? '500px' : '0'};
    overflow:auto;
    /* background-color:rgba(0,0,0,0.9); */
    left:-40rem;
    top:5rem;
    z-index:300;
    padding:${props=>props.$isOn ? '3rem' : '0'};
`

export default function ApplyStatusContainer({
    requestPeople,
    isOn
}) {
    return (
        <StyleApplyStatus
            $isOn={isOn}
            className='col'
        >
            
            {requestPeople.map((item, idx) => 
            <>
                {idx !== 0 && <BorderLine/>}
                <ApplyCard
                    key={idx}
                    cardData={item}
                />
            </>
            )}
        </StyleApplyStatus>
    );
}

