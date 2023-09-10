import React from 'react';
import styled from 'styled-components'
import SubmitCard from './SubmitCard';
import ForSubmitCard from './ForSubmitCard';

const StyleSubmitCardContainer = styled.div`
    width:70vw;
    gap:2rem;
    max-height:500px;
    padding-right:1rem;
`

export default function SubmitCardContainer({
    cardList,
    isForSubmit = false,
    selectedCard,
    setSelectedCard
}) {
    return (
        <StyleSubmitCardContainer
            className={isForSubmit ? 'row' : 'col'}

        >    
            {cardList.map((item, idx) =>
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
                    : <SubmitCard cardData={item}/>
                    }
                </React.Fragment>
            )}
        </StyleSubmitCardContainer>
    );
}

