import { styled } from 'styled-components';

const StyleSelectBox = styled.div`
  margin-bottom: 0px !important;
`;

const P = styled.p`
  font-size: 1.6rem;
  margin: 1rem 0;
  font-weight: var(--nanum-semi-bold);
`;

const MarginBox = styled.div`
  margin-top: ${(props) => props.$margin};
`;

export default function SelectBox({
  name,
  text,
  component,
  margin = '0',
  error,
  hideError = false,
  customText,
  ...rest
}) {
  return (
    <StyleSelectBox {...rest}>
      <P>{text}</P>
      {component}
      {customText && <P>{customText}</P>}
      {margin ? <MarginBox $margin={margin} /> : undefined}
    </StyleSelectBox>
  );
}
