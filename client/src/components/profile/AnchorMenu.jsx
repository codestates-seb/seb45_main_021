import React, { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { BsQuestionCircleFill } from 'react-icons/bs';
import AnchorLink from 'react-anchor-link-smooth-scroll';

const StyleContainer = styled.div`
  position: relative;
  font-weight: 700;
  svg {
    position: fixed;
    bottom: 20px;
    right: 20px;
    &:active {
      transform: translateY(2px);
    }
  }
  a {
    color: var(--black-100);
    text-decoration: none;
  }
`;

const LinkContainer = styled.div`
  border: 1px solid var(--black-100);
  background-color: var(--black-800);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 90px;
  right: 20px;
  overflow: hidden;
`;

const LinkItem = styled.div`
  width: 100%;
  text-align: center;
  padding: 3rem;
  font-size: 3rem;
  &:hover {
    background-color: var(--black-400);
  }
`;

export default function AnchorMenu() {
  const [isOn, setIsOn] = useState(false);

  const handleIsOn = (e) => {
    e.stopPropagation();
    setIsOn((prev) => !prev);
  };

  const handleIsOnfalse = () => {
    setIsOn(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleIsOnfalse);
    return () => window.removeEventListener('click', handleIsOnfalse);
  }, []);

  return (
    <StyleContainer>
      {isOn && (
        <LinkContainer>
          <AnchorLink href="#profile">
            <LinkItem>프로필</LinkItem>
          </AnchorLink>
          <AnchorLink href="#project">
            <LinkItem>프로젝트</LinkItem>
          </AnchorLink>
          <AnchorLink href="#portfolio">
            <LinkItem>포트폴리오</LinkItem>
          </AnchorLink>
          <AnchorLink href="#likeList">
            <LinkItem>좋아요 리스트</LinkItem>
          </AnchorLink>
          <AnchorLink href="#projectCard">
            <LinkItem>프로젝트 카드</LinkItem>
          </AnchorLink>
        </LinkContainer>
      )}
      <BsQuestionCircleFill size={50} onClick={handleIsOn} />
    </StyleContainer>
  );
}
