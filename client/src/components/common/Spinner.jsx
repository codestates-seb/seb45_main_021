import React from 'react';
import { Oval } from 'react-loader-spinner';
import { styled } from 'styled-components';
import Page from './Page';

const Wrapper = styled(Page)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Spinner() {
  return (
    <Wrapper>
      <Oval height={100} width={100} color="#bfbfbf" secondaryColor="#8c8c8c" />
    </Wrapper>
  );
}
