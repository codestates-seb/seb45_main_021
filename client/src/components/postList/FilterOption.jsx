import { styled } from 'styled-components';
import { updateOption } from '../../redux/filterOptionForm/filterOptionSlice';
import { useDispatch } from 'react-redux';
const StyleFilterOption = styled.div``;

export default function FilterOption() {
  const dispatch = useDispatch();

  return <StyleFilterOption></StyleFilterOption>;
}
