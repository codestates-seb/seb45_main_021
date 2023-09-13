import React from 'react';
import { styled } from 'styled-components';

const StyleVideoPlayer = styled.div`
  video {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    touch-action: 'none';
    z-index: -1;
    left: 0;
    top: 0;
  }
`;
export default function VideoPlayer({ src }) {
  return (
    <StyleVideoPlayer>
      <video loop autoPlay playSinline controls={false}>
        <source src={src} type="video/mp4" />
      </video>
    </StyleVideoPlayer>
  );
}
