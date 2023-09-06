import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import styled from 'styled-components'
import {FaArrowDown} from 'react-icons/fa'

const CustomAnchor = styled(AnchorLink)`
    color: var(--black-100);
    text-decoration: none;
`

const StyleAncholTOComment = styled.div`
    position:fixed;
    width:60px;
    height:60px;
    border-radius:50%;
    background-color:var(--black-800);
    opacity:0.5;
    left:13%;
    top:30%;
    display:flex;
    justify-content:center;
    align-items:center;
    &:hover {
        cursor:pointer;
        opacity:1;
    }
    svg {
        :hover{
            cursor: pointer;
        }
        cursor: pointer;
        width:2rem;
        height:2rem;
    }
`

export default function AnchorToComment() {
    return (
        <CustomAnchor href='#comment'>
            <StyleAncholTOComment>
                <FaArrowDown/>
            </StyleAncholTOComment>
        </CustomAnchor>
    );
}

