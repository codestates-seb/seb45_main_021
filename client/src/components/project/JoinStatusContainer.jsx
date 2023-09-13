import React from 'react';
import styled from 'styled-components';
import JoinCard from './JoinCard';
import { BorderLine } from '../portfolio/SeeComment';
import EmptyData from '../PfPjPublic/EmptyData';

const StyleJoinStautsContainer = styled.div`
    width:100%;
    overflow:auto;
    gap:2rem;
    &::-webkit-scrollbar {
      display: none;
    }
`

export default function JoinStatusContainer({
    joinPeople,
}) {
    return (
        <StyleJoinStautsContainer className='col'>
            {joinPeople.length !== 0 ?
                joinPeople.map((item,idx)=>
                    <JoinCard
                        key={idx}
                        cardData={item}
                    />
            ):
            <EmptyData text={'참가자 없음'} height='500px'/>
            }
        </StyleJoinStautsContainer>
    );
}

