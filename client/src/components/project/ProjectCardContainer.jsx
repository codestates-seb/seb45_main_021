import React from 'react';
import styled from 'styled-components'
import SubmitedCard from './SubmitedCard';
import ForSubmitCard from './ForSubmitCard';
import { desktop, mobile, tablet } from '../../static/theme';
import EmptyData from '../PfPjPublic/EmptyData';

export const StyleProjectCardContainer = styled.div`
    width:100%;
    gap:2rem;
    height:${props=>props.$isForSubmit ? '100%' : 'auto'};
    overflow:auto;
    div {
        border-radius:5px;
    }
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
    setSelectedCard,
    updateHandler,
}) {
    return (
        <StyleProjectCardContainer
            className='col'
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
                    : <SubmitedCard
                        cardData={item}
                        updateHandler={updateHandler}
                    />
                    }
                </React.Fragment>
            ) : 
            <EmptyData 
                height='500px'
                text={'프로젝트 카드가 없습니다.'}
            />
            }
        </StyleProjectCardContainer>
    );
}

