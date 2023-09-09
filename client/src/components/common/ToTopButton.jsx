import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import scrollToTop from '../../utils/scrollToTop.js';
import { BiArrowToTop } from 'react-icons/bi';
const StyleToTopButton = styled.button`
  cursor: pointer;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--black-800);
  bottom: 20px;
  right: 10vw;
  border-radius: 50%;
  transition: all.2s;
  opacity: ${(props) => (props.isVisible ? '1' : '0')};
  visibility: ${(props) => (props.isVisible ? 'visible' : 'hidden')};
  &:hover {
    border-radius: 10px;
  }
  path {
    font-size: 35px;
  }
`;

export default function ToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <StyleToTopButton isVisible={isVisible} onClick={() => scrollToTop(true)}>
      <BiArrowToTop size="35px" />
    </StyleToTopButton>
  );
}
