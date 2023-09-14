import { styled } from 'styled-components';
import Select from '../common/Select';
import { languagesOption, sortOption } from '../../static/options.js';
import { mobile } from '../../static/theme.js';

const StyleFilterOption = styled.div`
  display: flex;
  gap: 15px;
  height: 40px;
  z-index: 1;
  width: 100%;
  align-items: end;
  position: relative;
  .select {
    position: relative;
  }
  ${mobile} {
    .select-container {
      width: calc(50% - 8px);
    }
  }
`;

export default function FilterOption({ optionHandler, options }) {
  const { lang, sort } = options;

  let defaultLanguages;

  languagesOption.forEach((item) => {
    if (item.value === lang) {
      defaultLanguages = item.label;
      return;
    }
  });

  return (
    <StyleFilterOption className="filter-option">
      <Select
        className="selected-box"
        width="20rem"
        height="40px"
        options={languagesOption}
        defaultLabel={defaultLanguages === '-' ? '언어' : defaultLanguages}
        onClickHandler={(value) => optionHandler('lang', value)}
      />
      <Select
        options={sortOption}
        width="20rem"
        height="40px"
        defaultLabel={sort === 'latest' ? '최신순' : '관심순'}
        onClickHandler={(value) => optionHandler('sort', value)}
      />
    </StyleFilterOption>
  );
}
