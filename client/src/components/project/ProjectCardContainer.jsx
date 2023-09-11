import React from 'react';
import styled from 'styled-components'
import SubmitedCard from './SubmitedCard';
import ForSubmitCard from './ForSubmitCard';
import { desktop, mobile } from '../../static/theme';
import EmptyData from '../PfPjPublic/EmptyData';

export const StyleProjectCardContainer = styled.div`
    width:${props => props.$isForSubmit ? '60vw' : '100%'};
    gap:2rem;
    overflow:auto;
    ${desktop} {
        flex-direction: column;
    }
    &::-webkit-scrollbar {
        display: none;
    }
    height:auto;   
    max-height:700px;
`

export default function ProjectCardContainer({
    cardList,
    isForSubmit = false,
    selectedCard,
    setSelectedCard
}) {
    return (
        <StyleProjectCardContainer
            className={isForSubmit ? 'row' : 'col'}
            $isForSubmit={isForSubmit}
        >
            {cardList.length !== 0 ? cardList.map((item, idx) =>
                <React.Fragment
                    key={idx}
                >
                    {isForSubmit
                    ? <ForSubmitCard 
                        cardData={item}
                        idx={idx}
                        selectedCard={selectedCard===idx ? true : false}
                        setSelectedCard={setSelectedCard}
                    />
                    : <SubmitedCard cardData={item}/>
                    }
                </React.Fragment>
            ) : 
            <EmptyData 
                height='500px'
                text={'신청한 사람이 없음'}
            />
            }
        </StyleProjectCardContainer>
    );
}

