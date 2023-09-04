import { styled } from "styled-components";

const P = styled.p`
    font-size:1.6rem;
    margin-bottom:1rem;
`

const MarginBox = styled.div`
    margin-top:${props=>props.$margin};
`
export default function SelectBox({text, component, margin='11rem'}) {
    return (
        <>
            <P>{text}</P>
            {component}
            {margin ? <MarginBox $margin={margin}/> : undefined}
        </>
    );
}

