import { styled } from 'styled-components';

export const StyleBorderButton = styled.button`
  border: 2px solid var(--black-100);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  opacity: 0.8;
  transition: all.2s;
  &:after {
    position: absolute;
    content: '';
    width: 100%;
    left: -100%;
    top: 0;
    height: 100px;
    background-color: #ffffff23;
    transition: all.2s;
    z-index: -1;
  }
  &:hover {
    opacity: 1;
  }
  &:hover:after {
    left: 0;
  }
`;

export const StyleBottomButton = styled.button`
  position: relative;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }

  &:after {
    content: '';
    position: absolute;
    width: 0px;
    height: 2px;
    background-color: var(--black-100);
    bottom: 0;
    left: 0;
    right: 0;
    transition: all.2s;
    margin: auto;
  }
  &:hover:after {
    width: 65%;
  }
`;
