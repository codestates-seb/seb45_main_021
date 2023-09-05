import { styled } from "styled-components";
import ProGress from "../common/ProGress";

const StyleSelectBox = styled.div`
    margin-bottom:0px !important;
`

const P = styled.p`
    font-size:1.6rem;
    margin-bottom:1rem;
`

const MarginBox = styled.div`
    margin-top:${props=>props.$margin};
`

const StyleErrorOrClear = styled.p`
    min-height:16px;
    margin-top:4rem;
    color:${props=> props.$isError ? 'var(--error)' : 'green'};
`

export default function SelectBox({text, component, margin='11rem',error, hideError=false, name}) {
    return (
        <StyleSelectBox>
            <P>{text}</P>
            {component}
            { !hideError ? (error===true
                ? <StyleErrorOrClear $isError={true}>{`${name} 선택은 필수 입니다.`}</StyleErrorOrClear>
                : error===undefined
                ? <StyleErrorOrClear $isError={false}>{'선택됨'}</StyleErrorOrClear>
                : <StyleErrorOrClear $isError={false}></StyleErrorOrClear>)
                : <StyleErrorOrClear $isError={false}></StyleErrorOrClear>
            }
            {margin ? <MarginBox $margin={margin}/> : undefined}
        </StyleSelectBox>
    );
}

