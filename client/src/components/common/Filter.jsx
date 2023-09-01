import { styled } from 'styled-components';

const StyleFilter = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: ${(props) => props.$background || '#00000050'};
  z-index: ${(props) => props.$z || '0'};
`;

export default StyleFilter;
