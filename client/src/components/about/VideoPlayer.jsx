import React from 'react';
import { styled } from 'styled-components';

const StyleVideoPlayer = styled.div`
  video {
    position: absolute;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
  div {
    width: 100vw;
    height: 100vh;
    background-color: #00000064;
    position: absolute;
    backdrop-filter: blur(5px);
  }
`;
export default function VideoPlayer({ src }) {
  return (
    <StyleVideoPlayer>
      <video muted autoPlay loop>
        <source src={src} type="video/mp4" />
      </video>
      <div></div>
    </StyleVideoPlayer>
  );
}
