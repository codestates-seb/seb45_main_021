import useNav from '../../hooks/useNav';
import { styled } from 'styled-components';

const StyleTag = styled.div`
  padding: ${(props) => props.$padding || '5px 7px'};
  font-size: ${(props) => props.$padding || '1.4rem'};
  font-weight: var(--nanum-semi-bold);
  border: 1px solid var(--black-400);
  border-radius: 5px;
  display: inline;
  transition: all.2s;
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: 1rem;
  &:hover {
    background-color: white;
    color: black;
  }
`;

/**
 * 태그 아이템을 반환합니다
 * @param {Array} text - 태그에 들어갈 텍스트입니다
 * @param {Function} type - 해당 카드의 타입입니다 project || portfolio
 * @param {string} size - font size입니다
 * @param {Function} padding - 여백입니다
 * @returns {JSX.Element}
 */

export default function Tag({ text, type, size, padding, edit }) {
  const { toSearch } = useNav();

  return (
    <StyleTag $padding={padding} $size={size} onClick={() => !edit && toSearch(text, type)}>
      {text}
    </StyleTag>
  );
}
