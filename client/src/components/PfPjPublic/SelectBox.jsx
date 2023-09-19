import { styled } from "styled-components";

const StyleSelectBox = styled.div`
    margin-bottom:0px !important;
`

const P = styled.p`
    font-size:1.6rem;
    margin: 1rem 0;
`

const MarginBox = styled.div`
    margin-top:${props=>props.$margin};
`

const StyleErrorOrClear = styled.p`
    min-height:16px;
    margin-top:4rem;
    color:${props=> props.$isError ? 'var(--error)' : 'green'};
`

export default function SelectBox({
    name,
    text,
    component,
    margin='11rem',
    error,
    hideError=false,
    customText,
}) {
    return (
        <StyleSelectBox>
            <P>{text}</P>
            {component}
            { !hideError && (error===true
                ? <StyleErrorOrClear $isError={true}>{`${name} 선택은 필수 입니다.`}</StyleErrorOrClear>
                : error===undefined
                ? <StyleErrorOrClear $isError={false}>{'선택됨'}</StyleErrorOrClear>
                : <StyleErrorOrClear $isError={false}></StyleErrorOrClear>)
            }
            {customText && <P>{customText}</P>}
            {margin ? <MarginBox $margin={margin}/> : undefined}
        </StyleSelectBox>
    );
}

