import { styled } from "styled-components";

const StyleWriteHeader = styled.div`
    height:${props => props.$height};
    margin-bottom:${props => props.$marginBottom};
`

export default function WriteHeader({
    text,
    height='20rem',
    marginBottom='10rem',
}) {
    return (
        <StyleWriteHeader
            $height={height}
            $marginBottom={marginBottom}
        > 
            {text}
        </StyleWriteHeader>
    );
}

