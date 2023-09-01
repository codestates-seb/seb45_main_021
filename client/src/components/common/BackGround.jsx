import React from 'react';
import { styled } from 'styled-components';
import background from '../../static/images/background.jpg';
const StyleBackGround = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-image: url(${() => background});
  background-size: cover;
  z-index: -1;
`;
export default function BackGround() {
  return <StyleBackGround></StyleBackGround>;
}
