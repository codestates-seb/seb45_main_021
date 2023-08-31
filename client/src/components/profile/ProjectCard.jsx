import React from 'react';
import { styled } from 'styled-components';

const StyleContainer = styled.div`
  width: 100%;
  height: 50rem;
  background-color: var(--black-800);
`;

export default function ProjectCard({ id, data }) {
  return <StyleContainer id={id}>1</StyleContainer>;
}
