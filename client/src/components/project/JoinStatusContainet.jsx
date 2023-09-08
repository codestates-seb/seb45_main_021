import React from 'react';
import styled from 'styled-components';
import JoinCard from './JoinCard';
import { BorderLine } from '../portfolio/SeeComment';

const StyleJoinStautsContainer = styled.div`
    width:100%;
    overflow:auto;
    gap:2rem;
`

export default function JoinStatusContainet({
    joinPeople,
}) {
    return (
        <StyleJoinStautsContainer className='col'>
            {joinPeople.map((item,idx)=>
                    <JoinCard
                        key={idx}
                        // cardData={item}
                    />
            )}
        </StyleJoinStautsContainer>
    );
}

