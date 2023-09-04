import { styled } from "styled-components";

const StyleWriteHeader = styled.div`
    height:20rem;
    margin-bottom:10rem;
`

export default function WriteHeader({text}) {
    return (
        <StyleWriteHeader>
            {text}
        </StyleWriteHeader>
    );
}

