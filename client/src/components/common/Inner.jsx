import React from 'react';
import { styled } from 'styled-components';

const StyleInner = styled.div`
  width: var(--inner);
  margin: var(--center);
`;
export default function Inner({ children, ...rest }) {
  return (
    <StyleInner className="inner" {...rest}>
      {children}
    </StyleInner>
  );
}
